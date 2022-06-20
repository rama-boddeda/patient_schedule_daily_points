var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "oncare360.cdxmz1r7kgdl.us-east-2.rds.amazonaws.com",
  user: "oncare",
  password: "=^t!zV4h*uLVzm3x*",
  database: "oncare",
  port: "3316",
});
const daily_med_points = "CALL `oncare`.`schedule_med_negative_points`(?)";
const daily_vital_points =
  "CALL `oncare`.`schedule_vital_negative_points`(?);";
const daily_act_points = "CALL `oncare`.`schedule_act_negative_points`(?);";
const daily_journal_points =
  "CALL `oncare`.`schedule_journal_negative_points`(?);";
const daily_survey_points =
  "CALL `oncare`.`schedule_survey_negative_points`(?);";
let daily_med_schedule = async (  curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_med_points,
        values: [curr_date],
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
        values: [curr_date],
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
let daily_journal_schedule = async ( curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_journal_points,
        values: [, curr_date],
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
let daily_survey_schedule = async (curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_survey_points,
        values: [curr_date],
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
let daily_act_schedule = async ( curr_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: daily_act_points,
        values: [curr_date],
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
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return new Promise(async(resolve, reject) => {
    await daily_med_schedule(yesterday);
    await daily_act_schedule( yesterday);
    await daily_vital_schedule( yesterday);
    await daily_journal_schedule( yesterday);
    await daily_survey_schedule( yesterday);
    resolve(true);
  });
};
