import express from 'express'
import path from 'path'
import __dirname from "./util/rootpath.js"
import productRoutes from './routes/ProductRoutes.js'


const app = express();
const PORT = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use("/api", productRoutes)

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
})

