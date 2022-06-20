var mysql = require("mysql");
var connection ;
const monthly_schedule_badge_by_period_type = "CALL `oncare`.`schedule_badge_by_period_type`(?,?,?,?)";
let monthly_badge_by_period_type = async (period_type, category, start_date,end_date) => {
  return new Promise(async function (resolve, reject) {
    connection.query(
      {
        sql: monthly_schedule_badge_by_period_type,
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
  
  let monthly = "Monthly";
  let badge_type = "Silver";

 
  let month_start_day = new Date();
  month_start_day=new Date(month_start_day.getFullYear(), month_start_day.getMonth(), 1)
  let month_end_day = new Date();
  month_end_day.setDate(month_end_day.getDate() - 1);
  
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
    await monthly_badge_by_period_type(monthly, badge_type, week_start_day,week_end_day);
    resolve(true);
  });
};
