const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
  try{
    const token = req.header('x-auth-token')
    if(!token) res.status(401).json({
      status: 0,
      message: "No authentication token, authorization denied."
    })
    
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    if(!verified) res.status(401).json({
      status: 0,
      message: "Token verification failed, authorization denied."
    })
    req.user = verified
    next()

  }catch(err) {
    res.status(500).json(err)
  }
}

module.exports = auth