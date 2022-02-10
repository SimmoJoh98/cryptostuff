const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      let isFound = false

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const verified = bcrypt.compareSync(password, users[i].passHash)
          if (verified) {
            let returnUser = {...users[i]}
            delete returnUser.passHash
            res.status(200).send(returnUser)
            console.log(`logged in ${returnUser.username}`)
            isFound = true
          }
        }
      }
      if(isFound === false){
        res.status(400).send("User not found.")
        console.log('Invalid Login')
      }
    },
    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(7)
        const passHash = bcrypt.hashSync(password, salt)

        let user = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }
        users.push(user)
        let returnUser = {...user}
        delete returnUser.passHash
        res.status(200).send(returnUser)
        console.log(`registered ${user.username}`)
    }
}