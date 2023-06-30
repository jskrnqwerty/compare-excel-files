import { read, utils, writeFile } from "xlsx";

const Home = () => {
  let file1Data = [];
  let file2Data = [];
  let differences = []; //{ SKU: "", "Primary Price": "", "Secondary Price": "" };

  const commonKey = "SKU";
  const compareKey1 = "Price";
  const compareKey2 = "Price";
  const conditionKey = "Item";
  const conditionValue = "Product" || "None";

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
    const jsonDataObj = utils.sheet_to_json(worksheet);
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

  const handleClick = () => {
    // console.log(file1Data[0]);
    // console.log(file1Data[0][primaryKeywordCol]);
    // console.log(file2Data);

    file1Data.map((primaryItem) => {
      if (primaryItem[conditionKey] === conditionValue) {
        file2Data.forEach((secondaryItem) => {
          if (secondaryItem[conditionKey] === conditionValue) {
            if (primaryItem[commonKey] === secondaryItem[commonKey]) {
              // console.log('pri[commonKey]', primaryItem[commonKey]);
              // console.log('sec[commonKey]', secondaryItem[commonKey]);
              if (primaryItem[compareKey1] !== secondaryItem[compareKey2]) {
                // console.log(" ");
                // console.log(primaryItem[commonKey]);
                // console.log(secondaryItem[commonKey]);
                // console.log(primaryItem["Price"]);
                // console.log(secondaryItem["Price"]);

                differences.push({
                  Name: primaryItem["Name"],
                  commonKey: primaryItem[commonKey],
                  "Primary Price": primaryItem[compareKey1],
                  "Secondary Price": secondaryItem[compareKey2],
                  "Product URL": `https://starmicroinc.net${primaryItem["Product URL"]}`,
                  "BigC Edit URL": `https://store-0yiknm.mybigcommerce.com/manage/products/edit/${primaryItem["ID"]}`,
                });
              }
            }
          }
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
    console.log("differences", differences);
    exportNewData(differences);
  };

  return (
    <>
      <h1>Home</h1>
      <div className="upload-files-container">
        <div className="upload-file">
          <p>Upload Primary file</p>
          <input
            type="file"
            name="upload-file-1"
            onChange={(e) => {
              readFile(e);
            }}
          />
          {/* <input
            type="text"
            placeholder="Common Key"
          /> */}
        </div>
        <div className="upload-file">
          <p>Upload Secondary file</p>
          <input
            type="file"
            name="upload-file-2"
            onChange={(e) => {
              readFile(e);
            }}
          />
        </div>
        <div className="cl">
          <button
            type="button"
            onClick={handleClick}
          >
            Export Differences{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
