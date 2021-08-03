const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)

//app.use(cors())

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
    const heroes = [
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
      console.log(heroes)
      res.json(heroes)
})