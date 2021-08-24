const express=require('express')
const nodemailer=require('nodemailer')
const app=express()
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
const port=9090
 
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


 
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
    user: "ankitchauhan.mobilyte@gmail.com",
    pass: "wfapiyjbsbzuirod"
    }
   });
    
   var mailOptions={
    from : "ankitchauhan.mobilyte@gmail.com",
    to : "goelsweety73@gmail.com",
    subject : "helloo",
    text : "hello"
    }
    
//    smtpTransport.sendMail(mailOptions,function(error, response){
//     if(error){
//     console.log(error);
//     }else{
//     console.log("Message sent: " + response.response);
//     }
//     });
    readHTMLFile(__dirname + '/index.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'ankitchauhan.mobilyte@gmail.com',
            to : 'goelsweety73@gmail.com',
            subject : 'test subject',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }else{
                console.log("Message sent: " + response.response);
                }
        });
    });

app.listen(port,()=>{
 console.log(`server is runnning on port ${port}`)
})

