const express = require('express')
const mongoose = require('mongoose')
// const port = 3001
const PORT = process.env.PORT || 5000
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.Promise = global.Promise
CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:3001/ticket-master>' 
mongoose.connect(CONNECTION_URI)
.then((result) => console.log('Connected to db'))
.catch((err) => console.log('error in connection', err))


const {Schema} = mongoose
const ticketMasterSchema = new Schema({
    name:{
        type: String,
        required:true,
        minlength: 3,
        maxlength: 10
    },
    department:{
        type: String,
        required: true,
        enum:['hr', 'sales', 'technical']
    },
    message: {
        type: String,
        required: true,
        maxlength: 200
    },
    priority:{
        type: String,
        required: true,
        enum:['high', 'medium', 'low']
    },
    status:{
        type: String,
        enum:['open', 'closed'],
        default:'open'
    },
    ticket_code : {
        type: String
        
    }
})

ticketMasterSchema.pre('save', function(next) {
    this.ticket_code = "DCT-" + Math.round(Math.random() * 100000)
    next()
  });

const Ticket = mongoose.model('TicketMaster', ticketMasterSchema)

app.get('/', function(req, res){
    res.send("Welcome to ticket-master")
})

app.get('/tickets', function(req,res){
    Ticket.find()
    .then((tickets) => {
        res.send(tickets)
    })
    .catch((err) => res.send(err))
}) 

app.post('/tickets', function(req, res){
    const body= req.body
    const ticket = new Ticket(body)
    ticket.save()
        .then((ticket) => {
            res.send(ticket)
        })
        .catch((err) =>{
            res.send(err)
        })
})




app.put('/tickets/:id', function(req, res){
	const id = req.params.id
	const body = req.body
	Ticket.findByIdAndUpdate(id, body, function(err, body){
        if(err){
            res.send(err)
        }
    }).then((body) =>{
        res.send(body)
    }).catch((err) => {
        res.send(err)
    })
		
	
})

app.listen(port, function(){
    console.log("Listening to port ", port)
})
