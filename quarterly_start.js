var mysql = require("mysql");
var connection=null;
const quarterly_med_points = "CALL `oncare`.`schedule_quarterly_med_points`(?,?,?,?,?)";
const quarterly_vital_points =
  "CALL `oncare`.`schedule_quarterly_vital_points`(?,?,?,?);";
const quarterly_act_points = "CALL `oncare`.`schedule_quarterly_act_points`(?,?,?,?);";
const quarterly_journal_points =
  "CALL `oncare`.`schedule_quarterly_journal_points`(?,?,?,?);";
const quarterly_survey_points =
  "CALL `oncare`.`schedule_quarterly_survey_points`(?,?,?,?);";
let quarterly_med_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_med_points,
        values: [period_type, category, start_date, end_date],
      },
      function (err, result) {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
let quarterly_vital_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_vital_points,
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
let quarterly_journal_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_journal_points,
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
let quarterly_survey_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_survey_points,
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
let quarterly_act_schedule = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_act_points,
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
exports.handler = async (event) => {
  

  if(event.action.toLowerCase()==='dev'){
    connection = mysql.createConnection({
      host: "oncare360.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
      user: "oncare",
      password: "=^t!zV4h*uLVzm3x*",
      database: "oncare",
      port: "3316",
    });

  }else if(event.action.toLowerCase()==='qa'){
    connection = mysql.createConnection({     
      host: "oncare360qa.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
      user: "oncareqa",
      password: "feBkhqyFpVxSDZeLuzGd",
      database: "oncare",
      port: "3336",
    });
  }else if(event.action.toLowerCase()==='prod'){
    connection = mysql.createConnection({
      host:"oncareprod.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
      user: "oncareprod",
      password: "TmLxAqw!Yo#xQvt2",
      database: "oncare",
      port: "3326",
    });
  }
  connection.connect();

  
  let quarterly = "quarterly";
  let medication = "Medication";
  let activity = "Activity";
  let survey = "Survey";
  let journal = "Journal";
  let vital = "Vital";

  let quarter_start_day = new Date();
  let quarter_start_count = Math.floor((quarter_start_day.getMonth() / 3));
  let quarter_start_date = new Date(quarter_start_day.getFullYear(), quarter_start_count * 3, 1);
  let quarter_end_date = new Date(quarter_start_date.getFullYear(), quarter_start_date.getMonth() + 3, 0);
console.log(quarter_end_date);

   new Promise(async(resolve, reject) => {
    await quarterly_med_schedule(quarterly, medication, quarter_start_day,quarter_end_day);
    await quarterly_act_schedule(quarterly, activity, quarter_start_day,quarter_end_day);
    await quarterly_vital_schedule(quarterly, vital, quarter_start_day,quarter_end_day);
    await quarterly_journal_schedule(quarterly, journal, quarter_start_day,quarter_end_day);
    await quarterly_survey_schedule(quarterly, survey, quarter_start_day,quarter_end_day);
    resolve(true);
  });
};
