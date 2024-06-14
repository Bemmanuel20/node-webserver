const express= require('express');
const hbs= require('hbs');
const fs=require('fs');
var app=express();
app.set('view engine','hbs');
    // This middleware serves up a directory
 app.use(express.static(__dirname + '/Public'));
     // This function serves as the maintainence page that stops other localhost servers from executing.
    app.use((req,res,next)=>{
    res.render('maintainence.hbs',{
        pageTitle:'The Site is currently being updated! please be patient with us, we will be back shortly.'
    });

    });


    app.use((req,res,next)=>{
        var now= new Date().toString();
        var log= `${now}:${req.method} ${req.url}`;
        fs.appendFile('main/logger.js',log,error=>{
            if(error){
                console.log('Unable to append to main/logger.js');
            };
        })
            console.log(log);
            next();
    });

        app.get('/',(req,res)=>{
            res.render('home.hbs',{
                pageTitle:'Welcome to my page',
                currentYear:new Date().getFullYear()
            })
        });
        app.get('/about',(req,res)=>{
            res.render('about.hbs',{
                pageTitle: 'Welcome to my About page',
                currentYear: new Date().getFullYear()
            });
        });

        
        app.get('/developer/about',(req,res)=>{
            res.send({
                email:'Bamiseun12@gmail.com',
                telephone: '+2348117373151'
        })
            });
        

    const port=process.env.PORT||4000;
    app.listen(port,()=>{
        console.log(`listening on port ${port}...`)
    });
