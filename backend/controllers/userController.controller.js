const User = require('../models/userModel.model')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Generate JWT function
const generateAccessToken = email => {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const registerUser = async (req, res) => {
  const avatar = req.files ? req.files.avatar : ''

  // Generate hashed parameters for user
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(req.body.password, salt)
  const time = await new Date().getTime()

  // Check if user already exists
  const checkUser = await User.findOne({ email: req.body.email })

  // Save user in database
  if (checkUser === null) {
    avatar
      ? await avatar.mv(
          path.join(
            __dirname,
            '..',
            'images/',
            `${req.body.email}-${time}.png`
          ),
          err => {
            console.log(err)
          }
        )
      : ''

    const token = await generateAccessToken({ email: req.body.email })

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      avatar: avatar ? `${req.body.email}-${time}.png` : '',
    })

    await user.save()

    await res.json({ user, token })
  } else {
    res
      .status(400)
      .json({ err: 'ასეთი ელ.ფოსტით მომხმარებელი უკვე დარეგისტრირებულია' })
  }
}

const loginUser = async (req, res) => {
  // Check if email is correct
  const checkUser = await User.findOne({ email: req.body.email })

  if (checkUser) {
    // Check if password is correct
    const checkPassword = await bcrypt.compareSync(
      req.body.password,
      checkUser.password
    )

    if (checkPassword) {
      const token = await generateAccessToken({ email: req.body.email })

      res.json({
        token,
      })
    } else {
      res.status(400).json('მითითებული პაროლი არასწორია. სცადეთ თავიდან')
    }
  } else {
    res.status(400).json('მითითებული ელ.ფოსტით მომხმარებელი ვერ მოიძებნა')
  }
}

const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select(
    '-password -createdAt -updatedAt'
  )

  res.json(user)
}

module.exports = { registerUser, getUser, loginUser }
