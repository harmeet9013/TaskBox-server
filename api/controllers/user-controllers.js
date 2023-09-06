import createHttpError from "http-errors";
import { todoList } from "../../index.js";

export const userAuth = async (req, res, next) => {
    const { username } = req.body;

    // if the username has some tasks already in the object
    if (todoList[username]) {
        return res.status(200).json({ username });
    }

    // if not, create a new array for the username
    if (username.length > 8 && username.length < 16) {
        // initialize the nested username array as empty
        todoList[username] = [];

        // return a 201 response (created)
        return res.status(201).json({ username });
    } else {
        // throw server error if username length is not valid
        return next(
            createHttpError(
                406,
                "The username should be less than 24 and greater than 8 characters!"
            )
        );
    }
};
