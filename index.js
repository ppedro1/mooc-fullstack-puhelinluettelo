const PORT = 3001

const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// serve static react production build
app.use(express.static('build'))
console.log(__dirname)

app.use(cors());
app.use(bodyParser.json())

var persons = [
    {
      "name": "uli uikuttaja",
      "number": "012-7895461",
      "id": 6
    },
    {
      "name": "jere jekuttaja",
      "number": "123-5454545",
      "id": 7
    },
    {
      "name": "jyri simmonen",
      "number": "123-4442323",
      "id": 8
    },
    {
      "name": "peetu pasanen",
      "number": "333-4445555",
      "id": 9
    }
  ]

app.get('/', (req, res) => {
    res.send(`<h1>Hello world</h1>`);
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(a => a.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end();
    }
})

const generateId = () => {
    while (true) {
        var rndID = Math.floor(Math.random() * 1000)
        if (persons.find(a => a.id === rndID) === undefined) {
            break;
        }
    }
    return rndID;
}

app.post('/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.satus(400).json({
            error: 'name or number missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    persons = persons.filter(a => a.id !== id)

    response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
