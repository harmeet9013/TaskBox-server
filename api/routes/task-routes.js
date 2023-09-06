import { Router } from "express";
import {
    alltasks,
    deletetask,
    newTask,
    taskDone,
} from "../controllers/task-controllers.js";

const taskRoutes = Router();

taskRoutes.post("/newtask", newTask); // create
taskRoutes.post("/alltasks", alltasks); // read
taskRoutes.post("/taskdone", taskDone); // update
taskRoutes.delete("/deletetask", deletetask); // delete

export default taskRoutes;
