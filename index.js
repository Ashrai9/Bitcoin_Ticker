const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const { json } = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
    var crypto = req.body.crypto
    var fiat = req.body.fiat
    let baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
    let finalUrl = baseUrl + crypto + fiat

    request(finalUrl, function (error, response, body) {
        var data = JSON.parse(body)
        var price = data.last
        var currntTime = data.display_timestamp
        res.write("Current time:" + currntTime)
        res.send("The current price of the bitcoin is " + price + "!")
        res.send("<h1>Thank you !</h1>")
        res.send()

    })
})

app.listen(3000, function () {
    console.log("server is running")
})
