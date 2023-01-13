import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js"
import {
    getUsers,
    Register,
    getUserById,
    Login,
    Logout
} from "../controllers/Users.js"
import {
    getAllRequests,
    createRequest,
    getRequestById,
    updateRequest,
    getRequestByEmployeeId,
    deleteRequest
} from "../controllers/Requests.js"
import {
    getAllAbsences,
    createAbsence,
    getAbsenceById,
    updateAbsence,
    deleteAbsence
} from "../controllers/Absence.js";


const router = express.Router();


router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.get('/logout', Logout);
router.get('/getUser:id', getUserById);
router.get('/requests', getAllRequests);
router.get('/getRequest:id', getRequestById);
router.get('/getEmployeeReq:id', getRequestByEmployeeId);
router.post('/createRequest', createRequest);
router.patch('/updateRequest:id', updateRequest);
router.delete('/deleteRequest:id', deleteRequest);
router.get('/absences', getAllAbsences);
router.get('/getAbsence:id', getAbsenceById);
router.post('/createAbsence', createAbsence);
router.patch('/updateAbsence:id', updateAbsence);
router.delete('/deleteAbsence:id', deleteAbsence);

export default router;