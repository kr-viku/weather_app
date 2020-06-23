const path=require('path');
const express=require('express');
const hbs=require('hbs')
const geocode=require('./utils/geocode');
const forcast=require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname, '../public');
const viewsPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Er. Vikash'
    })
})


app.get('/about' ,(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Er. Vikash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Er. Vikash'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {Latitude, Longitude, Location}={})=>{
        if(error){
            return res.send({error})
        }

        forcast(Latitude, Longitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forcast:forcastdata,
                Location,
                address:req.query.address
            })
        })
    })
    // console.log(req.query.address);
    // res.send({
    //     location:req.query.address,
    //     Foracst: "42 degrees"
    // })
}) 

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Error 404',
        name: 'Er. Vikash',
        errorMessage:"Help Article Not Found"
    })
})

app.get('*', (req,res)=>{
    res.render('404' ,{
        title:'Error 404',
        name: 'Er. Vikash',
        errorMessage:"Page Not Found"
    })
})


// app.get('',(req,res) => {
//     res.send("Home Page")
// })

// app.get('/help',(req,res) => {
//     res.send("Help Page")
// })

// app.get('/about',(req,res) => {
//     res.send('<h1 style="text-align:center; color:green;">About</h1>')
// })




app.listen(port,()=>{
    console.log("Server start on port "+port);
})