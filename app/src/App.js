import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addproduct from "./addproduct"
import  Shop from'./shop'
import Shopnew from'./shopnew'

function App(){
  return(
    <div>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Addproduct/>}/>
  <Route path='/shop' element={<Shop/>} />
  <Route path='/shopnew' element={<Shopnew/>} />

</Routes>
</BrowserRouter>
    </div>
  )
}export default App
