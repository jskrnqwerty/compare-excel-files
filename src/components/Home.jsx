import { read, utils } from "xlsx";

const Home = () => {
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
    console.log("jsonDataObj", jsonDataObj);
    // console.log("jsonDataObj", jsonDataObj[0]["Page Title"]);
    // console.log("jsonDataObj", jsonDataObj[0]["Channels"]);
    // console.log("jsonDataObj", jsonDataObj[0]["Is Visible"]);

    //returns an array of objects
    // return jsonDataObj;
    const fileSource = e.target.name;
    console.log("fileSource", fileSource);
    console.log("e", e);
    // const promise = new Promise();
    if (fileSource === "upload-primary") {
      // promise.then();
      const primaryData = jsonDataObj;
      console.log("primaryData", primaryData);
    }
    if (fileSource === "upload-secondary") {
      const secondaryData = jsonDataObj;
      console.log("secondaryData", secondaryData);
    }
  };

  // ------------------------------------
  // handle functions
  // ------------------------------------
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
      </div>
    </>
  );
};

export default Home;
