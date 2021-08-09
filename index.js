const axios = require("axios");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const dateFormat = require("dateformat");
const cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

async function getAuthKey(allConfig) {
  try {
    const authData = await axios.post(
      "https://invest.narnolia.in/modelApi/createSession",
      {
        staCode: allConfig.staCode,
        staPassword: allConfig.staPassword,
      }
    );
    allConfig[".aspxauth"] = authData.headers[".aspxauth"];
    allConfig["access"] = true;
    fs.writeFile("config.json", JSON.stringify(allConfig), () => {});
    return allConfig;
  } catch (error) {
    getAuthKey(allConfig);
  }
}

async function getPortfolios(allConfig) {
  try {
    const pf = await axios.post(
      "https://invest.narnolia.in/modelApi/getModelPortfolioMaster",
      {
        staCode: allConfig.staCode,
      },
      {
        headers: {
          ".aspxauth": allConfig[".aspxauth"],
        },
      }
    );
    return pf.data.data;
  } catch (error) {
    const newConfig = await getAuthKey(allConfig);
    getPortfolios(newConfig);
  }
}

async function getNAVDetails(allConfig, opt) {
  try {
    const pf = await axios.post(
      "https://invest.narnolia.in/modelApi/getNAVDetails",
      {
        staCode: "AZHCL",
        brokerCode: "NFAL",
        FromDate:
          opt === "3m"
            ? dateFormat(
                new Date().setMonth(new Date().getMonth() - 3),
                "dd-mm-yyyy"
              )
            : opt === "1y"
            ? dateFormat(
                new Date().setFullYear(new Date().getFullYear() - 1),
                "dd-mm-yyyy"
              )
            : opt === "3y"
            ? dateFormat(
                new Date().setFullYear(new Date().getFullYear() - 3),
                "dd-mm-yyyy"
              )
            : opt === "5y"
            ? dateFormat(
                new Date().setFullYear(new Date().getFullYear() - 5),
                "dd-mm-yyyy"
              )
            : opt === "max"
            ? "01-04-2014"
            : "01-04-2014",
        ToDate: dateFormat(new Date(), "dd-mm-yyyy"),
      },
      {
        headers: {
          ".aspxauth": allConfig[".aspxauth"],
        },
      }
    );
    // console.log(pf);
    return pf.data.data;
  } catch (error) {
    const newConfig = await getAuthKey(allConfig);
    getNAVDetails(newConfig);
  }
}

app.get("/api/getnavs/:time", (req, res) => {
  fs.readFile("config.json", async (err, data) => {
    const allConfig = JSON.parse(data);
    if (allConfig.access !== true) {
      getAuthKey(allConfig);
    } else {
      const pfs = await getNAVDetails(allConfig, req.params.time);
      res.send(pfs);
    }
  });
});
app.get("/api/getpfs", (req, res) => {
  fs.readFile("config.json", async (err, data) => {
    const allConfig = JSON.parse(data);
    if (allConfig.access !== true) {
      getAuthKey(allConfig);
    } else {
      const pfs = await getPortfolios(allConfig);
      res.send(pfs);
    }
  });
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(5000, () => console.log("Started the server"));
