const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Hostdbw51",
    database: "crud_db" 
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//get api
app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

//post api
app.post("/api/post",(req,res) => {
    const {name, email, contact} =req.body;
    const sqlInsert =
        "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
        db.query(sqlInsert, [name, email, contact], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
});

//delete api
app.delete("/api/remove/:id",(req,res) => {
    const { id } =req.params;
    const sqlRemove =
        "DELETE FROM contact_db WHERE id = ?";
        db.query(sqlRemove, id, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
});

//get api for update functionality 
app.get("/api/get/:id", (req,res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

//update api
app.put("/api/update/:id", (req,res) => {
    const { id } = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

//testing
app.get("/",(req,res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('mark','mark123@gmail.com',9232588887)";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error", err);
    //     console.log("result", result);
    //     res.send("Hello");
    // });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})