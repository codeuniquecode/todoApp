import express from 'express';
import path from 'path';
const app = express();

// Set views directory and templating engine (example: EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // or 'pug', 'hbs' depending on your template engine

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    res.render('home');
})

export default app;