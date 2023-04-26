//const express = require('express')
import express from 'express';
const app = express()
const port = Number(process.env.PORT) || 3000;
//const path = require('path')
import {fileURLToPath} from 'url';
import path from 'path';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
//const hbs = require('hbs')
import hbs from 'hbs';
//const { UserCollection, RegistrationReqCollection, RoleCollection } = require('./models/schema')
//app.use("/models", express.static(__dirname + '/models'));
import { UserCollection, RegistrationReqCollection, connectDB } from './models/schema.js';
//const DB = require('./scripts/mongodb')
//import DB from './scripts/mongodb.js';
//app.use(express.static('/dist'));
const templatePath = path.join(__dirname, './templates')

//Pathing
//app.use("/dist", express.static(__dirname+'./dist'))
app.use(express.static('dist'));
//app.use("/scripts", express.static(__dirname + '/scripts'));
//app.use("/models", express.static(__dirname+'/models'));



app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({ extended: false }))

import bcrypt from "bcryptjs";
connectDB();
app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    }

    await RegistrationReqCollection.insertMany([data])
    //TODO Add info popup instructing user to wait
    res.render('login') // Once user signups, redirected to login page (Was home page)
})

//DEBUG TEST PROVIDER email=LDown@gmail.com password=password
//DEBUG TEST ROOT email=RootTest@gmail.com  password=password
app.post('/login', async (req, res) => {
    try {
        const check = await UserCollection.findOne({
            email: req.body.email
        })
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            check.password
        );
        if(passwordIsValid) {
            switch(check.role) { // checks user role and redirects to appropriate homepage
                case 'Root':
                    res.redirect(301, 'root/home')
                    break
                case "Admin":
                    res.render('admin/home')
                    break
                case "Provider":
                    res.render('provider/home')
                    break
                default:
                    res.send("Cannot redirect: unknown role")
            }
        }
        else {
            //TODO MAKE THIS A POPUP OR A SCREEN WITH A BACK OPTION
            res.send("Wrong password")
        }
    }
    catch {
        //TODO MAKE THIS A POPUP OR A SCREEN WITH A BACK OPTION
        res.send("Wrong details")
    }

    //res.render('home') ???
})

// ROOT ROUTES
app.get('/root/home', (req,res)=>{
    res.render('root/home');
})

app.get('/root/setup', (req,res)=>{
    res.render('root/setup');
})
app.get('/root/report-and-analysis', (req,res)=>{
    res.render('root/report-and-analysis');
})

app.get('/root/registration-req', async (req, res) => {
    let requests = RegistrationReqCollection;

    await requests.find({})
        .then((requestData) => {
            res.render('root/registration-req', { data: requestData })
        })
        .catch((err) => {
            res.send('No registration requests')
        })
})

app.post('/root/registration-req'), async (req, res) => {
    const data = {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    await UserCollection.insertMany([data])

    res.send("An error has occured")
}
//"0.0.0.0"
app.listen(port,"0.0.0.0",  ()=> {
    console.log('port connected')
})