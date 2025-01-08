import sqlite3 from "sqlite3";

const DATABASE_PATH = "./database.db";
const DATABASE_SCHEDULE_PATH = "./database_schedule.db";
const CSV_PATH = "./database.csv";

export const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) {
    console.log(err);
  }
});

const init = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS postion(name VARCHAR(10) ,position VARCHAR(1000),date VARCHAR(1000),type VARCHAR(1000),level VARCHAR(1000),sort VARCHAR(1000))`
  );
};

init();
