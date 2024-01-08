import express from "express";
import { assignments } from "./data/assignments.js";
import { comments } from "./data/comments.js";
const dataAssignments = [...assignments];
const dataComments = [...comments];
const app = express();
const port = 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/assignments", (req, res) => {
  const limit = Number(req.query.limit) || 10;
  if (limit > 10) {
    return res.status(401).json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }
  const allAssignments = dataAssignments.slice(0, limit);
  return res.json({
    message: "Complete Fetching assignments",
    data: [...allAssignments],
  });
});

app.get("/assignments/:assignmentsId", (req, res) => {
  let assignmentsId = Number(req.params.assignmentsId);
  let assignmentData = dataAssignments.filter(
    (item) => item.id === assignmentsId
  );
  if (assignmentData.length === 0) {
    return res.status(404).json({ error: "Assignment not found" });
  }
  return res.json({
    data: assignmentData[0],
  });
});

app.post("/assignments", (req, res) => {
  if (!req.body.title || !req.body.categories || !req.body.description)
    return res.status(401).json({
      message: "Invalid request",
    });
  dataAssignments.push({
    id: dataAssignments[dataAssignments.length - 1].id + 1,
    ...req.body,
  });
  return res.json({
    message: "New assignment has been created successfully",
    data: dataAssignments,
  });
});

app.delete("/assignments/:assignmentsId", (req, res) => {
  const dataDelete = Number(req.params.assignmentsId);
  const index = dataAssignments.findIndex((item) => item.id === dataDelete);
  if (index === -1) {
    return res.status(404).json({
      message: "Cannot delete, No data available!",
    });
  }
  dataAssignments.splice(index, 1);
  return res.json({
    message: `Assignment Id : ${dataDelete}  has been deleted successfully`,
  });
});

app.put("/assignments/:assignmentsId", (req, res) => {
  let editDataId = Number(req.params.assignmentsId);
  const assignmentsIndex = dataAssignments.findIndex(
    (item) => item.id === editDataId
  );
  if (assignmentsIndex === -1) {
    return res.status(404).json({
      message: "Cannot update, No data available!",
    });
  }
  dataAssignments[assignmentsIndex] = { id: editDataId, ...req.body };
  return res.json({
    message: `Assignment Id : ${editDataId}  has been updated successfully`,
    data: dataAssignments,
  });
});

app.get("/assignments/:assignmentsId/comments", (req, res) => {
  let addAssignmentsId = Number(req.params.assignmentsId);
  let getComment = dataComments.filter(
    (item) => item.assignmentId === addAssignmentsId
  );
  return res.json({
    message: "Complete fetching comments",
    data: getComment,
    
  });
});

app.post("/assignments/:assignmentsId/comments", (req, res) => {
  let assignmentId = Number(req.params.assignmentsId);
  dataComments.push({
    id: dataComments[dataComments.length - 1].id + 1,
    assignmentId,
    ...req.body,
  });
  return res.json({
    message: "New comment has been created successfully",
    data: dataComments,
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
