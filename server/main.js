
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

app.get('/account/signin/:credential', async (req, rep) => {
    await sleep(2000);
    rep.json({
        identified: true
    })
})

app.get('/account/profile/:account', (req, rep) => {
    rep.json({
        account: 'Luncert',
        realName: '李经纬',
        classOf: 2016,
        joinedTime: {
            year: 2017,
            month: 8
        },
        desc: '主要做Java开发，比较菜，希望大家多多指教！',
        tags: ['LOL', 'Java', 'SSM', 'React', 'Golang'],
        email: '2725115515@qq.com',
        qq: '2725115515',
        phone: '18381196466',
        avatar: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
    })
})

app.listen(8080)

function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    })
}