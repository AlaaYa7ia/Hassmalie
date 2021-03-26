import React,{useState} from "react";
import { useTable, useFilters, useSortBy } from "react-table";
export default function Table({ columns, data }) {
// Table component logic and UI come here

    // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter // The useFilter Hook provides a way to set the filter
  } = useTable({
    columns,
    data
  },
   useFilters, // Adding the useFilters Hook to the table
   useSortBy // This plugin Hook will help to sort our table columns
   );

    // Create a state
    const [filterInput, setFilterInput] = useState("");
    // Update the state when input changes
    const handleProjectFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("project_id", value); // Update the report.project_id filter. Now our table will filter and show only the rows which have a matching value
      //setFilterInput(value);
      setFilterInput({ ...filterInput, project_id: value });
    };

    const handleDateFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("reporting_date", value);
      //setFilterInput(value);
      setFilterInput({ ...filterInput, reporting_date: value });

    };



  return (
    <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'right'}}>
    <h1>דיווחים של העובדים</h1>
    <p>מסננים:</p>
    <input
      value={filterInput.project_id}
      onChange={handleProjectFilterChange}
      placeholder={"סנן לפי מספר פרויקט"}
    />
    <input
      type='date'
      value={filterInput.reporting_date}
      onChange={handleDateFilterChange}
      placeholder={"סננן לפי תאריך דיווח"}
    />
    <p>תלחץ על עמודה כדי למיין אותה</p>
    <table class="table" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}