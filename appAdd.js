import express from "express";
import {assignments} from "./data/assignments.js"
import {comments} from "./data/comments.js"

let mockUpAssignments = assignments;
let mockUpComments = comments;

const app = express(); // app เก็บผลลัพธ์จากการ execute express()
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//localhost:4000/assignments/2/comments
app.get("/assignments/:assignmentsId/comments",(req,res)=>{
    const assId = Number(req.params.assignmentsId);
    //console.log(assId)
    const result = mockUpComments.filter((item)=>{
        return item.assignmentId === assId
    })
    console.log(result)
    return res.json({
        message: "Complete fetching comments",
        data: {...result},
      })
  });

/*
//body
{
 assignmentId: String,
 content: String,
}
*/
//localhost:4000/assignments/2/comments
  app.post("/assignments/:assignmentsId/comments",(req,res)=>{
    const assignmentId = Number(req.params.assignmentsId);
    //console.log(assignmentId)
    const newCom = ({
        id: mockUpComments[mockUpComments.length - 1].id + 1,
        ...req.body,
        assignmentId: assignmentId
      })
    mockUpComments.push(newCom);
    //console.log(newCom)

    return res.json({
        message: "New comment has been created successfully",
        data: newCom,
        //afterPost:{...mockUpComments}
      })
  });

app.listen(port, () => {
    console.log(`Server is running ai ${port}`);
});