// required imports
const express = require('express'); // back-end application framework for building RESTful APIs
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // connects to Atlas MongoDB database  
// routes to products and orders pages
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

// database connection using .env to hide key
mongoose.connect(
    'mongodb+srv://abeershahid1:' + process.env.MONGO_ATLAS_PW + '@node-shop.hvlu8sz.mongodb.net/?retryWrites=true&w=majority', 
)

mongoose.Promise = global.Promise; // prevent deprecation warning

// middleware
app.use(morgan('dev')); // morgan used for logging requests and errors to the console
app.use('/uploads', express.static('uploads')); // makes a folder publicly available, uploads folder specifically
app.use(bodyParser.urlencoded({extended: false})); // parses incoming requests with URL-encoded payloads
app.use(bodyParser.json()); // parses JSON and only looks at requests where content-type header matches type option

// .use function to set headers and permitted methods to server 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    };
    next(); // passes control to next matching route
});

// routes which should handle requests 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// commented out below as not needed, initially used to confirm server is running  

// app.use('/users', userRoute);
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'server is currently running'
//     });
//     next();
// });

// error functions used to show error message and code if error occurs 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
}) 
// takes error variable from above and outputs error message as JSON
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

// export app function
module.exports = app;