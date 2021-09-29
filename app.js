console.log("Hello from the other side");

let viz;
const exportToPDF = document.getElementById("exportToPDF");

// 1. Create a variable to store the dashboard URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
// 2. Create a list of options to send to the javascript API (device, width and height of dashboard)
const options = {
  device: "desktop",
  Category: "Technology",
};
// 3. Grab container from the body of the page (viz container)
const vizContainer = document.getElementById("vizContainer");

//4. Create a function that will create the viz on the page
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

function exportPDF() {
  console.log("Going to export a PDF");
  viz.showExportPDFDialog();
}

function exportPPT() {
  console.log("Going to export a PPT");
  viz.showExportPowerPointDialog();
}

exportToPDF.addEventListener("click", exportPDF);

exportToPowerPoint.addEventListener("click", exportPPT);

function getRangeValues() {
  //get the values from input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //log out the values
  console.log({ minValue, maxValue });
  //get workbook
  const workbook = viz.getWorkbook();
  console.log({ workbook });
  // get the active sheet
  const activeSheet = workbook.getActiveSheet();
  // from the dashboard get the worksheets
  const sheets = activeSheet.getWorksheets();
  //worksheet we want to filter
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.getElementById("Sales Filter").addEventListener("click", function () {
  getRangeValues();
});
document.addEventListener("DOMContentLoaded", initViz);
