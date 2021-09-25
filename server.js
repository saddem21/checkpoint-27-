const express= require("express");
const mongoose= require("mongoose");
const User= require("./models/User");
require('dotenv').config()

const PORT = process.env.PORT || 5001
mongoose.connect(process.env.MONGO_URI,(err)=>err ? console.log(err):console.log("database is connected"));
const app= express();
app.use(express.json());


app.listen(PORT,()=>console.log("listening on port:" + PORT));
app.get('/findusers',(req,res)=>{
    User.find({},(err,data)=> {
            if (err) throw err;
            else res.send(data)
        });
    });
app.post("/newuser", (req,res)=> {
    let newuser= new User({...req.body});
    newuser.save((err,data)=> {
        if (err) throw err;
        else res.send(data)
    });
});
app.put('/updatebyid/:id',(req,res)=>{
    const id= req.params.id;
    User.findByIdAndUpdate(id,{...req.body},{new:true})
    .then((user) => {
        if (!user) {
          return res.status(404).send({ msg: "User not found" });
        }
        res.send({ msg: "User updated", user });
      })
      .catch((err) => res.status(400).send({ msg: "ERROR UPDATING USER" }));
    });
app.delete('/removebyid/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err,data)=> {
        if (err) throw err;
        else res.send(data)
    });
});
