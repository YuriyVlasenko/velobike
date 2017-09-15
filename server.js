import express  from 'express';
import bodyParser from 'body-parser';
import dbConfig from './config/db'
import serverConfig from './config/server'
import path from 'path';

import dbProvider from './app/db/provider'
import apiRouter from './app/routes/apiRouter'

const staticFolder = 'dist';
const app = express();

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/${staticFolder}`)); 

app.use('/api', apiRouter);

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