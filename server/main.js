
const express = require('express')
const app = express()

app.get('/account/signin', (req, rep) => {
    rep.send('ok')
})

app.listen(8080)
