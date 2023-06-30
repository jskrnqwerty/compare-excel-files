// import { read, utils } from "xlsx";

// const ReadFile = (intro, name) => {
//   const readFileData = async (e) => {
//     // setFileStatus("Reading inventory file"); // this breaks the code
//     console.log("reading inventory file...");
//     const file = e.target.files[0];
//     const fileData = await file.arrayBuffer();
//     const workbook = read(fileData);
//     // const workbook = XLSX.readFile(fileData, { sheetRows: 20 });
//     const workSheet = workbook.Sheets[workbook.SheetNames[0]];
//     // const jsonDataObj = utils.sheet_to_json(workSheet);
//     const jsonDataArr = utils.sheet_to_json(workSheet, {
//       header: 1,
//       defVal: "",
//     });
//     const source = e.target.name;
//     if (source === "inventoryFile") {
//       const productsInventory = jsonDataArr;
//       console.log("File read!");
//       console.log("Ready for data extraction");
//     }
//     // setFileStatus("Inventory file read"); // this breaks the code
//   };

//   return (
//     <div className="upload-file">
//       <p>{intro}</p>
//       <input
//         type="file"
//         name={name}
//         onChange={(e) => {
//           readFileData(e);
//         }}
//       />
//     </div>
//   );
// };

// export default ReadFile;
