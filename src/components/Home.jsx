// import { useEffect, useRef, useState } from "react";
import { read, utils, writeFile } from "xlsx";

let data1 = [];
let data2 = [];
// const file1Template = [];
// const neweggDIMM = [
//   {
//     "SellerPart#": "SKU",
//     Manufacturer: "",
//     ManufacturerPart#: "Manufacturer Part Number",
//     UPC: "UPC/EAN",
//     WebsiteShortTitle: "Title",
//     BulletDescription: "Title",
//     ProductDescription: "Title",
//     ItemWeight: "Weight",
//     PacksOrSets: "1",
//     SellingPrice: "Price",
//     Shipping: "Free",
//     Inventory: "Current Stock"
//     ItemImages: "Image URL (Import)",
//     CountryOfOrigin: "USA",
//     MEMType: "Desktop"
//   },
// ];
const templates = {
  file1: "file1",
  // newegg: "newegg",
  custom: "custom",
};

// Set requirements here
const uniqueKey1 = "SKU";
const uniqueKey2 = "SKU";
const compareKey1 = "SKU"; // "SKU", "Price"
const compareKey2 = "SKU";
const conditionKey = "Item";
const conditionValue = "Product"; // "Product" || "None";
const operation = "same-values"; // "union" || "intersection" || "same-values" || "different-values";
// const customTemplate = neweggTemplate;
// const customTemplatename = "neweggTemplate";
const outputTemplateName = templates.file1; // "file1Template" || "newegg" || "custom";
const output = []; // "file1Template" || "neweggTemplate";

const Home = () => {
  // ------------------------------------
  // handle functions
  // ------------------------------------
  const readFile = async (e) => {
    console.log("reading file");
    const file = e.target.files[0];
    console.log("file.name = ", file.name);
    // console.log("file", file);
    const data = await file.arrayBuffer();
    // console.log("data", data);
    const workbook = read(data);
    // console.log("workbook", workbook);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // console.log("worksheet", worksheet);
    const jsonDataObj = utils.sheet_to_json(worksheet, { defval: "" });
    // console.log("jsonDataObj", jsonDataObj);
    // console.log("jsonDataObj", jsonDataObj[0]["Page Title"]);
    // console.log("jsonDataObj", jsonDataObj[0]["Channels"]);
    // console.log("jsonDataObj", jsonDataObj[0]["Is Visible"]);

    // returns an array of objects
    // return jsonDataObj;
    const saveData = (fileSource) => {
      console.log("fileSource", fileSource);
      switch (fileSource) {
        case "upload-file-1":
          data1 = jsonDataObj;
          console.log("data1", data1);
          break;
        case "upload-file-2":
          data2 = jsonDataObj;
          console.log("data2", data2);
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    };

    const fileSource = e.target.name;
    saveData(fileSource);
  };

  const processAndFilterDataToFile = (e) => {
    const filterData = (product1, product2, templateName) => {
      switch (templateName) {
        case "file1":
          output.push(product1);
          break;
        // case "newegg": {
        //   const srNo = index2 + 1;
        //   const lineNo = index1 + 1;
        //   output.push({
        //     SrNo: srNo,
        //     LineNo: lineNo,
        //     SellerPartNo: product1["SKU"],
        //     Manufacturer: product1["Name"].split(" ").at(0),
        //     ManufacturerPartNo: product1["Manufacturer Part Number"],
        //     UPC: product1["UPC/EAN"],
        //     WebsiteShortTitle: product1["Name"],
        //     BulletDescription: product1["Name"],
        //     ProductDescription: product1["Name"],
        //     ItemWeight: product1["Weight"],
        //     PacksOrSets: "1",
        //     SellingPrice: product1["Price"],
        //     Shipping: "0",
        //     Inventory: product1["Current Stock"],
        //     ItemImages: product1["Image URL (Import)"],
        //     CountryOfOrigin: "USA",
        //     // MEMType: "Desktop",
        //   });
        //   break;
        // }
        case "custom":
          console.log("case neweggTemplate triggered.");
          output.push({
            Name: product1["Name"],
            uniqueKey: product1[uniqueKey1],
            "File-1 Compare Key": product1[compareKey1],
            "File-2 Compare Key": product2[compareKey2],
            "Product URL": `https://starmicroinc.net${product1["Product URL"]}`,
            "BigC Edit URL": `https://store-0yiknm.mybigcommerce.com/manage/products/edit/${product1["ID"]}`,
          });

          break;
        default:
          break;
      }
    };

    data2.forEach((product2) => {
      const selectionName = e.target.name;
      data1.map((product1) => {
        if (product1[conditionKey] === conditionValue) {
          switch (selectionName) {
            case "different-values":
              if (product2[conditionKey] === conditionValue) {
                if (product1[uniqueKey1] === product2[uniqueKey2]) {
                  if (product1[compareKey1] !== product2[compareKey2]) {
                    filterData(product1, product2, outputTemplateName);
                  }
                } else console.log(product2["SKU"], "not in list");
              }
              break;
            case "same-values":
              if (product1[uniqueKey1] === product2[uniqueKey2]) {
                if (product1[compareKey1] === product2[compareKey2]) {
                  filterData(product1, product2, outputTemplateName);
                }
              }
              break;
          }
        }
      });
    });

    const exportNewData = (data) => {
      // export array-of-objects to xlsx file
      const newWorkbook = utils.book_new();
      const newWorksheet = utils.json_to_sheet(data);
      utils.book_append_sheet(newWorkbook, newWorksheet, "NewSheet");
      writeFile(newWorkbook, "NewSheet.xlsx");
    };
    console.log("outputData", output);
    exportNewData(output);
  };

  return (
    <>
      <h1>Home</h1>
      <div className="upload-files-container">
        <div className="upload-file">
          <p>Upload file 1</p>
          <input
            type="file"
            name="upload-file-1"
            onChange={readFile}
          />
        </div>
        <div>
          <p>Upload file 2</p>
          <input
            type="file"
            name="upload-file-2"
            onChange={readFile}
          />
        </div>
        <div>
          <p>
            {/* 1. Extract from File-1, that have different prices, using custom
            template: */}
            Extract from File-1, <br />
            Operation: {operation} <br />
            Output Template: {outputTemplateName} <br />
            uniqueKey1 = {uniqueKey1}
            <br />
            uniqueKey2 = {uniqueKey2}
            <br />
            compareKey1 = {compareKey1}
            <br />
            compareKey2 = {compareKey2}
            <br />
            conditionKey = {conditionKey}
            <br />
            conditionValue = {conditionValue}
            <br />
          </p>
          <button
            type="button"
            name={operation}
            onClick={processAndFilterDataToFile}
          >
            Export
          </button>
          {/* <p>2. Extract from File-1, similar SKU, in File-1 template</p>
          <button
            type="button"
            // name="same-sku"
            name="same-values"
            onClick={processAndFilterDataToFile}
          >
            Export 2
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Home;
