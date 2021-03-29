import React,{useState} from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRangePicker } from 'react-date-range';
export default function Table({ columns, data, dataf }) {
// Table component logic and UI come here
    // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows,// rows for the table based on the data passed
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
      setFilterInput({ ...filterInput, project_id: value });
    };

     const handleNameFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("worker_id", value); // Update the report.project_id filter. Now our table will filter and show only the rows which have a matching value
      setFilterInput({ ...filterInput, worker_id: value });
    };

    const handleDateFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("reporting_date", value);
      setFilterInput({ ...filterInput, reporting_date: value });

    };

    const handleSelect = e => {
    console.log(e); // native Date object
    };

    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };

    const handleSelectRange= e => {
    console.log(e.selection.startDate);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
    };


  //    <DateRangePicker
//        ranges={[selectionRange]}
//        onChange={handleSelectRange}
//      />
//     <Calendar
//        date={new Date()}
//        onChange={handleSelect}
//      />
  return (
    <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'right'}}>
    <h1>דיווחים של העובדים</h1>
    <p>מסננים:</p>
    <input
      value={filterInput.worker_id}
      onChange={handleNameFilterChange}
      placeholder={"סנן לפי שם עובד"}
    />
    <input
        type='number'
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
        {dataf.clear(),
        rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {
              row.cells.map(cell => {
                dataf.add(cell.row.values)
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