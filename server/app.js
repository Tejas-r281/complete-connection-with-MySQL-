const express= require('express');
const app = express();
const cors= require('cors');
const dotenv= require('dotenv');
const { response } = require('express');

const dbservice= require('./dbservice');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// create
app.post('/insert',(req, res) => {

    const {name} = req.body;
    const db= dbservice.getDbServiceInstance();
    const result= db.insertNewName(name);
    result
    .then(data=>response.json({data:data}))
    .catch(err =>console.log(err));
})

// read

app.get('/getAll',(req, res) => {
     const db=dbservice.getDbServiceInstance();
    const result= db.getAllData();
    result
    .then((data) =>
    res.json({data:data}))
    .catch(err=>console.log(err));
})


app.listen(process.env.PORT ,()=> console.log('app is running'))

