import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import fetch from 'node-fetch'

const sendMessage = async(data) => {
  console.log(data)
  try {
    const response = fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response
  }
  catch(error) {
    console.log(error)
  }
}

// init
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

let port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send("Hello world")
})


app.post('/sendForm', async (req, res) => {
  let payload = req.body
  let templateParams = {
    to_name: 'Jonathan Picazo',
    from_name: payload['name'],
    from_email: payload['email'],
    from_subject: payload['subject'],
    message: payload['message']
  }
  let data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    accessToken: process.env.EMAILJS_ACCESS_TOKEN,
    template_params: templateParams
  }

  let r = await sendMessage(data)
  console.log(r)
  res.send(data)

})

app.listen(port, () => {
  console.log(`EmailJS app is listening on port http://localhost:${port}`)
})