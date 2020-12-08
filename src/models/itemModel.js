const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: Number,
  description: String,
  image: String
}, { timestamps: true }
);

const Item = model('Item', itemSchema)
module.exports = Item
