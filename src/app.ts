import express from 'express';
import path from 'path';
const app = express();

// import '../todo/todoController';
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('home');
})

export default app;