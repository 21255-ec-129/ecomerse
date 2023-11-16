import { useState } from "react";
import axios from "axios";
function Addproduct(){
    const[formdata,setFormdata]=useState({
        'title':'',
        'price':'',
        'category':'',
        'productpic':''
    })
    console.log(formdata);
    let backend_api="http://localhost:5000/addproduct"
    const handlesubmit=(e)=>{
        const Inputfields=new FormData()
        Inputfields.append('myfile',formdata.productpic)
        Inputfields.append('title',formdata.title)
        Inputfields.append('price',formdata.price)
        Inputfields.append('category',formdata.category)
        e.preventDefault();
        axios.post(backend_api,Inputfields).then((res)=>{
            console.log(res)
            if(res.status===200){
                alert("success")
            }
        })    
    }
    return(
        <div>
            <h1>User Form</h1>
            <form onSubmit={handlesubmit} action="post">
            <label>title: </label>
                <input type="text"  name="title" value={formdata.title} onChange={(e)=>setFormdata({...formdata,title:e.target.value})}/>
                <br/>
                <label>price: </label>
                <input type="text"  name="price" value={formdata.price} onChange={(e)=>setFormdata({...formdata,price:e.target.value})}/>
                <br/>
                <label>category: </label>
                <input type="category"  name="category"  value={formdata.category} onChange={(e)=>setFormdata({...formdata,category:e.target.value})}/>
                <br/>
                <label>Upload: </label>
                <input type="file"  name="myfile"   onChange={(e)=>setFormdata({...formdata,productpic:e.target.files[0]})}/>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}
export default Addproduct;