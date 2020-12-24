import express from 'express'
import mongoose from 'mongoose'
import pusher from 'pusher'
import cors from 'cors'
import mongoData from './mongoData.js'

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(cors())
app.use(express.json())        
// YhU8Vy4caAIAwyAa

// db config
const mongoURI = 'mongodb+srv://admin:YhU8Vy4caAIAwyAa@cluster0.uefy5.mongodb.net/imessageDB?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open',()=>{
    console.log('DB Connected')
})

// api routes
app.get('/', (req, res) => res.status(200).send('Hello Everyone!!'))

app.post('/new/conversation', (req, res) => {
    const dbData = req.body

    mongoData.create(dbData, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/new/message', (req, res) => {
    mongoData.update(
        {_id: req.query.id },
        { $push: { conversation: req.body } },
        (err, data) => {
            if(err) {
                console.log('Error saving maessage')
                console.log(err)

                res.status(500).send(err)
            }else {
                res.status(201).send(data)
            }
        })
})

app.get('/get/coversationList', (req, res) => {
    mongoData.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            data.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });

            let conversation = []

            data.map((conversationsData) => {
                const conversationsInfo = {
                    id: conversationsData._id,
                    name: conversationsData.chatName,
                    timestamp: conversationsData.conversation[0].timestamp
                } 

                conversationsData.push(conversationsInfo)
            })

            res.status(200).send(conversations)
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    mongoData.find({_id: id}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/lastMessage', (req, res) => {
    const id = req.query.id 

    mongoData.find({ _id: id }, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            let convData = data[0].conversation

            convData.sort((b, a) => {
                return a.timestamp - b.timestamp;
            });

            res.status(200).send(convData[0])
        }
    })
})


// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))