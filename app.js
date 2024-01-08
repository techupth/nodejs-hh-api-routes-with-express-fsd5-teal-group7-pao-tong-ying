// Start coding here
import express from "express";
import {assignments} from "./data/assignments.js"
import {comments} from "./data/comments.js"

let mockUpAssignments = assignments;
let mockUpComments = comments;

const app = express(); // app เก็บผลลัพธ์จากการ execute express()
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test
//localhost:4000/assignments?limit=3
//localhost:4000/assignments?limit=11
app.get("/assignments",(req,res)=>{
    const limit = req.query.limit;

    if (limit > 10) {
        return res.status(401).json({
            message: "Invalid request,limit must not exceeds 10 assignments"
        })
      }

    const result = mockUpAssignments.slice(0, limit);
    console.log(result)
    return res.json({
        message: "Complete Fetching assignments",
        data: {...result},
      })
  });

  //localhost:4000/assignments/4
  app.get("/assignments/:assignmentsId",(req,res)=>{
    let postIdFromClient = Number(req.params.assignmentsId)
	let postData = mockUpAssignments.filter((item) => item.id === postIdFromClient)

    return res.json({
        message: "Complete Fetching assignments",
        data: {...postData},
      })
  });

  //body
//   {
//     "title": "Dota2",
//     "description": "Lorem",
//     "categories": ["game"]
//    }
//localhost:4000/assignments
  app.post('/assignments', function (req, res) {
    
    // const newAss = mockUpAssignments.push({
    //   id: mockUpAssignments[mockUpAssignments.length - 1].id + 1, // mockUpAssignments[mockUpAssignments.length - 1] คือเข้าไปที่ index ตัวสุดท้ายของ mockUpAssignments
    //   ...req.body
    // })

    const newAss = ({
        id: mockUpAssignments[mockUpAssignments.length - 1].id + 1, // mockUpAssignments[mockUpAssignments.length - 1] คือเข้าไปที่ index ตัวสุดท้ายของ mockUpAssignments
        ...req.body
      })
    mockUpAssignments.push(newAss);

    console.log(newAss)
    return res.json({
        message: "New assignment has been created successfully",
        data: newAss,
        // data: mockUpAssignments[mockUpAssignments.length-1],
        // afterPost: {...mockUpAssignments},
      })
  });

//localhost:4000/assignments/3
  app.delete('/assignments/:assignmentsId', function (req, res) {
	let postIdFromClient = Number(req.params.assignmentsId)

    const collectId = mockUpAssignments.map((item)=>item.id);
    //console.log(collectId)
    if(!(collectId.includes(postIdFromClient))){
        return res.status(401).json({
            message: "Cannot delete, No data available!"
           })
    }
    
	const newBlogPosts = mockUpAssignments.filter((item) => {
	  return item.id !== postIdFromClient;
  })

  mockUpAssignments = newBlogPosts;

	return res.json({
        message: `Assignment Id : ${postIdFromClient}  has been deleted successfully`,
        // afterDel:{...mockUpAssignments}
      })
});

//
app.put('/assignments/:assignmentsId', function (req, res) {
	let postIdFromClient = Number(req.params.assignmentsId)

    const collectId = mockUpAssignments.map((item)=>item.id);
    //console.log(collectId)
    if(!(collectId.includes(postIdFromClient))){
        return res.status(401).json({
            message: "Cannot update, No data available!"
           })
    }

    //หาก้อน obj ที่มีไอดีตรงกับที่รับเข้ามา โดยจะ return กลับออกมาเป็น เลข index ที่เก็บข้อมูลนั้น
	const blogPostIndex = mockUpAssignments.findIndex((item) => {
	  return item.id === postIdFromClient;
  })

  mockUpAssignments[blogPostIndex] = { id: postIdFromClient, ...req.body }
  console.log(mockUpAssignments[blogPostIndex])
	return res.json({
        message: `Assignment Id : ${postIdFromClient}  has been updated successfully`,
        data: mockUpAssignments[blogPostIndex],
        // afterPut: {...mockUpAssignments},
      })
});

app.listen(port, () => {
    console.log(`Server is running ai ${port}`);
  });



  /*
const asd = [
  {id:1,abc:2},
  {id:3,abc:4},
  {id:5,abc:6},
]

const yy = asd.push({id:7,abc:8});

console.log(asd)
console.log(yy)
//yy contains the new length of the array, which is 4 in this case.
  */
