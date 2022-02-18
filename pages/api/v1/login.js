// Andmebaas
const users = [
  { username: "Timmi", password: "qwe123" },
  { username: "Miki", password: "youshallnotpass" }
]

export default function handler (req, res) {
  // Adnembaasi päring
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

  if (!user) {
    // Wrong username or password message
    res.status(400).json({ success: false, message: "invalid credentials" })
    return
  }

  // Success
  res.status(200).json({ success: true, user: user })
}
