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
const weekly_med_points = "CALL `oncare`.`schedule_weekly_med_points`(?,?,?,?)";
const weekly_vital_points =
  "CALL `oncare`.`schedule_weekly_vital_points`(?,?,?,?);";
const weekly_act_points = "CALL `oncare`.`schedule_weekly_act_points`(?,?,?,?);";
const weekly_journal_points =
  "CALL `oncare`.`schedule_weekly_journal_points`(?,?,?,?);";
const weekly_survey_points =
  "CALL `oncare`.`schedule_weekly_survey_points`(?,?,?,?);";
let weekly_med_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_med_points,
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
let weekly_vital_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_vital_points,
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
let weekly_journal_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_journal_points,
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
let weekly_survey_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_survey_points,
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
let weekly_act_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_act_points,
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
  let yesterday = new Date();
  let weekly = "Weekly";
  let medication = "Medication";
  let activity = "Activity";
  let survey = "Survey";
  let journal = "Journal";
  let vital = "Vital";

  let week_start_day = new Date('2022-03-20');

  //yesterday.setDate(yesterday.getDate() - 1);
  
  week_start_day.setDate(week_start_day.getDate()-7)
  
  let week_end_day = new Date('2022-03-20');

  week_end_day.setDate(week_end_day.getDate() - 1);

   new Promise(async(resolve, reject) => {
    await weekly_med_schedule(weekly, medication, week_start_day,week_end_day);
    await weekly_act_schedule(weekly, activity, week_start_day,week_end_day);
    await weekly_vital_schedule(weekly, vital, week_start_day,week_end_day);
    await weekly_journal_schedule(weekly, journal, week_start_day,week_end_day);
    await weekly_survey_schedule(weekly, survey, week_start_day,week_end_day);
    resolve(true);
  });
//};
