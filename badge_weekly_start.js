var mysql = require("mysql");
var connection ;
const weekly_schedule_badge_by_period_type = "CALL `oncare`.`schedule_badge_by_period_type`(?,?,?,?)";
let weekly_badge_by_period_type = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: weekly_schedule_badge_by_period_type,
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
  let weekly = "Weekly";
  let badge_type = "Bronze";

  let week_start_day = new Date();

  // let week_start_day = new Date('2022-03-20');  
  week_start_day.setDate(week_start_day.getDate()-7);
  //let week_end_day = new Date('2022-03-20');

  let week_end_day = new Date();

  week_end_day.setDate(week_end_day.getDate() - 1);

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
    await weekly_badge_by_period_type(weekly, badge_type, week_start_day,week_end_day);
    resolve(true);
  });
};
