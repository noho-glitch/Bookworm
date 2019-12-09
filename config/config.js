require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "bookworm_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "y17gd7lfcn3qee1y",
    password: "px0g09hlw813b0b4",
    database: "kcif97jxfngsogln",
    host: "hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    use_env_variable: "JAWSDB_URL",
  }
};
