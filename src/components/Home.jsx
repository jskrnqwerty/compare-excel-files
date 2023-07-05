// import { useEffect, useRef, useState } from "react";
import { read, utils, writeFile } from "xlsx";

let file1Data = [];
let file2Data = [];
let outputData = []; //{ SKU: "", "Primary Price": "", "Secondary Price": "" };

const commonKey = "SKU";
// compare keys for "different-prices"
// const comparePrimaryKey = "Price";
// const compareSecondaryKey = "Price";
// compare keys for "same-sku"
const comparePrimaryKey = "SKU";
const compareSecondaryKey = "SKU";
const conditionKey = "Item";
const conditionValue = "Product" || "None";
// const [primaryHead, setPrimaryHead] = useState();
// const [secondaryHead, setSecondaryHead] = useState();
// const primaryH = useRef(null);
const Home = () => {
  // ------------------------------------
  // handle functions
  // ------------------------------------
  const readFile = async (e) => {
    console.log("reading file");
    const file = e.target.files[0];
    console.log("file.name = ", file.name);
    // console.log("file", file);
    const fileData = await file.arrayBuffer();
    // console.log("fileData", fileData);
    const workbook = read(fileData);
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
      if (fileSource === "upload-file-1") {
        file1Data = jsonDataObj;
        console.log("file1Data", file1Data);
      }
      if (fileSource === "upload-file-2") {
        file2Data = jsonDataObj;
        console.log("file2Data", file2Data);
      }
    };
    const fileSource = e.target.name;
    saveData(fileSource);
  };

  // const readFile = (e) => {
  //   // https://www.youtube.com/watch?v=YiYtwbnPfkY
  //   // Learn JS Promises to make this work
  //   const fileSource = e.target.name;
  //   console.log("fileSource", fileSource);
  //   console.log("e", e);
  //   // const promise = new Promise();
  //   if (fileSource === "upload-file-1") {
  //     // promise.then();
  //     const file1Data = readData(e);
  //     console.log("file1Data", file1Data);
  //     console.log("file1Data", file1Data[Promise]);
  //   }
  //   if (fileSource === "upload-file-2") {
  //     const file2Data = readData(e);
  //     console.log("file2Data", file2Data);
  //   }
  // };

  const processAndOutputData = (e) => {
    // console.log(file1Data[0]);
    // console.log(file1Data[0][primaryKeywordCol]);
    // console.log(file2Data);

    file1Data.map((primaryItem) => {
      const selectionName = e.target.name;
      if (primaryItem[conditionKey] === conditionValue) {
        file2Data.forEach((secondaryItem) => {
          switch (selectionName) {
            case "different-prices":
              if (secondaryItem[conditionKey] === conditionValue) {
                if (primaryItem[commonKey] === secondaryItem[commonKey]) {
                  if (
                    primaryItem[comparePrimaryKey] !==
                    secondaryItem[compareSecondaryKey]
                  ) {
                    console.log("here");
                    outputData.push({
                      Name: primaryItem["Name"],
                      commonKey: primaryItem[commonKey],
                      "Primary Price": primaryItem[comparePrimaryKey],
                      "Secondary Price": secondaryItem[compareSecondaryKey],
                      "Product URL": `https://starmicroinc.net${primaryItem["Product URL"]}`,
                      "BigC Edit URL": `https://store-0yiknm.mybigcommerce.com/manage/products/edit/${primaryItem["ID"]}`,
                    });
                  }
                }
              }
              break;
            case "same-sku":
              if (primaryItem[commonKey] === secondaryItem[commonKey]) {
                if (
                  primaryItem[comparePrimaryKey] ===
                  secondaryItem[compareSecondaryKey]
                ) {
                  outputData.push(primaryItem);
                }
              }
              break;
          }
          // if (secondaryItem[conditionKey] === conditionValue) {
          //   if (primaryItem[commonKey] === secondaryItem[commonKey]) {
          //     // console.log('pri[commonKey]', primaryItem[commonKey]);
          //     // console.log('sec[commonKey]', secondaryItem[commonKey]);

          //     switch (selectionName) {
          //       case "same-sku":
          //         console.log("Triggered case: same-sku");
          //         if (
          //           primaryItem[comparePrimaryKey] ===
          //           secondaryItem[compareSecondaryKey]
          //         ) {
          //           outputData.push(primaryItem);
          //         }
          //         break;
          //       case "different-prices":
          //         if (
          //           primaryItem[comparePrimaryKey] !==
          //           secondaryItem[compareSecondaryKey]
          //         ) {
          //           console.log("here");
          //           outputData.push({
          //             Name: primaryItem["Name"],
          //             commonKey: primaryItem[commonKey],
          //             "Primary Price": primaryItem[comparePrimaryKey],
          //             "Secondary Price": secondaryItem[compareSecondaryKey],
          //             "Product URL": `https://starmicroinc.net${primaryItem["Product URL"]}`,
          //             "BigC Edit URL": `https://store-0yiknm.mybigcommerce.com/manage/products/edit/${primaryItem["ID"]}`,
          //           });
          //         }
          //         break;
          //       default:
          //         console.log("default case triggered");
          //     }

          //     // if (
          //     //   primaryItem[comparePrimaryKey] !==
          //     //   secondaryItem[compareSecondaryKey]
          //     // ) {
          //     //   // console.log(" ");
          //     //   // console.log(primaryItem[commonKey]);
          //     //   // console.log(secondaryItem[commonKey]);
          //     //   // console.log(primaryItem["Price"]);
          //     //   // console.log(secondaryItem["Price"]);
          //     //   switch (selectionName) {
          //     //     case "different-prices":
          //     //       outputData.push({
          //     //         Name: primaryItem["Name"],
          //     //         commonKey: primaryItem[commonKey],
          //     //         "Primary Price": primaryItem[comparePrimaryKey],
          //     //         "Secondary Price": secondaryItem[compareSecondaryKey],
          //     //         "Product URL": `https://starmicroinc.net${primaryItem["Product URL"]}`,
          //     //         "BigC Edit URL": `https://store-0yiknm.mybigcommerce.com/manage/products/edit/${primaryItem["ID"]}`,
          //     //       });
          //     //       break;
          //     //     case "same-sku":
          //     //       console.log("Triggered case: same-sku");
          //     //       console.log(primaryItem);
          //     //       outputData.push(primaryItem);
          //     //       break;
          //     //   }
          //     // }
          //   }
          // }
        });
      }
    });

    const exportNewData = (data) => {
      // export array-of-objects to xlsx file
      const newWorkbook = utils.book_new();
      const newWorksheet = utils.json_to_sheet(data);
      utils.book_append_sheet(newWorkbook, newWorksheet, "NewSheet");
      writeFile(newWorkbook, "NewSheet.xlsx");
    };
    console.log("outputData", outputData);
    exportNewData(outputData);
  };

  // const captureInput = (e) => {
  //   console.log(e);
  //   console.log(e.target.value);
  //   const inputName = e.target.name;
  //   const inputValue = e.target.value;
  //   switch (inputName) {
  //     case "primary-head":
  //       setPrimaryHead(inputValue);
  //       console.log("primaryHead", primaryHead);
  //       break;
  //     case "secondary-head":
  //       setSecondaryHead(inputValue);
  //       console.log("secondaryHead", secondaryHead);
  //       break;
  //   }
  // };

  // useEffect(() => {}, []);

  return (
    <>
      <h1>Home</h1>
      <div className="upload-files-container">
        <div className="upload-file">
          <p>Upload Primary file</p>
          <input
            type="file"
            name="upload-file-1"
            onChange={readFile}
          />
          {/* <input
            type="text"
            placeholder="Read row from heading"
            value={primaryHead}
            name="primary-head"
            ref={primaryH}
            onChange={(e) => {
              captureInput(e);
            }}
          /> */}
        </div>
        <div>
          <p>Upload Secondary file</p>
          <input
            type="file"
            name="upload-file-2"
            onChange={readFile}
          />
          {/* <input
            type="text"
            placeholder="Read row from heading"
            name="secondary-head"
            onChange={(e) => {
              captureInput(e);
            }}
          /> */}
        </div>
        <div>
          <p>
            1. Extract from Primary, that have different prices, using custom
            template:
          </p>
          <button
            type="button"
            name="different-prices"
            onClick={processAndOutputData}
          >
            Export 1
          </button>
          <p>2. Extract from Primary, similar SKU, in Primary template</p>
          <button
            type="button"
            name="same-sku"
            onClick={processAndOutputData}
          >
            Export 2
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
