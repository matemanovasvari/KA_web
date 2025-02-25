import express from 'express'

const app = express();
app.use(express.json())
let users = [
    { firstName: "Harry", lastName: "Potter" },
    { firstName: "Ronald", lastName: "Bilius Weasley" },
    { firstName: "Hermione", lastName: "Jean Granger" },
    { firstName: "Draco", lastName: "Malfoy" },
    { firstName: "Cedric", lastName: "Diggory" },
    { firstName: "Luna", lastName: "Lovegood" },
  ]

app.get('/users', (req, res) =>{
    res.json(users)
})

app.get('/users/:id', (req, res) =>{
    const id =req.params.id;
    let user = {};
    if(id < users.length && id >= 0)
    {
        user = users[id];
    }
    res.json(user)
})

app.post('/users', (req, res) =>{
    const {firstName, lastName} = req.body
    users.push({firstName,lastName})
    res.json({firstName,lastName})
})

app.put('/users/:id', (req, res) =>{
    const id =req.params.id;
    const {firstName, lastName} = req.body
    if(id < users.length && id >= 0)
    {
       users[id] = {firstName, lastName}
       res.json(users[id])
    }
    else
    {
        res.json({message: "User not found"})
    }
    
})

app.patch('/users/:id', (req, res) =>{
    const id =req.params.id;
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    if(id < users.length && id >= 0)
    {
        if(firstName == undefined && lastName == undefined)
        {
            res.json({message: "can't change the nothing"})
        }
        else if(firstName == undefined)
        {
            users[id].lastName = lastName
            res.json(users[id])
        }
        else if(lastName == undefined)
            {
                users[id].firstName = firstName
                res.json(users[id])
            }
        else
        {
            users[id] = {firstName, lastName}
            res.json(users[id])
        }
       
    }
    else
    {
        res.json({message: "User not found"})
    }
    
})
app.delete('/users/:id', (req, res) =>{
    const id =req.params.id;
    let user = {};
    if(id < users.length && id >= 0)
    {
        user = users[id];
       users = users.filter(checkUser);
        res.json({message: "Delete successful" })
    }
    else
    {
        res.json({message: "User not found" })
    }
    function checkUser(input) {
        return input !=  user;
      }
})

app.listen(3010, () => {
    console.log("Server runs on port 3010")
})

