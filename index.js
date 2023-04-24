var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const express = require('express')
import express from 'express';
const app = express();
const port = process.env.PORT;
//const path = require('path')
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const { UserCollection, RegistrationReqCollection, RoleCollection } = require('./models/schema')
app.use("/models", express.static(__dirname + '/models'));
import { UserCollection, RegistrationReqCollection, connectDB } from './models/schema.js';
//const DB = require('./scripts/mongodb')
//import DB from './scripts/mongodb.js';
app.use(express.static('public'));
const templatePath = path.join(__dirname, './templates');
//Pathing
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/models", express.static(__dirname + '/models'));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));
import bcrypt from "bcryptjs";
connectDB();
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    };
    yield RegistrationReqCollection.insertMany([data]);
    //TODO Add info popup instructing user to wait
    res.render('login'); // Once user signups, redirected to login page (Was home page)
}));
//DEBUG TEST email=LDown@gmail.com password=password
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield UserCollection.findOne({
            email: req.body.email
        });
        var passwordIsValid = bcrypt.compareSync(req.body.password, check.password);
        if (passwordIsValid) {
            switch (check.role) { // checks user role and redirects to appropriate homepage
                case 'Root':
                    res.render('root/home');
                    break;
                case 'Admin':
                    res.render('admin/home');
                    break;
                case 'Provider':
                    res.render('provider/home');
                    break;
                default:
                    res.send("Cannot redirect: unknown role");
            }
        }
        else {
            res.send("Wrong password");
        }
    }
    catch (_a) {
        res.send("Wrong details");
    }
    //res.render('home') ???
}));
app.get('/root/registration-req', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requests = RegistrationReqCollection;
    let result = yield requests.find({})
        .then((requestData) => {
        res.render('root/registration-req', { data: requestData });
    })
        .catch((err) => {
        res.send('No registration requests');
    });
}));
app.post('/root/registration-req'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    yield UserCollection.insertMany([data]);
    res.send("An error has occured");
});
//"0.0.0.0"
app.listen(Number(port), "0.0.0.0", function () {
    console.log('port connected');
});
