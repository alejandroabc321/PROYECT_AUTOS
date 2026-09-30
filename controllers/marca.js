let Marca = require('../models/marca')

const controller = {
  getMarcas: function (req, res) {
    Marca.find({}).exec()
      .then(marcaList => {
        if (!marcaList) return res.status(404).send({ message: "No data found" })
        return res.status(200).json(marcaList)
      })
      .catch(err => res.status(500).send({ message: `Error: ${err}` }))
  },

  getMarca: function (req, res) {
    let marcaId = req.params.id
    if (marcaId == null) return res.status(404).send({ message: "Marca not found" })

    Marca.findById(marcaId).exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "Marca not found" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Internal error-> ${err}` }))
  },

  saveMarca: function (req, res) {
    let marca = new Marca()
    const { nombre, paisOrigen, fundacion } = req.body

    if (nombre) {
      marca.nombre = nombre
      marca.paisOrigen = paisOrigen
      marca.fundacion = fundacion

      marca.save()
        .then(storedMarca => {
          storedMarca
            ? res.status(200).json({ marca: storedMarca })
            : res.status(404).send({ message: "Error saving the document" })
        })
        .catch(error => res.status(500).send({ message: "Error while saving the document" }))
    } else {
      return res.status(400).send({ message: "Data is not right" })
    }
  },

  updateMarca: function (req, res) {
    let marcaId = req.params.id
    let update = req.body

    Marca.findByIdAndUpdate(marcaId, update, { returnDocument: "after" })
      .then(updatedMarca => {
        if (!updatedMarca) return res.status(404).send({ message: "The document does not exist" })
        return res.status(200).send({ marca: updatedMarca })
      })
      .catch(error => res.status(500).send({ message: `Error while updating ${error}` }))
  },

  deleteMarca: function (req, res) {
    let marcaId = req.params.id

    Marca.findByIdAndDelete(marcaId)
      .then(removedMarca => {
        if (!removedMarca) return res.status(404).send({ message: "The marca does not exist" })
        return res.status(200).send({ marca: removedMarca })
      })
      .catch(err => res.status(500).send({ message: "Error while deleting" }))
  }
}

module.exports = controller