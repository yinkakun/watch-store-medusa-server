const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
if (process.env.NODE_ENV === "production") {
  ENV_FILE_NAME = ".env.production";
}

if (process.env.NODE_ENV === "staging") {
  ENV_FILE_NAME = ".env.staging";
}

if (process.env.NODE_ENV === "test") {
  ENV_FILE_NAME = ".env.test";
}

if (process.env.NODE_ENV === "development") {
  ENV_FILE_NAME = ".env";
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS;

const STORE_CORS = process.env.STORE_CORS;

const DATABASE_URL = process.env.DATABASE_URL;

const REDIS_URL = process.env.REDIS_URL;

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-file-minio`,
    options: {
      bucket: process.env.MINIO_BUCKET,
      endpoint: process.env.MINIO_ENDPOINT,
      access_key_id: process.env.MINIO_ACCESS_KEY,
      secret_access_key: process.env.MINIO_SECRET_KEY,
    },
  },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
