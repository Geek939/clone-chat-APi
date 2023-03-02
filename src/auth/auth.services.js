const checkUserCredentials = require('./auth.controller')
const response = require('../utils/handleResponses')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
    const { email, password } = req.body
    checkUserCredentials(email, password)
        .then(data => {
            if(data){
                
                const token = jwt.sign({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName
                }, 'academlo', {
                    expiresIn: '1d'
                })

                response.success({
                    res,
                    status:200,
                    message: 'Correct Credentials! :D',
                    data: token
                })
            } else {
                response.error({
                    res,
                    status: 401,
                    message: 'Invalid Credentials O_X'
                })
            }
        })
        .catch(err => {
            response.error({
                res,
                status:400,
                data: err,
                message: 'Something is Bad X_X'
            })
        })
}

module.exports = postLogin
