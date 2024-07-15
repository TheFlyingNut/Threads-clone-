const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./db/connectDB.js');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');
const app = express();
const postRoutes = require('./routes/postRoutes.js')
const PORT = process.env.PORT || 5000

dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.get('/', (req, res) => res.send('API Running'));
app.listen(5000,() => console.log(`Server started at port http://localhost:${PORT}`));


