const environment = process.env.NODE_ENV || "development";
const knexDbConfig = require("../knexfile")[environment];
const KnowHowAPI = require("../api/knowHowAPI");
const knowHowAPI = new KnowHowAPI(knexDbConfig);

const dataSources = () => {
  return { knowHowAPI: knowHowAPI };
};

module.exports = dataSources;
