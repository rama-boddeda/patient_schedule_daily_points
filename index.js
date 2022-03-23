var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "oncare360.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
  user: "oncare",
  password: "=^t!zV4h*uLVzm3x*",
  database: "oncare",
  port: "3316",
});
const daily_med_points = "CALL `oncare`.`schedule_daily_med_points`(?,?,?,?)";
const daily_vital_points =
  "CALL `oncare`.`schedule_daily_vital_points`(?,?,?,?);";
const daily_act_points = "CALL `oncare`.`schedule_daily_act_points`(?,?,?,?);";
const daily_journal_points =
  "CALL `oncare`.`schedule_daily_journal_points`(?,?,?,?);";
const daily_survey_points =
  "CALL `oncare`.`schedule_daily_survey_points`(?,?,?,?);";
let daily_med_schedule = async (period_type, category, curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_med_points,
        values: [period_type, category, curr_date, curr_date],
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
let daily_vital_schedule = async (period_type, category, curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_vital_points,
        values: [period_type, category, curr_date, curr_date],
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
let daily_journal_schedule = async (period_type, category, curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_journal_points,
        values: [period_type, category, curr_date, curr_date],
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
let daily_survey_schedule = async (period_type, category, curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_survey_points,
        values: [period_type, category, curr_date, curr_date],
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
let daily_act_schedule = async (period_type, category, curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_act_points,
        values: [period_type, category, curr_date, curr_date],
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
exports.handler = async (event) => {
  connection.connect();
  let yesterday = new Date();
  let daily = "Daily";
  let medication = "Medication";
  let activity = "Activity";
  let survey = "Survey";
  let journal = "Journal";
  let vital = "Vital";

  yesterday.setDate(yesterday.getDate() - 1);

  return new Promise(async(resolve, reject) => {
    await daily_med_schedule(daily, medication, yesterday);
    await daily_act_schedule(daily, activity, yesterday);
    await daily_vital_schedule(daily, vital, yesterday);
    await daily_journal_schedule(daily, journal, yesterday);
    await daily_survey_schedule(daily, survey, yesterday);
    resolve(true);
  });
};
