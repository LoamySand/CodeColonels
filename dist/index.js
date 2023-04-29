import express from 'express';
const app = express();
const port = Number(process.env.PORT) || 3000;
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { UserCollection, RegistrationReqCollection, connectDB, ServicesCollection, ResidentCollection, counters, updateCounter } from './models/schema.js';
//Pathing
const templatePath = path.join(__dirname, './templates');
app.use(express.static('dist'));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));
import bcrypt from "bcryptjs";
connectDB();
//*****************************************  SPRINT 1 Login  *********************************************************************************//
app.get('/', (req, res) => {
    res.render('login');
});
app.post('/login', async (req, res) => {
    try {
        const check = await UserCollection.findOne({
            email: req.body.email
        });
        var passwordIsValid = bcrypt.compareSync(req.body.password, check.password);
        if (passwordIsValid) {
            switch (check.role) { // checks user role and redirects to appropriate homepage
                case 'Root':
                    res.redirect(301, 'root/home');
                    break;
                case "Admin":
                    res.render('admin/home');
                    break;
                case "Provider":
                    res.render('provider/home');
                    break;
                default:
                    res.send("Cannot redirect: unknown role");
            }
        }
        else {
            //TODO MAKE THIS A POPUP OR A SCREEN WITH A BACK OPTION
            res.send("Wrong password");
        }
    }
    catch {
        //TODO MAKE THIS A POPUP OR A SCREEN WITH A BACK OPTION
        res.send("Wrong details");
    }
    //res.render('home') ???
});
//***********************************************************************************************************************//
//*****************************************  Register  ******************************************************************************//
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.post('/signup', async (req, res) => {
    //TODO VALIDATE THAT EMAIL IS UNIQUE
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
    };
    await RegistrationReqCollection.insertMany([data]);
    //TODO Add info popup instructing user to wait
    res.render('login'); // Once user signups, redirected to login page (Was home page)
});
//DEBUG TEST PROVIDER email=LDown@gmail.com password=password
//DEBUG TEST ROOT email=RootTest@gmail.com  password=password
//*****************************************  Review Registration Request  *******************************************************************//
app.get('/root/registration-req', async (req, res) => {
    let requests = RegistrationReqCollection;
    await requests.find({})
        .then((requestData) => {
        res.render('root/registration-req', { data: requestData });
    })
        .catch((err) => {
        res.send('No registration requests');
    });
});
app.post('/root/registration-req'), async (req, res) => {
    const data = {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    await UserCollection.insertMany([data]);
    //res.send("An error has occured")
};
//*****************************************  SPRINT 2  ********************************************************************************//
//****************************************  Setup Services******************************************************************************//
app.get('/root/setup', async (req, res) => {
    let services = ServicesCollection;
    await services.find({})
        .then((requestData) => {
        res.render('root/setup', { data: requestData });
    })
        .catch((err) => {
        res.send('No services');
    });
});
app.post('/root/setup', async (req, res) => {
    const start = new Date(req.body.effectiveStart).toLocaleDateString();
    const end = new Date(req.body.effectiveEnd).toLocaleDateString();
    const data = {
        title: req.body.title,
        description: req.body.description,
        permanent: false,
        effectiveStart: start,
        effectiveEnd: end
    };
    await ServicesCollection.insertMany([data]);
    res.redirect('back');
});
//********************************************* SPRINT 3 *****************************************************************************//
//*********************************************  Services Data entry  *************************************************************************//
// ROOT ROUTES
// Check in Resident
app.get('/root/home', (req, res) => {
    res.render('root/home');
});
app.post('/root/home', (req, res) => {
    // INSERT PROVIDED SERVICE
    res.render('root/home');
});
// Record resident service
app.get('/root/resident-services', (req, res) => {
    res.render('root/resident-services');
});
app.post('/root/resident-services', (req, res) => {
    res.render('root/resident-services');
});
// initalize global search results
app.get('/root/resident-search-by-name', (req, res) => {
    res.render('root/resident-search-by-name');
});
app.post('/root/resident-search-by-name', async (req, res) => {
    var resultArray = [];
    // Reset results array every time search button is pressed
    //resultArray.length = 0;
    //TODO PROVIDE LIST OF MATCHING RESIDENTS via form input
    const queryData = [
        { firstName: req.body.firstName },
        { lastName: req.body.lastName }
    ];
    var cursor = await ResidentCollection.find({ '$or': queryData });
    await cursor.forEach(function (doc) { resultArray.push(doc); });
    res.render('root/resident-search-by-name', { data: resultArray });
});
app.get('/root/resident-search-by-feature', (req, res) => {
    res.render('root/resident-search-by-feature');
});
app.post('/root/resident-search-by-feature', (req, res) => {
    //TODO PROVIDE LIST OF MATCHING RESIDENTS via chip input (or textField if needed)
    res.redirect('back');
});
app.get('/root/add-resident-profile', (req, res) => {
    res.render('root/add-resident-profile');
});
app.post('/root/add-resident-profile', async (req, res) => {
    //TODO Popup with resident id
    const dob = new Date(req.body.dob).toLocaleDateString();
    await updateCounter();
    var count = await counters.findOne({}, { seq: 1, _id: 0 });
    var newResidentID = count.seq;
    const resident = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        gender: req.body.gender,
        pronouns: req.body.pronoun,
        dob: dob,
        residentID: newResidentID,
        //TEST
        features: ['blonde', 'blue eyes', 'luigi tattoo']
        //
    };
    await ResidentCollection.insertMany([resident]);
    // TODO if not popup, redirect with profile page for resident with id
    res.render('root/add-resident-profile');
    // TODO interate thru each span to get values for feature array <span class="tag label label-info">tattoos<span data-role="remove">
});
//***********************************************  SPRINT 4  *****************************************************************************//
//****************************************** Generate Reports  *************************************************************//
app.get('/root/report-and-analysis', (req, res) => {
    res.render('root/report-and-analysis');
});
//***********************************************************************************************************************************//
//"0.0.0.0"
app.listen(port, "0.0.0.0", () => {
    console.log('port connected');
});
