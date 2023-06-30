import { read, utils, writeFile } from "xlsx";

const Home = () => {
  let primaryData = [];
  let secondaryData = [];
  let differences = []; //{ SKU: "", "Primary Price": "", "Secondary Price": "" };
  // let primaryKeywordCol = " Price ";
  // let secondaryKeywordCol = "Price";

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
      if (fileSource === "upload-primary") {
        primaryData = jsonDataObj;
        console.log("primaryData", primaryData);
      }
      if (fileSource === "upload-secondary") {
        secondaryData = jsonDataObj;
        console.log("secondaryData", secondaryData);
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
  //   if (fileSource === "upload-primary") {
  //     // promise.then();
  //     const primaryData = readData(e);
  //     console.log("primaryData", primaryData);
  //     console.log("primaryData", primaryData[Promise]);
  //   }
  //   if (fileSource === "upload-secondary") {
  //     const secondaryData = readData(e);
  //     console.log("secondaryData", secondaryData);
  //   }
  // };

  const handleClick = () => {
    // console.log(primaryData[0]);
    // console.log(primaryData[0][primaryKeywordCol]);
    // console.log(secondaryData);

    primaryData.map((primaryItem) => {
      if (
        primaryItem["Item"] === "Product"
        // &&
        // primaryItem["Is Visible"] === "true"
      ) {
        // console.log("You are here");
        secondaryData.forEach((secondaryItem) => {
          if (secondaryItem["Item"] === "Product") {
            if (primaryItem["SKU"] === secondaryItem["SKU"]) {
              // console.log('pri["SKU"]', primaryItem["SKU"]);
              // console.log('sec["SKU"]', secondaryItem["SKU"]);
              if (primaryItem["Price"] !== secondaryItem["Price"]) {
                // console.log(" ");
                // console.log(primaryItem["SKU"]);
                // console.log(secondaryItem["SKU"]);
                // console.log(primaryItem["Price"]);
                // console.log(secondaryItem["Price"]);

                differences.push({
                  Name: primaryItem["Name"],
                  SKU: primaryItem["SKU"],
                  "Primary Price": primaryItem["Price"],
                  "Secondary Price": secondaryItem["Price"],
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
            name="upload-primary"
            onChange={(e) => {
              readFile(e);
            }}
          />
        </div>
        <div className="upload-file">
          <p>Upload Secondary file</p>
          <input
            type="file"
            name="upload-secondary"
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
            Find differences{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
