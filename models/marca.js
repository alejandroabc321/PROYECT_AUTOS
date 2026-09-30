let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MarcaSchema = Schema({
  nombre: String,
  paisOrigen: String,
  fundacion: Number
})

module.exports = mongoose.model('Marca', MarcaSchema, 'marcas')