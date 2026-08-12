const TeamMember = require('../models/TeamMember')

exports.listTeam = async (req, res, next) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: 1 })
    res.json(team)
  } catch (err) {
    next(err)
  }
}
