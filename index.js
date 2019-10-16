const express = require("express");
const line = require("@line/bot-sdk");
const address = require("./address");
const query = require("./query");
const capital = require("./capital");
const withdraw = require("./withdraw");
const fund = require("./fund");
const request = require("request");
require("dotenv").config();
const { clientDB } = require("./connect");
const app = express();

const data = {
  id: null,
  del:null
};
const IDB = "INSERT INTO question (question) VALUES ($1)";
const SDB = "select * from question";
clientDB.connect();
app.get("/data", (req, res) => {
  let result = [];
  clientDB.query(SDB, (err, resDB) => {
    result.push(resDB.rows);
    data.id = JSON.stringify(resDB.rows);
    if (err) throw err;
    for (let row of resDB.rows) {
      console.log(JSON.stringify(row));
    }
    res.status(200).json(result)
    console.log(`this is = ${result}`);
  });
});

//  app.get("/delete/:id", (req, res) => {
   //  let eventText="delete34"
//     let sqlDetele = eventText.slice(0,6);
  
    //  if (eventText.slice(0,6)==="delete") {
    //     console.log('====================================');
    //     console.log(`${eventText.slice(0,6)} and ${req.params.id}`);
    //     console.log('====================================');
//     }
//   let delparams = eventText.slice(6,eventText.length);
//   console.log('====================================');
//   console.log(`this value =${delparams}`);
//   console.log('====================================');
//   clientDB.query("DELETE FROM question WHERE id=$1", [delparams], (err, resDB) => {
//     if (err) throw err;
//     else{
//         if (resDB.rowCount) {
//             res.send(`Delete success`);
//         }
//         else{
//                 res.send(JSON.stringify(resDB))
//         }
//     }
    
   
// //   });
  
// });

const config = {
  channelAccessToken:
    "ThXtHfpRU4AJDAQbAXs2UP3QSLzsqXi/TQ5D3nn85jPlrXJmyELlgXRCq1m3a54n7bzjjm5rF+y2ABIh4hdY/Mlm452KEu3QUPR/cwR7WLpSSVhU1e900yQcMZOoV8mhfdqohkHoDwLk88ZeSn4DNQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "0d3c6048012faf01cf74af21a7a85631"
};

const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event) {
  console.log(event);
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

async function handleMessageEvent(event) {
  // let let msg = {
  //   type: "text",
  //   text: "dffd"
  // };

  let eventText = event.message.text.toLowerCase();

  if (eventText === "ขอที่อยู่") {
    let  msg = {
      type: "text",
      text: address.MSG
      
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สอบถาม") {
    // console.dir();
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สอบถามหน่อยครับ") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สอบถามหน่อยค่ะ") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ถามไรหน่อย") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดีครับ") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดีค่ะ") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดี") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "หวัดดี") {
    let msg = {
      type: "text",
      text: query.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText.slice(0,6)==="delete") { 
   
   let delparams = eventText.slice(6, eventText.length);
 //  data.id=delparams
   await clientDB.query("DELETE FROM question WHERE id=$1", [delparams],  (err, resDB)=>{
           if (err) throw err;
    else{
       if (resDB.rowCount) {
             data.del="Delete success"
          
        }
       else{
            data.del="Delete error"
               
        }
   } 
     });
    request(
        {
          method: "POST",
          uri: "https://notify-api.line.me/api/notify",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          auth: {
            bearer: "KkD5Q5KrOjTl9BcwQBxBstj4qZpo8bu0Kk6q9bAPJqv" //token
          },
          form: {
            message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
          }
        },
        (err, httpResponse, body) => {
          if (err) {
            console.log(err);
          } else {
            console.log(body);
          }
        }
      );
  
      let msg = {
        type: "text",
        text: data.del
      };
       return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "report") {
    let result = [];
    clientDB.query(SDB, (err, resDB) => {
      if (err) throw err;
      for (let row of resDB.rows) {
        result.push(row);
        console.log(JSON.stringify(row));
      }
      data.id = JSON.stringify(result);
      console.log(`this is = ${result}`);
    });
    request(
      {
        method: "POST",
        uri: "https://notify-api.line.me/api/notify",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          bearer: "KkD5Q5KrOjTl9BcwQBxBstj4qZpo8bu0Kk6q9bAPJqv" //token
        },
        form: {
          message: `this is eventext=${data.id}` //ข้อความที่จะส่ง
        }
      },
      (err, httpResponse, body) => {
        if (err) {
          console.log(err);
        } else {
          console.log(body);
        }
      }
    );

    let msg = {
      type: "text",
      text: data.id
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ทุนวิจัย") {
    let msg = {
      type: "text",
      text: capital.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ขอรายละเอียดทุนวิจัย") {
    let msg = {
      type: "text",
      text: capital.MSG1
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ทุนวิจัย2564") {
    let msg = {
      type: "text",
      text: capital.MSG2
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ทุนวิจัย2563") {
    let msg = {
      type: "text",
      text: capital.MSG3
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "เบิกเงินวิจัย") {
    let msg = {
      type: "text",
      text: withdraw.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ขอรายละเอียดเบิกเงินวิจัย") {
    let msg = {
      type: "text",
      text: withdraw.MSG1
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "เบิกเงินงวดที่1") {
    let msg = {
      type: "text",
      text: withdraw.MSG2
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "เบิกเงินงวดที่2") {
    let msg = {
      type: "text",
      text: withdraw.MSG3
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "เบิกเงินงวดที่3") {
    let msg = {
      type: "text",
      text: withdraw.MSG4
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "กองทุนสนับสนุนงานวิจัย") {
    let msg = {
      type: "text",
      text: fund.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "คุยกับบอท") {
    let msg = {
      type: "text",
      text:
        "สวัสดีค่ะท่านสามารถสอบถามเกี่ยวกับ\n-ทุนวิจัย\n-เบิกเงินวิจัย\n-กองทุนสนับสนุนงานวิจัย\n-เอกสารดาวน์โหลด\n" +
        "ท่านสามารถดูรายละเอียดโดยการพิมพ์ขอรายละเอียดแต่ละหัวข้อกับน้องบอทได้ เช่น ทุนวิจัย เป็นต้น"
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สามารถติดต่อได้ทางไหนบ้าง") {
    let msg = {
      type: "text",
      text:
        "สวัสดีค่ะท่านสามารถติดต่อ สถาบันวิจัยและพัฒนา มทร.รัตนโกสินทร์ ได้ตามช่องทางการติดต่อด้านล่างนี้\nFacebook : https://www.facebook.com/irdrmutr\nWebsite : https://ird.rmutr.ac.th\nEmail : ird.r@rmutr.ac.th , irdrmutr@hotmail.co.th\nสามารถติดต่อได้ที่ 02-441-6060 ต่อ 2420-2426"
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "เอกสารดาวน์โหลด") {
    let msg = {
      type: "text",
      text:
        "สวัสดีค่ะท่านสามารถดาวน์โหลดเอกสารต่างๆได้ในลิงค์ด้านล่างนี้\nhttps://ird.rmutr.ac.th/formdownload/ "
    };
     return client.replyMessage(event.replyToken, msg);
  } else {
    let msg = {
      type: "text",
      text:
        "น้องบอทสามารถตอบคำถามเกี่ยวกับ\n-ทุนวิจัย\n-เบิกเงินวิจัย\n-กองทุนสนับสนุนงานวิจัย\n-เอกสารดาวน์โหลด"
    };
    if (eventText !== "hello, world" && eventText !== null) {
      //   clientDB.connect();
      clientDB.query(IDB, [eventText], (err, resDB) => {
        if (err) throw err;
        for (let row of resDB.rows) {
          console.log(JSON.stringify(row));
        }
        //  clientDB.end();
      });
    }
     return client.replyMessage(event.replyToken, msg);
  }


}

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function() {
  console.log("run at port", app.get("port"));
});
