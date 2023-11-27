// required imports 
const express = require('express');
const router = express.Router();
const multer = require('multer'); // using for image uploading function to server
const checkAuth = require('../middleware/check-auth'); 
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({ // multer method diskStorage used to specify details of destination and filename
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // cb means callback, if null supplied creates uploads directory
    },
    filename: function(req, file, cb) {
        // below used to append today's date in YYYY-MM-DD format to filename.originalname
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const fileName = `${formattedDate}_${file.originalname}`;
        cb(null, fileName); // cb creating filename with today's date and correct file extension 
        // cb(null, /* new Date().toISOString() + */ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { // only accepts file if of these two types
        cb(null, true);
    } else {
        cb(null, false); 
    }
};

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
}); // parameter used to specify destination for images

// Handle incoming GET requests to /products
router.get('/', checkAuth, ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), checkAuth, ProductsController.products_create_product);

// Handle incoming GET requests to /orders with specified product ID
router.get('/:productID', checkAuth, ProductsController.products_get_product);

// patching function for updating existing items in database
router.patch('/:productID', checkAuth, ProductsController.products_update_product);

// Handle incoming DELETE requests to /orders with specified order ID
router.delete('/:productID', checkAuth, ProductsController.products_delete);

// exporting products function
module.exports = router;

