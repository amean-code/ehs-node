import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import md5 from "md5";
import cors from "cors";
import sequelize from "./db/index.js";
import  {SuperAdmin,PublicUser} from "./db/index.js";

// ? Routers
import apiRouter from "./api/index.js";
import authRouter from "./core/auth.js";


// ! UPDATE WITH EHS SMTP
var transporter = nodemailer.createTransport({
	service: 'gmail',
	port: 465,
	host: "smtp.gmail.com",
	auth: {
		user: 'amean.academy@gmail.com',
		pass: 'felftssrwoftbali'
	}
});
// !

const app = express();

app.use(cors())

// Backend Configs
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

const PORT = process.env.PORT || 5001;

// ? Test Projess
app.get("/", (req,res) => {
    res.status(200).send({
        success: true,
        message: "EHS BACKEND WORKING..."
    })
})

app.get("/amean", (req,res) => {
    res.status(200).send({
        success: true,
        message: "AMEAN WAS HERE..."
    })
})

app.use("/api",apiRouter);
app.use("/auth", authRouter);

// * ERROR HANDLING
// app.use((err, req, res, next) => {
// 	const status = err.status || 500;
// 	const message = err.message || "EHS BACKEND SERVER HATASI !!"
// 	console.error(`status: ${status} - ERROR: `,err);
// 	return res.status(500).json({
// 		code: status,
// 		msg: message,
// 	});
// });

// // CONNECT DATABASE
// sequelize
// 	.sync({ force: process.env.NODE_ENV != "production" && false }) // ! BU SATIR INCELENMELI
// 	.then(async () => {
// 		SuperAdmin.findOrCreate({
// 			where: {id:0},
// 			defaults: {id: 0,
// 				name: "AMEAN",
// 				surname: "DANISMANLIK",
// 				email: "amean.hesaplar@gmail.com",
// 				password: md5("admin")},
// 		},)

// 		PublicUser.findOrCreate({
// 			where: {id:0},
// 			defaults: {id: 0,
// 				name: "Demo",
// 				surname: "User",
// 				email: "demo@gmail.com",
// 				password: md5("demo"),
// 				verified: false,
// 			verify_code: "111111",
// 		accepted: true},
// 		},)
// 		app.listen(PORT, () => {
//             console.log(`PORT ${PORT} dinleniyor...`);
//         })
// 	});

app.listen(PORT, () => {
	console.log(`PORT ${PORT} dinleniyor...`);
})

export { jwt , md5, transporter }




