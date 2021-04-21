import jsPDF from "jspdf";
import "jspdf-autotable";
import "../components/David-normal.js";


// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a reports argument
const generatePDF = reports => {
  //initialize jsPDF
  const doc = new jsPDF();
  doc.addFont("David-normal.ttf", "David", "normal");
   doc.setFont("David"); // set font
   doc.setFontSize(12);


  function fix(str){
   return str.split('').reverse().join('');
  }

  // define the columns we want and their titles
  //const tableColumn = [     fix("שם עובד"),fix("מספר פרויקט"),fix("תאריך דיוח"),fix("כניסה"),fix("יציאה"),fix("תיאור") ];
  const tableColumn = [fix("תיאור"),fix("יציאה"),fix("כניסה"),fix("תאריך דיווח"),fix("מספר פרויקט"),fix("שם עובד")]
  // define an empty array of rows
  const tableRows = [];

  // for each report pass all its data into an array
  reports.forEach(report => {
    const reportData = [
      report.description.split('').reverse().join(''),
      report.end_time,
      report.start_time,
      report.reporting_date,
      report.project_id,
      report.worker_name.split('').reverse().join(''),
      // called date-fns to format the date on the report
      format(new Date(report.reporting_date), "yyyy-MM-dd")
    ];
    // push each reports's info into a row
    tableRows.push(reportData);
  });
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {styles: {font: "David", align: 'right', isSymmetricSwapping: true, isInputVisual: true, isOutputVisual: false}});
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  let text = "דוח שעות:".split('').reverse().join('');
  doc.text(text, 100, 10, {styles: {font: "David" }});//, {align: 'right', isSymmetricSwapping: true, isInputVisual: true, isOutputVisual: false}
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;