const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const cors = require('cors')

// importing routes
const admin = require('./routes/admin');
const writer = require('./routes/writer');
const blogs = require('./routes/blogs');

var corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:3000' ],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions))

mongoose.connect('mongodb+srv://akashsingh:Assignment@cluster0.fwn1v.mongodb.net/Blogging?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected")
    console.log(mongoose.connection.readyState)
});
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send("Hello home page ")
})

app.use('/admin', admin);
app.use('/writer', writer);
app.use('/blogs', blogs);

app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running on port 5000");
})