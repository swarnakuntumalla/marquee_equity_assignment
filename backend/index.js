const client = require('./connection.js')
const express = require('express');
const cors = require("cors");

var bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();

app.get('/companies', (req, res)=>{
    client.query(`select * from companies`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/add-company', (req, res)=> {
    const companyData = req.body;
    let insertQuery = `insert into companies(cin, name) 
                       values('${companyData.cin}', '${companyData.name}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})