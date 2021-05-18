const { default: axios } = require("axios")

exports.create = async (req, res) => {
msisdn=req.header.x-wassup-msisdn
platfrom = ''
username= ''
password = ''
offer = 'falleh'
baseUrl = ''

url = `${baseUrl}/checkCustomerEligibility?msisdn=${msisdn}&offer=${offer}`
header = {
    headers: {
        password: password,
        username : username,
        platfrom : platfrom,
        accept: 'application/json'
    }
  }

authRequest  = await axios.get(url, header)
.then(response => {
    if(response.data.statusResponse.isSuccessful){
        return res.json({
            status : response.data.isEligible
        })
    }else{
        return res.json({
            status : false
        })
    }
})
.catch(error => {
    return res.json({
        status : false
    })
  })
}