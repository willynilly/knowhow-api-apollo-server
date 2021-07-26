require("dotenv").config();

const {
  PG_CLIENT,
  DEV_PG_HOST,
  DEV_PG_DATABASE,
  DEV_PG_USER,
  DEV_PG_PASSWORD,
  DEV_PG_PORT,
  DEV_PG_POOL_MIN,
  DEV_PG_POOL_MAX,
  STAGING_PG_HOST,
  STAGING_PG_DATABASE,
  STAGING_PG_USER,
  STAGING_PG_PASSWORD,
  STAGING_PG_PORT,
  STAGING_PG_POOL_MIN,
  STAGING_PG_POOL_MAX,
  PROD_PG_HOST,
  PROD_PG_DATABASE,
  PROD_PG_USER,
  PROD_PG_PASSWORD,
  PROD_PG_PORT,
  PROD_PG_POOL_MIN,
  PROD_PG_POOL_MAX,
} = process.env;

module.exports = {
  development: {
    client: PG_CLIENT,
    connection: {
      host: DEV_PG_HOST,
      database: DEV_PG_DATABASE,
      user: DEV_PG_USER,
      password: DEV_PG_PASSWORD,
      port: DEV_PG_PORT,
    },
    pool: {
      min: parseInt(DEV_PG_POOL_MIN),
      max: parseInt(DEV_PG_POOL_MAX),
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  staging: {
    client: PG_CLIENT,
    connection: {
      host: STAGING_PG_HOST,
      database: STAGING_PG_DATABASE,
      user: STAGING_PG_USER,
      password: STAGING_PG_PASSWORD,
      port: STAGING_PG_PORT,
    },
    pool: {
      min: parseInt(STAGING_PG_POOL_MIN),
      max: parseInt(STAGING_PG_POOL_MAX),
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: PG_CLIENT,
    connection: {
      host: PROD_PG_HOST,
      database: PROD_PG_DATABASE,
      user: PROD_PG_USER,
      password: PROD_PG_PASSWORD,
      port: PROD_PG_PORT,
    },
    pool: {
      min: parseInt(PROD_PG_POOL_MIN),
      max: parseInt(PROD_PG_POOL_MAX),
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
