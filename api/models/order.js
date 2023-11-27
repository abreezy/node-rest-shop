// importing mongoose
const mongoose = require('mongoose');
// created orderSchema using .Schema function in Mongoose. Order consists of id, quantity and product object to ensure product can be matched to the order
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1 }
});
// exporting schema
module.exports = mongoose.model('Order', orderSchema);