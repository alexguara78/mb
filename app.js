//Variables
'use strict ';
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const cors=require('cors');
const app=express();
const urlencodedParser=bodyParser.urlencoded({extended:false});
const sql=mysql.createPool({
 
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b3aa9411248041',
    password: '5c7432b7',
    database: 'heroku_906ae94e9705448'
});

app.use('/img',express.static('img'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));


//template engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');


app.get("/",function(req,res){res.render('oi');});

//start server
let port=process.env.PORT || 3000;
app.listen(port,function(req,res){console.log('Servidor está rodando!');});

