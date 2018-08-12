const User = require("../models/User")

const users = [
  {
    email: "testemail1@email.com",
    password: 'password1',
  },
  {
    email: 'testemail2@email.com',
    password: 'inval'
  },
  {
    email: 'testemail3@email.com',
    password: 'validpassword'
  }
]

const seed = async () => {
  const saved = await new User(users[0]).save()
  await saved.generateAuthToken()
  users[0] = saved
}

module.exports = {
  users,
  seed
}
