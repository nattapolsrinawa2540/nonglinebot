const express = require("express");
const line = require("@line/bot-sdk");
const bodyParser = require('body-parser')
const address = require("./address");
const query = require("./query");
const capital = require("./capital");
const withdraw = require("./withdraw");
const fund = require("./fund");
let cors = require('cors')
const request = require("request");
require("dotenv").config();
const { clientDB } = require("./connect");
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
const data = {
  id: null,
  del:null
};
const IDB = "INSERT INTO question (question) VALUES ($1)";
const SDB = "select * from question order by id ASC";
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

 app.post("/delete", (req, res) => {
 // req.header("Content-Type", "application/json");
  // console.log('====================================');
  // //console.log(`this value =${delparams}`);
  // console.log('====================================');
  clientDB.query(`DELETE FROM question WHERE id in (${req.body.data})`, (err, resDB) => {
    if (err) throw err;
    else{
        if (resDB.rowCount) {
            res.send(`Delete success`);
        }
        else{
                res.send(JSON.stringify(resDB))
        }
    }
    
   
  });
  // console.log(req.body);
  
  // res.send(req.body)
  
  
});
app.delete('/del', (req, res) => {
  console.log(req.query.id);
  clientDB.query(`DELETE FROM question WHERE id=(${req.query.id})`, (err, resDB) => {
    if (err) throw err;
    else{
        if (resDB.rowCount) {
            res.send(`Delete success`);
        }
        else{
                res.send(JSON.stringify(resDB))
        }
    }
    
   
  });
})


app.get('/insert', (req, res) => {
  clientDB.query(IDB, ["กด้กด"], (err, resDB) => {
    if (err) throw err;
    for (let row of resDB.rows) {
      console.log(JSON.stringify(row));
    }
    //  clientDB.end();
  });
  res.send('GET request to the homepage')
})




const config = {
  channelAccessToken:"iCe2xpweK8il5jpHBzhfoRxJSUHfTRKCZP7UT/6XPXMecktuMaa9OS+FbkUK0zX47bzjjm5rF+y2ABIh4hdY/Mlm452KEu3QUPR/cwR7WLrA2Byugg+OVafFugxFyZyJfU5/RE7sQd5vxX6IpG2pfgdB04t89/1O/w1cDnyilFU=",
  channelSecret:'57a649696a5c18e4e05aec7d9a1c0495'
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
  // let msg = {
  //   type: "text",
  //   text: "dffd"
  // };

  let eventText = event.message.text.toLowerCase();

  if (eventText === "5") {
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
  } else if (eventText.replace(/\s+/g, '').slice(0,6)==="delete") { 
   
   let delparams = eventText.slice(6, eventText.length);
 //  data.id=delparams
   await clientDB.query("DELETE FROM question WHERE id=$1", [delparams],  (err, resDB)=>{
           if (err) throw err;
    else{
       if (resDB.rowCount) {
             data.del="Delete success"
             let msg = {
              type: "text",
              text: data.del
            };
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
             return client.replyMessage(event.replyToken, msg);
        }
       else{
            data.del="Delete error"
            let msg = {
              type: "text",
              text: data.del
            };
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
             return client.replyMessage(event.replyToken, msg);    
        }
   } 
     });
   
  
     
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
    });
 
  } else if (eventText === "1") {
    let msg = {
      type: "text",
      text: capital.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  }  else if (eventText === "2") {
    let msg = {
      type: "text",
      text: withdraw.MSG
    };
      return client.replyMessage(event.replyToken, msg);
  }  else if (eventText === "2.1") {
    let msg = {
      type: "text",
      text: withdraw.MSG1
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "2.2") {
    let msg = {
      type: "text",
      text: withdraw.MSG2
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "2.3") {
    let msg = {
      type: "text",
      text: withdraw.MSG3
    };
      return client.replyMessage(event.replyToken, msg);
  }
  else if (eventText === "3") {
    let msg = {
      type: "text",
      text: fund.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ขอรายละเอียดทุนวิจัย") {
    let msg = {
      type: "text",
      text: capital.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  }else if (eventText === "ขอรายละเอียดเบิกเงินวิจัย") {
    let msg = {
      type: "text",
      text: withdraw.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  }else if (eventText === "กองทุนสนับสนุนงานวิจัย") {
    let msg = {
      type: "text",
      text: fund.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  }else if (eventText === "สามารถติดต่อได้ที่") {
    let msg = {
      type: "text",
      text: address.MSG
    };
     return client.replyMessage(event.replyToken, msg);
  }
  else if (eventText === "คุยกับบอท") {
    let msg = {
      type: "text",
      text:
      "น้องบอทสามารถตอบคำถามโดยกด\n1.ทุนวิจัย\n2.เบิกเงินวิจัย\n3.กองทุนสนับสนุนงานวิจัย\n4.เอกสารดาวน์โหลด\n5.ที่อยู่"
    };
     return client.replyMessage(event.replyToken, msg);
  }  else if (eventText === "4") {
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
        "น้องบอทสามารถตอบคำถามโดยกด\n1.ทุนวิจัย\n2.เบิกเงินวิจัย\n3.กองทุนสนับสนุนงานวิจัย\n4.เอกสารดาวน์โหลด\n5.ที่อยู่"
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
