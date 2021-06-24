import express from 'express'
import mongoose from 'mongoose'
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.static(path.join(__dirname, "client/public")));

app.use('/posts', postRoutes)
app.get('/', (req, res) => {
    res.send('Hello to Reminisce API')
})

const PORT = process.env.PORT || 5000


mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
    )
    .catch((err) => console.error(err.message))

mongoose.set('useFindAndModify', false)
