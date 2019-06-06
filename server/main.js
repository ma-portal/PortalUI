
const express = require('express')
const cors = require('cors');
const app = express()

app.use('/static', express.static('server/static'))
app.use(cors());

app.get('/account/avatar/:account', (req, rep) => {
    rep.json({
        url: 'http://localhost:8080/static/avatar.jpg'
    })
})

app.get('/account/signin/:credential', (req, rep) => {
    rep.json({
        identified: true
    })
})

app.listen(8080)
