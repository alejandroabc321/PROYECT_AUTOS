let Auto = require('../models/auto')

const controller = {
  getAutos: function (req, res) {
    Auto.find({}).populate('marca').exec()
      .then(autoList => {
        if (!autoList) return res.status(404).send({ message: "No data found" })
        return res.status(200).json(autoList)
      })
      .catch(err => res.status(500).send({ message: `Error: ${err}` }))
  },

  getAuto: function (req, res) {
    let autoId = req.params.id
    if (autoId == null) return res.status(404).send({ message: "Auto not found" })

    Auto.findById(autoId).populate('marca').exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "Auto not found" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Internal error-> ${err}` }))
  },

  saveAuto: function (req, res) {
    let auto = new Auto()
    const { modelo, anio, precio, marca } = req.body

    if (modelo && marca) {
      auto.modelo = modelo
      auto.anio = anio
      auto.precio = precio
      auto.marca = marca

      auto.save()
        .then(storedAuto => {
          storedAuto
            ? res.status(200).json({ auto: storedAuto })
            : res.status(404).send({ message: "Error saving the document" })
        })
        .catch(error => res.status(500).send({ message: "Error while saving the document" }))
    } else {
      return res.status(400).send({ message: "Data is not right" })
    }
  },

  updateAuto: function (req, res) {
    let autoId = req.params.id
    let update = req.body

    Auto.findByIdAndUpdate(autoId, update, { returnDocument: "after" })
      .then(updatedAuto => {
        if (!updatedAuto) return res.status(404).send({ message: "The document does not exist" })
        return res.status(200).send({ auto: updatedAuto })
      })
      .catch(error => res.status(500).send({ message: `Error while updating ${error}` }))
  },

  deleteAuto: function (req, res) {
    let autoId = req.params.id

    Auto.findByIdAndDelete(autoId)
      .then(removedAuto => {
        if (!removedAuto) return res.status(404).send({ message: "The auto does not exist" })
        return res.status(200).send({ auto: removedAuto })
      })
      .catch(err => res.status(500).send({ message: "Error while deleting" }))
  }
}

module.exports = controller