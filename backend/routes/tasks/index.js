const { endPoints } = require("../const/index");
const Task = require("../../model/task");

const { router } = require("../../utils/instances");
const {
    postCreateTasks,
    getAllTasks,
    deleteTask,
    updateTask,
    patchTask
} = require("../../api/tasks/");
const { authMiddleware } = require("../../middlewares/auth");
const {
    accessPermissionMiddleware,
} = require("../../middlewares/access-permission");
const { userRoles } = require("../../utils/json");
const { ROUTE_PARAM_SLASH_ID } = require("../../utils/const");

router.post(`${endPoints?.tasks}`, authMiddleware, postCreateTasks);
router.get(`${endPoints?.tasks}`, authMiddleware, getAllTasks);
router.put(`${endPoints?.tasks}`, authMiddleware, updateTask);
router.patch(`${endPoints?.tasks}`, authMiddleware, patchTask);

router.delete(
    `${endPoints?.tasks}`,
    accessPermissionMiddleware({
        model: Task,
        authorizedUser: [userRoles.admin, userRoles.user],
        entity: "Task",
    }),
    authMiddleware,
    deleteTask
);

module.exports = { tasksRouter: router };
