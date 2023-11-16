
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from 'multer'
import product from './models/product.js';
import nodemailer from "nodemailer"

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use (express.json())
mongoose.connect('mongodb+srv://velchoorigayathri:wYeFRButW9ToGqop@gayathri.imktbdd.mongodb.net/?retryWrites=true&w=majority')

.then(()=>app.listen(5000))
.then(()=>
     console.log("connected to databse and listening to local host 6000")
)
// .catch((err)=>console.log(err));
//      app.post('/addstud',(req,res,next)=>{
//      console.log(req.body.formdata) //formdata from the frontend
//      const {username,email,password} = req.body.formdata//distract method
//      const stud = new student({
//           username,
//           email,
//           password
//      })
//      try{
//           stud.save()      
//      }
//      catch(err){
//           console.log(err)
//      }
//      return res.send({msg:"inserted",result:stud})//for displaying message in the
// }) 
// app.get('/getstudent',async(req,res,next)=>{  //asynchronous await for data fetching
//      //res.send("success")
//       let studentdata
//      try{
//           studentdata = await student.find()
//      }
//      catch(err){
//           console.log(err)
//      }
//      if(!studentdata){
//          console.log("no students found")
//      }
//      return res.status(200).json({studentdata})
// })

//products
app.use('/images',express.static('public/images'))
const storage = multer.diskStorage({
     destination: function (req, file, callback) {
       callback(null, 'public/images')
     },
     filename: function (req, file, callback) {
       // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       callback(null, Date.now()+"_"+file.originalname)
     }
   })
   
   const upload = multer({ storage: storage })
   //add product 
   app.post("/addproduct",upload.single("myfile"),async(req, res, next)=>{
     const productpic=(req.file)? req.file.filename:null
     //console.log(req.body.formdata)
     const {title,price,category} =req.body
     const prod = new product({
         title,
         price,
         category,
         productpic,
       })
     try{
         prod.save()//for saving the data into the database
         return res.status(200).json({ message: 'Product added to cart successfully' });
     }catch(err){
            return res.status(400).json({message:"not uploaded"})
     }      
 })
 
 app.get('/getallproduts',async(req,res,next)=>{
     let productsdata; 
     try{
         productsdata=await product.find();
     }catch(err){
         console.log(err);
     }
     if(!productsdata){
 
         return res.status(404).json({message:"no student found."})
 
     }
     return res.status(200).json(productsdata)
 })

       
  
   
   