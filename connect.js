const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://fsrfogeikfdgbr:8166031667cba5ebc2ffff6e1c0d7f0f29ca98fcd587b8c57c2690049868f2b6@ec2-54-83-202-132.compute-1.amazonaws.com:5432/d1e946iudpinom',
  ssl: true,
});


const  CTB = 'CREATE TABLE question(id SERIAL PRIMARY KEY,question VARCHAR NOT NULL);'
 const IDB = "INSERT INTO question (name) VALUES ($1)"
 
// // client.query(CTB,(err, res) => {
// //   if (err) throw err;
// //   for (let row of res.rows) {
// //     console.log(JSON.stringify(row));
// //   }
// //   client.end();
// // });
//  เปิดโค้ตตรงนี้เพื่อสร้าง database

let createData=()=>{
    client.connect();
    client.query(CTB,(err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      });
}

// let addData=(params)=>{
//     client.connect();
//     client.query(IDB,[params],(err, res) => {
//         if (err) throw err;
//         for (let row of res.rows) {
//           console.log(JSON.stringify(row));
//         }
//         client.end();
//       });
// }
// let  getData=()=>{
//     client.connect();
//     let result = []
//      client.query(SDB,(err, res) => {
//         result.push(res.rows)
//         if (err) throw err;
//         for (let row of res.rows) {
            
//           console.log(JSON.stringify(row));
//         }
       
//         console.log(`this is = ${result}`);
//       });
//       client.end();
    
     
//       return result
    
      
// }
// createData()
module.exports= {
    clientDB:client
}