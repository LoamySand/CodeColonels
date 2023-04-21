const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const { UserCollection, RegistrationReqCollection, RoleCollection } = require('./models/schema')
const DB = require('./src/mongodb')
app.use(express.static('public'));
const templatePath = path.join(__dirname, './templates')


app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({ extended: false }))

var bcrypt = require("bcryptjs");

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

//DEBUG TEST email=LDown@gmail.com password=password
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
                    res.render('root/home')
                    break
                case 'Admin':
                    res.render('admin/home')
                    break
                case 'Provider':
                    res.render('provider/home')
                    break
                default:
                    res.send("Cannot redirect: unknown role")
            }
        }
        else {
            res.send("Wrong password")
        }
    }
    catch {
        res.send("Wrong details")
    }

    //res.render('home') ???
})

app.get('/root/registration-req', async (req, res) => {
    let requests = RegistrationReqCollection;

    let result = await requests.find({})
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

app.listen(process.env.PORT || 3000, "0.0.0.0", function(){
    console.log('port connected')
})