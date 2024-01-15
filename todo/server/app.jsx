const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


//Middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
}))    
app.use(cors())

//server
const port = 8000
app.listen(port, () => {
    console.log(`banco conectado na porta: ${port}`)
})


