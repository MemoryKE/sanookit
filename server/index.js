

const express = require('express')
const app = express()
const port = 3000

const CryptoJS = require("crypto-js")

const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './assets')
    },
    // filename: function (req, file, callback) {
    //     callback(null, file.filename)
    // },
})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//        if (file.fieldname === "profile") {
//            cb(null, './assets/')
//        }
//     },
//     filename:(req,file,cb)=>{
//             cb(null, file.originalname)

//     }
// });

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 7 } })

const mongoose = require('mongoose')

const Student = require('./models/Student')
const Learning = require('./models/LearningResources')
const User = require('./models/User')
// mongoose.connect('mongodb://localhost:27017/sanookit', { useNewUrlParser: true })

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
};

app.use(express.json())
app.use(cors(corsOptions));
app.use('/assets', express.static('./assets'));

const mongoAtlasUri = "mongodb+srv://dbAdmin:admin1234@sanookit.g5spwuu.mongodb.net/sanookkit?retryWrites=true&w=majority";

// Connect to the MongoDB cluster
mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('monogodb connected')
})

const scrkey = "sanookkitToken"

// student
app.get('/student', async (req, res) => {
    const students = await Student.find();
    res.json(students);
})

app.post('/student', async (req, res) => {
    const payload = req.body;
    const students = new Student(payload);
    await students.save();
    res.status(201).end();
})

app.put('/student/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, { $set: payload });
    res.json(student);
});

app.delete('/student/:id', async (req, res) => {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);
    res.status(204).end();
});

// learning
app.get('/learning-resource', async (req, res) => {
    const learning = await Learning.find();
    res.json(learning);
})
app.post('/learning-resource', upload.array("img_files[]", 20), async (req, res) => {
    // try {
    //     upload.single('img_url')
    // } catch (error) {
    //     res.send(error)
    // }


    const payload = JSON.parse(JSON.stringify(req.body));
    console.log(payload)
    req.body.image_name_list.forEach((item, index) => {
        if (item.type != 'activity') {
            payload[item.field] = req.files[index].filename
        } else if (item.type == 'activity' && item.field == 'qr_name') {
            payload.activities[item.index][item.field] = req.files[index].filename
        } else if (payload.activities[item.index].imgs_name[0] == "morkUp") {
            payload.activities[item.index].imgs_name.pop()
            payload.activities[item.index][item.field].push(req.files[index].filename)
        } else {
            payload.activities[item.index][item.field].push(req.files[index].filename)
        }
    })
    const learning = new Learning(payload);
    await learning.save();
    console.log('test', payload)
    // payload.img_url = payload.img_url.filename
    // payload.pdf_img = payload.pdf_img.filename
    // const learnings = new Learning(payload);
    // await learnings.save();
    res.send(req.files)
    // const payload = req.body;
    // const file = req.files

    // console.log(JSON.stringify(req.body))
    // console.log('test')
    // try {
    //   fs.statSync('assets')
    // } catch (error) {
    //   fs.mkdirSync('assets')
    // }

    // console.log(students)
    // console.log(payload)
    // console.log(file)

    // fs.writeFileSync(path.join('assets', 'image.pdf'), students.img_url)


    // res.status(201).end();
});

app.delete('/learning-resource/:id', async (req, res) => {
    const { id } = req.params;
    const learningData = await Learning.findById(id)
    switch (learningData.learning_type) {
        case 'คู่มือสนุกคิด':
            fs.unlinkSync(`./assets/${learningData.img_name}`)
            fs.unlinkSync(`./assets/${learningData.pdf_name}`)
            break;
        case 'สื่อสนุกคิด':
            fs.unlinkSync(`./assets/${learningData.img_name}`)
            learningData.activities.forEach((act) => {
                if (act.qr_name) { fs.unlinkSync(`./assets/${act.qr_name}`) } else {}
                act.imgs_name.forEach((img) => {
                    fs.unlinkSync(`./assets/${img}`)
                })
            })
            break;
        case 'แหล่งเรียนรู้อื่น':
            fs.unlinkSync(`./assets/${learningData.img_name}`)
            break;
        default:
            break;
    }
    await Learning.findByIdAndDelete(id);
    res.status(204).end();
    // try {
    //     fs.unlinkSync('./assets/à¸à¸¹à¹à¸¡à¸·à¸­ à¸.2.pdf')
    //     res.status(204).end()
    // } catch (error) {
    //     console.log(error)
    //     res.send(error)
    // }

});

//  user
app.get('/user', async (req, res) => {
    console.log(req.header('access_token'))
    const userList = await User.find();
    res.json(userList);
})

app.post('/user', async (req, res) => {
    const payload = req.body;
    const users = new User(payload);
    await users.save();
    res.status(204).end();
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    res.status(204).end();
});

// app.post('/register', async (req, res) => {
//     const payload = req.body;
//     const authUser = new User(payload);
//     const isUnique = await User.findOne({ username: authUser.username });
//     if (isUnique == null) {
//         // await authUser.save();
//         res.json({
//             message: 'success'
//         })
//     } else {
//         res.json({
//         user: isUnique
//     })
//     }
    
// })

app.post('/signin', async (req, res) => {
    const payload = req.body;
    const authUser = new User(payload);
        const authedUser = await User.findOne({ username: authUser.username });
        if (authedUser) {

            const authedPass = decrypt(authedUser.password)
            const authPass = decrypt(authUser.password)
            const isCorrectPass = authPass.includes(authedPass)
            if (isCorrectPass) {
                // const cd = new Date().toLocaleString('en-US', {
                //     timeZone,
                //   })
                const token = {
                    username: authedUser.username,
                    role: authedUser.role,
                    timestamp: currentDate()
                }
                res.json({
                    token: encrypt(JSON.stringify(token))
                })
            } else {
                res.json({
                    message: 'incorrect password'
                })
            }
        } else {
            res.json({
                message: "user not found"
            })
        }
        
})


const currentDate = () => {
    const today = new Date()
    const timezone = today.getTimezoneOffset() * -60
    return new Date(today.getTime() + timezone  * 60 * 60 * 1000)
}

const encrypt = (src) => {
    return CryptoJS.AES.encrypt(src, scrkey).toString()
}
const decrypt = (src) => {
    const bytes = CryptoJS.AES.decrypt(src, scrkey)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
}

app.listen(port, () => {
    console.log(`Start server at port ${port}.`)
})