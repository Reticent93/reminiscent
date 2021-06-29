import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
dotenv.config()

const app = express()
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });


app.use('/posts', postRoutes)
// app.get('/', (req, res) => {
//     res.send('Hello to Reminisce API')
// })

//mongodb atlas
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 8090


mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
    .catch((err) => console.error(err))

mongoose.set('useFindAndModify', false)
