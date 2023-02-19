require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddlewware = require('./middleware/error-handler')
//const loadData = require('./populate')
// middleware

app.use(express.json())




app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)



//products route

app.use(notFoundMiddleware)
app.use(errorMiddlewware)



const port = process.env.PORT || 3000

const start = async () => {
    try {
        //loadData()

        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port${port}`))
    } catch (error) {
        console.log(error)
    }


}

start()