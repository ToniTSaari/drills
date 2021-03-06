const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)

app.use(cors('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'))
app.use(express.json())

var heroes = 
[
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

const corsOp = 
{
    origin: "http://localhost:4200",
    optionSuccessStatus: 200
}

server.listen(3000, () =>{
    console.log(server.address().port)
});

app.get("/heroes", cors(corsOp), function(req, res)
{
    console.log('heroes http get request')
    if(req.query.name)
    {
        console.log("heroes search")
        const search = req.query.name.toLowerCase()
        //console.log(search)
        const len = heroes.length
        var result = []
        for(let i = 0; i<len; i++)
        {
            var name = heroes[i].name.toLowerCase()
            if(name.match(search))
            {
                result.push(heroes[i])
            }
        }
        res.json(result)
    }
    else
    {
        res.json(heroes)
    }
})

app.get("/heroes/:id", cors(corsOp), function(req, res)
{
    const id = Number(req.params.id)
    const len = heroes.length
    var hero = {}
    for(let i = 0; i<len; i++)
    {
        if(heroes[i].id === id)
        {
            hero = heroes[i]
        }
    }
    res.json(hero)
})

app.delete("/heroes/:id", cors(corsOp), function(req, res)
{
    const id = Number(req.params.id)
    const len = heroes.length
    //console.log(heroes)
    for(let i = 0; i<len; i++)
    {
        if(heroes[i].id === id)
        {
            heroes.splice(i, 1)
        }
    }
    //console.log(heroes)
    res.json(heroes)
})

app.put("/heroes", cors(corsOp), function(req, res)
{
    const hero = req.body
    const len = heroes.length
    console.log('heroes http put request')
    for(let i = 0; i < len; i++)
    {
        if(heroes[i].id === hero.id)
        {
            heroes[i].name = hero.name
        }
    }
    res.status(201).json(heroes)
})
app.post("/heroes", cors(corsOp), function(req,res)
{
    console.log("heroes http post request")
    const hero = req.body
    const i = heroes.length - 1
    const newId = heroes[i].id + 1
    heroes.push({id: newId, name: hero.name})
    //console.log(heroes)
    res.status(201).json(heroes)
})