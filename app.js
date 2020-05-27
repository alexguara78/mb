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
    database: 'heroku_906ae94e9705448',
    port: 8889
});
//sql.query("use nodejs");
app.use('/img',express.static('img'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));


//template engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');


app.get("/",function(req,res){res.render('index');});
app.get("/inserir",function(req,res){res.render('inserir')});
app.get("/select/:id?",function(req,res){
if (!req.params.id){
sql.getConnection(function(err,connection){
connection.query('select * from user order by id asc', function(err,results, fields){
    res.render('select',{data:results});
});
});

}else{
sql.getConnection(function(err,connection){
connection.query('select * from user where id=? order by id asc',[req.params.id], function(err,results, fields){
res.render('select',{data:results});
});
});
}
});

app.post("/controllerForm",urlencodedParser,function(req,res){
    sql.query("insert into user values (?,?,?)", [req.body.id,req.body.name,req.body.age]);
    res.render('controllerForm',{name:req.body.name});
});


app.get('/deletar/:id',function(req,res){
    sql.query("delete from user where id=?",[req.params.id]);
    res.render('deletar');
});

app.get("/update/:id",function(req,res){
    sql.query("select * from user where id=?",[req.params.id],function(err,results,fields){
        res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
    });
});
app.post("/controllerUpdate",urlencodedParser,function(req,res){
   sql.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
   res.render('controllerUpdate');
});



//start server
let port=3000 || process.env.PORT;
app.listen(port); 

