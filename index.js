import "dotenv/config";
import cors from "cors";
import Express from "express";
import bodyParser from "body-parser";
import createHttpError from "http-errors";

import usersRoutes from "./api/routes/user-routes.js";
import taskRoutes from "./api/routes/task-routes.js";

// pick port from the env File. 5000 if it doesnt exist
const PORT = process.env.PORT || 5000;
// create a server using express
const server = Express();

// use bodyParser to parse every req data as json
server.use(bodyParser.json());
// open the server to all addresses
server.use(cors());

// route for user create or login
server.use("/api", usersRoutes);
// CRUD routes for tasks
server.use("/api", taskRoutes);

// default route for the client (404)
server.use((req, res, next) => {
    return next(createHttpError(404, "Route not found!"));
});

// middleware controller that handles the errors
server.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        message: err.message,
    });
});

// start server on the port
server.listen(PORT);

// object which will hold all the tasks
export const todoList = {};

// export the server for serverless function
export default server;
