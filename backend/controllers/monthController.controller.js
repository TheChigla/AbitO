const User = require('../models/userModel.model')

const updateMonth = async (req, res) => {
  const user = await User.findOne({ email: req.user.email })

  for (let i = 0; i < user.subjects.length; i++) {
    if (user.subjects[i].subject === req.body.subject) {
      const newMonth = user.subjects[i].months.filter(
        month => month.id === parseInt(req.params.key)
      )
      newMonth[0].payed = true
      newMonth[0].payedMoney = parseInt(req.body.payedMoney)

      const newMonths = user.subjects[i].months
      newMonths[parseInt(req.params.key)] = newMonth[0]

      const newSubject = {
        subject: user.subjects[i].subject,
        monthly: user.subjects[i].monthly,
        currency: user.subjects[i].currency,
        months: newMonths,
      }

      user.subjects[i] = newSubject

      await user.save()

      break
    }
  }
}

module.exports = { updateMonth }
