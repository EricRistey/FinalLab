import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Hockey72!",
    database:"labschema"
})


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})


app.get("/fish",(req,res)=>{
    const q = "SELECT * FROM fish"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/fish", (req,res)=>{
    const q = "INSERT INTO fish (`species`, `size`, `pic`) VALUES (?)"
    const values = [
        req.body.species,
        req.body.size,
        req.body.pic,
                    ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Fish has been created successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})