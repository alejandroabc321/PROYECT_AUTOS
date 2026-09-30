let mongoose = require('mongoose')
let Schema = mongoose.Schema

let AutoSchema = Schema({
  modelo: String,
  anio: Number,
  precio: Number,
  marca: { type: Schema.Types.ObjectId, ref: 'Marca' }
})

module.exports = mongoose.model('Auto', AutoSchema, 'autos')