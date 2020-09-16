const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());

const Employee = mongoose.model("employee");
const mongouri="mongodb+srv://cnq:kFX2IMKhYuYmMduK@cluster0.qam03.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongouri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo");
})

mongoose.connection.on("error",(error)=>{
    console.log("error in mongo connection",error);
})

app.get('/',(req,res)=>{
    res.send('Hello! Welcome to Node.js');
})

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position,

    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send("success")
    }).catch(error=>{
        console.log(error)
        res.send("error",error)
    })
})

app.listen(3000,()=>{
    console.log('server is running');
})