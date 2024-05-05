import express from "express"
// import { updateUser } from "../controllers/userController.js"
// import { deleteUser } from "../controllers/userController.js";
// import { getAllUsers } from "../controllers/userController.js";
import { test } from "../controllers/user.controller.js";
import { updateUser, deleteUser ,getUsers, getUser} from "../controllers/user.controller.js";
import { signOut } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.put('/update/:userId',verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signOut', signOut)
router.get("/test",test);

router.get('/getUsers', verifyToken, getUsers)

//for comment
router.get('/:userId', getUser)

// router.get('/getUsers', getAllUsers)
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);



export default router;