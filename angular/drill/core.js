const express = require('express')
const app = express()
const server = require('http').createServer(app)

server.listen(3000, () =>{
    console.log(server.address().port)
});

app.get("/heroes", function(req, res)
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
      res.json(heroes)
})