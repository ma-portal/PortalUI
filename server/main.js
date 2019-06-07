
const express = require('express')
const cors = require('cors');
const app = express()

app.use('/static', express.static('server/static'))
app.use(cors());

// account

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

app.get('/account/project/:account', (req, rep) => {
    rep.json([
        {
            name: 'T-W',
            link: 'https://github.com/Luncert/T-W',
            lastUpdate: 'Updated 4 days ago',
            commit: 38,
            start: 10,
        },
        {
            name: 'XinAnBackendPoC',
            link: 'https://github.com/Luncert/XinAnBackendPoC',
            language: {
                type: 'Python',
                color: 'rgb(100, 100, 200)'
            },
            lastUpdate: 'Updated on 8 May',
            commit: 61,
            start: 1,
        },
        {
            name: 'flume-iftop-source',
            link: 'https://github.com/Luncert/flume-iftop-source',
            language: {
                type: 'Java',
                color: 'rgb(200, 160, 100)'
            },
            lastUpdate: 'Updated on 6 May',
            commit: 11,
            start: 2,
        },
    ])
})

// studio

app.get('/studio/top-news', (req, rep) => {
    rep.json([
        {
            title: '互联网+报名要截止啦！',
            createTime: '',
        }
    ])
})

app.get('/studio/news', (req, rep) => {
    rep.json([
        {
            title: '工作室2019招新开始啦！',
            createTime: '2019年4月3日',
            description: 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        },
        {
            title: '互联网+大赛报名开始啦！',
            createTime: '2019年4月2日',
            description: 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        }
    ])
})

app.listen(8080)

function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    })
}