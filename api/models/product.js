// importing mongoose
const mongoose = require('mongoose');
// created productSchema using .Schema function in Mongoose. Product consists of id, name and price
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, required: true}
});
// exporting schema
module.exports = mongoose.model('Product', productSchema);