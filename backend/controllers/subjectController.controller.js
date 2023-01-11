const User = require('../models/userModel.model')
const axios = require('axios')

const addSubject = async (req, res) => {
  const user = await User.findById(req.user._id)
  await user.subjects.push(req.body)
  await user.save()

  res.json(user)
}

const getCurrency = async (req, res) => {
  let gel, usd

  await axios
    .get('https://api.businessonline.ge/api/rates/nbg/usd')
    .then(res => {
      usd = res.data
    })
    .catch(err => console.log(err))

  await axios
    .get('https://api.businessonline.ge/api/rates/nbg/gel')
    .then(res => {
      gel = res.data
    })
    .catch(err => console.log(err))

  if (usd && gel) res.json({ usd, gel })
}

const removeSubject = async (req, res) => {
  const user = await User.findOne({ email: req.user.email })

  user.subjects.map(async subject => {
    if (subject.subject === req.params.subject) {
      const newSubejects = user.subjects.filter(
        subj => subj.subject !== req.params.subject
      )

      user.subjects = newSubejects
      await user.save()
    }
  })
}

module.exports = { getCurrency, addSubject, removeSubject }
