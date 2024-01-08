// Start coding here
// โค้ดนี้อยู่ในไฟล์ index.js

import express from "express";
import { assignments } from "./data/assignments.js";
import {comments} from "./data/comments.js"




const app = express();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let newAssign = [...assignments]
let newComment = comments

app.get('/posts', function (req, res) {
  
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
});

app.get("/assignments",function(req,res){
    const limit = Number(req.query.limit)
    if(limit>10){
        return res.json({
            message: "Invalid request,limit must not exceeds 10 assignments",
            })
        
    }

    // return res.json({data : newAssign})
    const result = newAssign.slice(0,limit)
    return res.json({
        message: "Complete Fetching assignments",
        data: result,
      })
})

app.get("/assignments/:assignmentsId",function(req,res){
    let inputId= Number(req.params.assignmentsId)
    let outputData = newAssign.filter((item)=>item.id===inputId)
    if(outputData.length===0){
        return res.status(404).json({message:"No assignment found with given id"})
    }
    return res.json({date : outputData[0]})
    
})


app.post("/assignments",function(req,res){
    newAssign.push({
        id:newAssign[newAssign.length-1].id+1,
        ...req.body,
    })
    return res.json({
        message: "New assignment has been created successfully",
        data: {...newAssign} // ทำไมเอาตัวแปรไปรับแล้วแล้วมาแค่ id
      })
})


app.delete("/assignments/:assignmentsId",function(req,res){
    let inputId= Number(req.params.assignmentsId)
    let deleteItemIndex=newAssign.findIndex((item)=> item.id === inputId)

    if(!deleteItemIndex){
        return res.json({
            message: "Cannot delete, No data available!"
           })
    }
    newAssign.splice(deleteItemIndex,1)
    return res.json({
        message: "Assignment Id : <assignmentsId>  has been deleted successfully",
        data:{...newAssign},
            
          
    })
})

app.put("/assignments/:assignmentsId",function(req,res){
    let inputId= Number(req.params.assignmentsId)
    let assignIndex = newAssign.findIndex((item)=>item.id===inputId)

    if(!assignIndex){
        return res.json({
            message: "Cannot update, No data available!"
           })
    }
newAssign[assignIndex] = {id:inputId,...req.body}
return res.json({
    message: `Assignment Id : ${inputId} has been updated successfully`,
    data: newAssign,
  })
})
