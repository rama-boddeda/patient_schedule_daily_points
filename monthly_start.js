var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "oncare360.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
  user: "oncare",
  password: "=^t!zV4h*uLVzm3x*",
  database: "oncare",
  port: "3316",
});

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
const monthly_med_points = "CALL `oncare`.`schedule_monthly_med_points`(?,?,?,?)";
const monthly_vital_points =
  "CALL `oncare`.`schedule_monthly_vital_points`(?,?,?,?);";
const monthly_act_points = "CALL `oncare`.`schedule_monthly_act_points`(?,?,?,?);";
const monthly_journal_points =
  "CALL `oncare`.`schedule_monthly_journal_points`(?,?,?,?);";
const monthly_survey_points =
  "CALL `oncare`.`schedule_monthly_survey_points`(?,?,?,?);";
let monthly_med_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_med_points,
        values: [period_type, category, start_date, end_date],
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
let monthly_vital_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_vital_points,
        values: [period_type, category, start_date, end_date],
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
let monthly_journal_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_journal_points,
        values: [period_type, category, start_date, end_date],
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
let monthly_survey_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_survey_points,
        values: [period_type, category, start_date, end_date],
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
let monthly_act_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_act_points,
        values: [period_type, category, start_date, end_date],
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
//exports.handler = async (event) => {
  connection.connect();
  let monthly = "Monthly";
  let medication = "Medication";
  let activity = "Activity";
  let survey = "Survey";
  let journal = "Journal";
  let vital = "Vital";

  let month_start_day = new Date();
  month_start_day=new Date(month_start_day.getFullYear(), month_start_day.getMonth(), 1)
  let month_end_day = new Date();
  month_end_day.setDate(month_end_day.getDate() - 1);

   new Promise(async(resolve, reject) => {
    await monthly_med_schedule(monthly, medication, month_start_day,month_end_day);
    await monthly_act_schedule(monthly, activity, month_start_day,month_end_day);
    await monthly_vital_schedule(monthly, vital, month_start_day,month_end_day);
    await monthly_journal_schedule(monthly, journal, month_start_day,month_end_day);
    await monthly_survey_schedule(monthly, survey, month_start_day,month_end_day);
    resolve(true);
  });
//};
