var mysql = require("mysql");
var connection ;
const quarterly_schedule_badge_by_period_type = "CALL `oncare`.`schedule_badge_by_period_type`(?,?,?,?)";
const schedule_badge_by_period_type = "CALL `oncare`.`schedule_quarterly_badge_by_category`(?,?,?,?,?)";
let quarterly_badge_by_period_type = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: quarterly_schedule_badge_by_period_type,
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
let badge_by_period_type = async (period_type,badge_type, category, start_date,end_date) => {
    return new Promise(async function (resolve, reject) {
      connection.query(
        {
          sql: schedule_badge_by_period_type,
          values: [period_type, badge_type,category, start_date, end_date],
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
  
  let quarterly = "quarterly";
  let badge_type_gold = "Gold";
  let badge_type_ms = "Movers and Shakers";
  let badge_type_journal = "Journal in chief";
  let badge_type_survey = "Survey Master";
  let badge_type_ct = "Conscientious Tester";
  let medication = "Medication";
  let activity = "Activity";
  let survey = "Survey";
  let journal = "Journal";
  let vital = "Vital";

  let quarter_start_day = new Date();
  let quarter_start_count = Math.floor((quarter_start_day.getMonth() / 3));
  let quarter_start_date = new Date(quarter_start_day.getFullYear(), quarter_start_count * 3, 1);
  let quarter_end_date = new Date(quarter_start_date.getFullYear(), quarter_start_date.getMonth() + 3, 0);


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

   new Promise(async(resolve, reject) => {
    await quarterly_badge_by_period_type(quarterly, badge_type_gold, quarter_start_date,quarter_end_date);
    await badge_by_period_type(quarterly, badge_type_ct,vital ,quarter_start_date,quarter_end_date);   
    await badge_by_period_type(quarterly, badge_type_ms,activity, quarter_start_date,quarter_end_date);   
    await badge_by_period_type(quarterly, badge_type_journal, journal,quarter_start_date,quarter_end_date);   
    await badge_by_period_type(quarterly, badge_type_survey, survey,quarter_start_date,quarter_end_date);  
    resolve(true);
  });
};
