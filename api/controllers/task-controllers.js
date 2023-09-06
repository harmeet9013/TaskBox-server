import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";
import { todoList } from "../../index.js";

// global server error
const serverError = createHttpError(500, "Server error, Try again later");

// CREATE
export const newTask = async (req, res, next) => {
    const { task, username } = req.body;

    try {
        // add task in the array with respect to their username
        todoList[username].push({ id: uuid(), task, completed: false });

        // send back the response of 201 (created)
        return res.status(201).json({ message: "Task created!" });
    } catch (error) {
        // throw error if cannot add to the array
        return next(serverError);
    }
};

// READ
export const alltasks = async (req, res, next) => {
    const { username } = req.body;

    try {
        // send back repsonse of the user tasks
        return res.status(201).json(todoList[username] || []);
    } catch (error) {
        // throw error if cannot fetch from the array
        return next(serverError);
    }
};

// UPDATE
export const taskDone = async (req, res, next) => {
    const { taskID, username, isDone } = req.body;

    try {
        // if the username exists in the object
        if (todoList[username]) {
            // find the task index
            const taskIndex = todoList[username].findIndex(
                (task) => task.id === taskID
            );

            // -1 means task does not exist, so we check for it
            if (taskIndex !== -1) {
                // mark completed to what the request had
                todoList[username][taskIndex].completed = isDone;

                // send back 200 response
                return res
                    .status(200)
                    .json({ message: "Operation successful!" });
            } else {
                // throw task not found error
                return res.status(404).json({ message: "Task not found!" });
            }
        }
    } catch (error) {
        // throw server error
        return next(serverError);
    }
};

// DELETE
export const deletetask = async (req, res, next) => {
    const { taskID, username } = req.body;

    try {
        if (todoList[username]) {
            // find the index of the task
            const taskIndex = todoList[username].findIndex(
                (task) => task.id === taskID
            );

            // use the splice function to remove the element from the array
            todoList[username].splice(taskIndex, 1);

            // return a 200 response
            return res.status(200).json({ message: "Task deleted!" });
        }
    } catch (error) {
        return next(serverError);
    }
};
