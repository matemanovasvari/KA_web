import * as fileHandler from "../util/filekezeles.js"

export const getAllproducts =(req, res) =>{
    const products = fileHandler.getData()
    res.json(products)
}

export const getproductById =(req, res) =>{
    const products = fileHandler.getData()
    const id =req.params.id;

    if(id < 0 || id >=products.length)
    {
        return res.status(404).json({message : "product not found"})
    }

    res.status(200).json(products[id])   
}

export const createproduct =(req, res) =>{
    const products = fileHandler.getData()
    const {name, category, price, available} = req.body
    if(!name || !category ||!price, !available)
    {
        return res.status(404).json({message : "Missing some data"})
    }
    const newProduct = {name, category, price, available}
    products.push(newProduct)
    fileHandler.saveData(products)
    res.status(201).json(newProduct)
}

export const updateproduct = (req, res) =>{
    const products = fileHandler.getData()
    const id =req.params.id;

    if(id < 0 || id >=products.length)
    {
        return res.status(404).json({message: "product not found"})
    }
    const {name, category, price, available} = req.body
    if(!name || !category ||!price || !available)
        {
            return res.status(400).json({message : "Missing some data"})
        }

    products[id] = {name, category, price, available}
   fileHandler.saveData(products)
   res.status(200).json(products[id])
}

export const deleteproduct = (req, res) =>{
    const products = fileHandler.getData()
    const id =req.params.id;

    if(id < 0 || id >=products.length)
    {
       return res.status(404).json({message: "product not found" })
    }

    products.splice(id, 1)
    fileHandler.saveData(products)
    res.status(200).json({message: "Delete successful" })
    
}