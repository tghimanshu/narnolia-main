const axios = require("axios");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const dateFormat = require("dateformat");
const cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

/**
 * Authenticates with the Narnolia API and updates the configuration object with the session key.
 * If authentication fails, it recursively retries.
 *
 * @async
 * @function getAuthKey
 * @param {Object} allConfig - The configuration object containing 'staCode' and 'staPassword'.
 * @returns {Promise<Object>} The updated configuration object with '.aspxauth' token and 'access' set to true.
 */
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

/**
 * Fetches the master list of model portfolios from the Narnolia API.
 * Retries authentication if the request fails.
 *
 * @async
 * @function getPortfolios
 * @param {Object} allConfig - The configuration object containing the authentication token.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of portfolio objects.
 */
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

/**
 * Fetches the Net Asset Value (NAV) details for a specific time range from the Narnolia API.
 * Retries authentication if the request fails.
 *
 * @async
 * @function getNAVDetails
 * @param {Object} allConfig - The configuration object containing the authentication token.
 * @param {string} opt - The time range option ('3m', '1y', '3y', '5y', 'max').
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of NAV data objects.
 */
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

/**
 * API route to retrieve NAV details for a specified time range.
 * Reads configuration, ensures authentication, and returns NAV data.
 *
 * @name get/api/getnavs/:time
 * @function
 * @param {Object} req - The Express request object.
 * @param {string} req.params.time - The time range parameter.
 * @param {Object} res - The Express response object.
 */
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

/**
 * API route to retrieve all model portfolios.
 * Reads configuration, ensures authentication, and returns portfolio data.
 *
 * @name get/api/getpfs
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
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

/**
 * Route to serve the frontend application for a specific ID.
 * Handled by React Router on the client side.
 *
 * @name get/:id
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

/**
 * Default route to serve the frontend application.
 *
 * @name get/
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(5000, () => console.log("Started the server"));
