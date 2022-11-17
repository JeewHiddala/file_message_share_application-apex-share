const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

const messageApi = require('../apis/message.api');
const authApi = require('../apis/auth.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

//port no for run backend server
const PORT = process.env.TEST_PORT || 8067;
const MONGODB_URI = process.env.MONGODB_URI_TEST;

//connect to database
mongoose.connect(MONGODB_URI || '&w=majority', {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

//open connection
mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

//root route
app.route('/').get((req, res) => {
    res.send('SLIIT SSD Project Test');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});


app.use('/message', messageApi());
app.use('/auth', authApi());

let authId;
let mgrid;
// test('Backend Test Case 01 - should insert a new message', async () => {
//     await request(app).post('/message/create').send({
//         message: "Today is Wednesday",
        
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

test('Backend Test Case 02 - Should create manager', async () => {
    await request(app).post('/auth/signup').send({
        userName: "Sherinlk",
        password: "sherin@1234",
        role: "manager"
    }).expect(200).then((res) => {
        authId = res.body.data._id;
    });
})

test('Backend Test Case 03 - Should insert a new manager', async () => {
    await request(app).post('/employee/create').send({
        name:"Sherin",
        position:"manager",
        email:"saman@skylight.com",
        mobileNumber: "0787555555",
        nicNo:"544481111V",
        salary:75000,
        isWorking: true,
        userName:"samanH",
        password:"saman123",
        userData: "6376002ae62f3a6140d64ba3"
    }).expect(200).then((res) => {
        mgrid = res.body._id;
    });
})

test('Backend Test Case 04 - Should upload new file', async () => {
    await request(app).post('/file/upload').send({
        fileUrl: "http://res.cloudinary.com/svxzwylz/image/upload/v1668668270/xqxajdanll1gdpq6qgav.pdf",
        managerId: "6376002ae62f3a6140d64ba3"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 05 - Should create user', async () => {
    await request(app).post('/auth/signup').send({
        userName: "Shane",
        password: "shane@1234",
        role: "worker"
    }).expect(200).then((res) => {
        id = res.body.data._id;
    });
})

test('Backend Test Case 06 - Should create user but username already exist', async () => {
    await request(app).post('/auth/signup').send({
        userName: "Shane",
        password: "shane@1234",
        role: "worker"
    }).expect(400).then((res) => {
        message = res.body.message;
    });
})

test('Backend Test Case 07 - Should login', async () => {
    await request(app).post('/auth/signin').send({
        userName: "Shane",
        password: "shane@1234"
    }).expect(200).then((res) => {
        id = res.body.id;
    });
})

test('Backend Test Case 08 - Should login but wrong password', async () => {
    await request(app).post('/auth/signin').send({
        userName: "Shane",
        password: "shane@34"
    }).expect(401).then((res) => {
        message = res.body.message;
    });
})

test('Backend Test Case 09 - Should give access to upload files only to managers', async () => {
    await request(app).post('/file/upload').send({
        fileUrl: "http://res.cloudinary.com/svxzwylz/image/upload/v1668668270/xqxajdanll1gdpq6qgav.pdf",
        managerId: "6375340730a25f661a45ddb3"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})