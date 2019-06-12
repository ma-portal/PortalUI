
const express = require('express')
const cors = require('cors');
const app = express()

require('express-ws')(app)

app.use('/static', express.static('server/static'))
app.use(cors());

// account

// accessible even user is not authorized
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

app.get('/account/profile/', (req, rep) => {
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

app.get('/account/project/', (req, rep) => {
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

// chat

app.get('/chat/member', (req, rep) => {
    rep.json([
        {
            account: 'Helen',
            avatar: 'https://react.semantic-ui.com/images/avatar/small/helen.jpg',
            online: false,
            unreceivedMsg: 1
        },
        {
            account: 'Christian',
            avatar: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
            online: true,
            unreceivedMsg: 0
        },
        {
            account: 'Daniel',
            avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
            online: true,
            unreceivedMsg: 0
        }
    ])
})

app.get('/chat/history/:target', async (req, rep) => {
    await sleep(2000)
    rep.json(chatHistory)
})

const chatHistory = [
    {
        timestamp: Date.now(),
        content: 'hi![:html=<br/>][:emoji=ec-grin][:image=https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2726102536,2091908784&fm=27&gp=0.jpg]I got [:emoji=ec-100] this time![:emoji=ec-innocent]',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi[:image=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1873895543.png]',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: true
    },
    {
        timestamp: Date.now(),
        content: 'hi',
        out: false
    },
]

// app.ws('/chat', (ws, req) => {
//     ws.on('message', (msg) => {
//         if (!messageBox[msg.source]) {
//             messageBox[msg.source] = []
//         }

//         let action = msg.action
//         if (action === 'history') {
//            console.log('get chat history of ' + msg.target)
//            ws.send(JSON.stringify(chatHistory));
//         } else if (action === 'message') {

//         }
//     })
// })

app.listen(8080)

function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    })
}