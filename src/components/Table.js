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
         setFilter("worker_name", value); // Update the report.project_id filter. Now our table will filter and show only the rows which have a matching value
         setFilterInput({ ...filterInput, worker_name: value});
    };

    const handleFirstDateFilterChange = e => {
      const value = e.target.value || undefined;
      //setFilter("reporting_date", value);
      setFilterInput({ ...filterInput, first_reporting_date: value });

    };
     const handleLastDateFilterChange = e => {
      const value = e.target.value || undefined;
      //setFilter("reporting_date", value);
      setFilterInput({ ...filterInput, last_reporting_date: value });

    };

    const handleSelect = e => {
    console.log(e); // native Date object
    };

    function in_date_range(date){
        let my_date = new Date(date);
        let first = new Date(filterInput.first_reporting_date);
        let last = new Date(filterInput.last_reporting_date);
        if(filterInput.first_reporting_date === undefined && filterInput.last_reporting_date === undefined){
            return true;
        }
        if(filterInput.first_reporting_date !== undefined && filterInput.last_reporting_date !== undefined){
            return my_date >= first && my_date <= last;
        }
        if(filterInput.first_reporting_date !== undefined){
            return my_date >= first
        }
        if(filterInput.last_reporting_date !== undefined){
            return my_date <= last
        }
    }

  return (
    <div dir='rtl' class=' container-fluid col-10 ' lang="he"  style={{  justifyContent:'right'}}>
        <div className='shadow ' style={{ backgroundColor: 'rgba(229, 225, 225)'}}>
            <br/>
    <p className='m-5'>מסננים:</p>

    <input
        className='mr-5 ml-1'
        value={filterInput.worker_name}
        onChange={handleNameFilterChange}
        placeholder={"סנן לפי שם עובד"}
    />
    <input
        className='m-1'
        type='number'
      value={filterInput.project_id}
      onChange={handleProjectFilterChange}
      placeholder={"סנן לפי מספר פרויקט"}
    />
    <input
        className='m-1'
      type='date'
      value={filterInput.first_reporting_date}
      onChange={handleFirstDateFilterChange}
      placeholder={"סננן מתאיך"}
    />
    <input
        className='m-1'
      type='date'
      value={filterInput.last_reporting_date}
      onChange={handleLastDateFilterChange}
      placeholder={"עד תאריך"}
    />

        <br/><br/><br/><br/>
    <p className='mr-5'>תלחץ על עמודה כדי למיין אותה, על סימן ה-X כדי להסיר שורה ועל סימן העריכה כדי לערוך דוח.</p>
    <table class="table " {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}
              style={{ borderTop: 'solid 2px gray'}}>
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
      <tbody {...getTableBodyProps()}
             >
        {dataf.clear()}
        {
        rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr class='line' {...row.getRowProps()}
                style={{ borderTop: 'solid 2px gray'}}>
              {
              row.cells.map(cell => {
                if (in_date_range(cell.row.values.reporting_date)){
                    dataf.add(cell.row.values)
                    if(cell.column.Header === 'קובץ מצורף'){
                        return <td {...cell.getCellProps()} ><a href={cell.value}>{cell.render("Cell")}</a></td>;
                    }else{
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    }
                }

              })}
            </tr>
          );
        })}
      </tbody>
    </table>
        </div>
    </div>
  );
}