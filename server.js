const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

const connectDB = require('./Config/db')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

//Init req.body Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/products', require('./Routes/Product'));
const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));
    
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));