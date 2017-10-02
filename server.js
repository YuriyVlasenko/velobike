import express  from 'express';
import bodyParser from 'body-parser';
import dbConfig from './config/db'
import serverConfig from './config/server'
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import flash from 'connect-flash';
import cloudinary from 'cloudinary';
import cloudinaryConfig from './config/cloudinaryConfiguration';

import dbProvider from './app/db/provider'
import apiRouter from './app/routes/apiRouter'
import authRouter from './app/routes/authRouter'

const staticFolder = 'dist';
const app = express();

cloudinary.config({
    cloud_name: cloudinaryConfig.cloudName,
    api_key: cloudinaryConfig.APIKey,
    api_secret: cloudinaryConfig.APISecret
});

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/${staticFolder}`)); 

// required for passport
app.use(session({ secret: 'bike', resave: false, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/api', apiRouter);

app.use('/', authRouter);

app.use('/', (req, res)=> {
    res.sendFile(path.resolve(`${__dirname}/${staticFolder}/index.html`))
})




app.listen(serverConfig.port, ()=>{
    console.log(`server lintened on ${serverConfig.port}`);

    dbProvider.connect(dbConfig.url).then(()=>{
        console.log('connection opened');
    }).catch((error)=>{
        console.log('open db error', error);
    });
}) 