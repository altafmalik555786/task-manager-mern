const Task = require("../../model/task");
const { MSG_CREATED, MSG_DELETED, CON_IDENTITY, MSG_UPDATED } = require("../../utils/const");
const { checkValidation, sendSuccessResponse, getUserFromToken, handleCloudinaryFiles, getPaginatedData, verifyToken, findById, sendFailureResponse, destoryCloudinaryFiles, handlePutRequest } = require("../../utils/helper/api");
const { handleCatchedError } = require("../../utils/helper/common");

const postCreateTasks = async (req, res) => {
    try {
        const user = await getUserFromToken(req, res)
        checkValidation({ req, res, model: Task, requiredFields: ["title"] });
        const post = new Task({ ...req.body, user: user._id });
        const data = await post.save();
        return sendSuccessResponse({ res, data, message: MSG_CREATED('Tasks') });
    } catch (error) {
        handleCatchedError({ res, error: error, at: "postCreateTasks" })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const searchFields = ['title'];
        await getPaginatedData({ req, res, model: Task, populate: ["user", "-password -email -contact"], searchFields })
    } catch (error) {
        handleCatchedError({ res, error, at: "getAllTasks" })
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.query;
        await Task.deleteOne({ _id: id });
        sendSuccessResponse({
            res,
            message: MSG_DELETED('Task'),
            status: 200,
        })
    } catch (error) {
        handleCatchedError({ res, error: error, at: "deleteTask" })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.body.id || req.query.id;
        await handlePutRequest({
            req,
            res,
            model: Task,
            entity: "Task",
            requiredFields: ["title", "status", "priority"],
            bodyData: { ...req.body },
        });
        const options = { new: true };
        const data = await Task.findByIdAndUpdate(id, req.body, options);
        sendSuccessResponse({ res, data, message: MSG_UPDATED("Task") });
    } catch (error) {
        handleCatchedError({ res, error, at: "updateTask" });
    }
};

const patchTask = async (req, res) => {
    try {
        const id = req.body.id || req.query.id;
        await handlePutRequest({
            req,
            res,
            model: Task,
            entity: "Task",
            bodyData: { ...req.body }, 
        });

        const options = { new: true };
        const data = await Task.findByIdAndUpdate(id, req.body, options);

        sendSuccessResponse({ res, data, message: MSG_UPDATED("Task") });
    } catch (error) {
        handleCatchedError({ res, error, at: "patchTask" });
    }
};


module.exports = {
    postCreateTasks,
    getAllTasks,
    deleteTask,
    updateTask,
    patchTask
}
