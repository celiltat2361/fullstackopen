const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

let phonebook = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
  ]


app.get('/',(req,res)=>{
    res.send('<h1>Phonebook</h1>')
})


app.get('/api/persons',(req,res) => {
    res.json(phonebook)
    console.log(phonebook)
})

app.get('/info',(req,res)=>{
    const len = phonebook.length
    var date = new Date()
    res.send(`Phonebook has info for ${len} people<br>${date}`)
    
})

app.get('/api/persons/:id', (req,res)=>{
    const id = Number(req.params.id)
    const person = phonebook.find(person=>person.id === id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = phonebook.filter(person=>person.id!==id)
    res.json(person)
    phonebook = person
    res.status(204).end()
}) 

app.post('/api/persons', (req,res) => {
    const person = req.body
    if(!person.name){
        return res.status(400).json({
            "error": "name missing"
        })
    }
    if(!person.number){
        return res.status(400).json({
            "error": "number missing"
        })
    }
    const p = phonebook.find(p=>p.name===person.name)
    console.log(p)
    if(p){
        return res.status(400).json({
            "error": "name must be unique"
        })
    }
    const id = Math.floor((Math.random()*4000000)+1)
    person.id = id
    phonebook = phonebook.concat(person)
    res.json(phonebook)

})
const port = 3001
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})