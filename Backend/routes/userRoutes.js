const express = require('express')
const {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser} = require('../controllers/userController.js')
const router = express.Router();
const protectRoute = require('../middlewares/protectRoute.js')
const cookieParser = require('cookie-parser');
const app = express();


router.get('/', (req, res) => {
    console.log('GET /api/users hit');
    res.send('User route');
  });


router.post("/signup", signupUser);
router.post("/login", loginUser)
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);

module.exports = router