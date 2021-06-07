const { default: axios } = require("axios")

/**
 * Request MSISDN offre type    
 * @param {Request} req 
 * @param {Response} res 
 */

exports.create = async (req, res) => {
    msisdn = req.header.x - wassup - msisdn
    platfrom = 'platform'
    username = 'mme'
    password = 'mme@2021'
    offer = 'Alfalleh'
    baseUrl = 'https://10.25.29.67:9090'

    url = `${baseUrl}/checkCustomerEligibility?msisdn=${msisdn}&offer=${offer}`
    header = {
        headers: {
            password: password,
            username: username,
            platfrom: platfrom,
            accept: 'application/json'
        }
    }

    authRequest = await axios.get(url, header)
        .then(response => {
            if (response.data.statusResponse.isSuccessful) {
                return res.json({
                    status: response.data.isEligible
                })
            } else {
                return res.json({
                    status: false
                })
            }
        })
        .catch(error => {
            return res.json({
                status: false
            })
        })
}