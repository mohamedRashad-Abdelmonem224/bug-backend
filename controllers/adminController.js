const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ error: 'username and password required' })
    
   
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ error: 'invalid credentials' })
    
  
    const valid = await admin.comparePassword(password)
    if (!valid) return res.status(401).json({ error: 'invalid credentials' })
    
   
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}
