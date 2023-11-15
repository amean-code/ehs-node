import { Router } from "express";
import * as Db from "../db/index.js";
import { md5, transporter, jwt} from "../index.js";

// Router yapısı
const authRouter = Router();

function authenticateToken (req, res, next){
	
	const token = req.headers.ehs_token;
	if(token){
		if(token==null){
			return res.sendStatus(401)
		}

		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if(err){
				return res.sendStatus(403)	
			}
			req.user = user;
			next();
		})
	}else{
		return res.json({
			success:false,
			error: false,
			message: "Giriş Yapılmalı",
			data: token
		})
	}
}


authRouter.post("/register", (req, res) => {
	try {
		if (!req.body.name) {
			return res.json({
				success: false,
				error: true,
				message: "name_required",
				data: []
			})
		}
		if (!req.body.surname) {
			return res.json({
				success: false,
				error: true,
				message: "surname_required",
				data: []
			})
		}
		if (!req.body.email) {
			return res.json({
				success: false,
				error: true,
				message: "email_required",
				data: []
			})
		}
		if (!req.body.password) {
			return res.json({
				success: false,
				error: true,
				message: "password_required",
				data: []
			})
		} else {
			if (req.body.password.length < 6) {
				return res.json({
					success: false,
					error: true,
					message: "min_pass_length_6",
					data: []
				})
			}
		}
		if (!req.body.phone) {
			return res.json({
				success: false,
				error: true,
				message: "phone_required",
				data: []
			})
		}

		let verify_code = generate_verify_code();

		Db.Mentee.findOrCreate({
			where: {
				email: req.body.email,
			},
			defaults: {
				verified: false,
				name: req.body.name,
				surname: req.body.surname,
				email: req.body.email,
				phone: req.body.phone,
				linkedin: req.body.linkedin,
				password: md5(req.body.password),
				verify_code: verify_code,
				accepted: false
			}
		}).then(([user, created]) => {

			if (created) {
				transporter.sendMail({
					from: '"Energy Hack Space" <amean.academy@gmail.com>', //
					to: req.body.email,
					subject: "Energy Hack Space - Doğrulama Kodun",
					text: verify_code,
					html: `
						<h1 style="user-select:none;color:#2ca2f1;font-weight: bolder; font-size: 50px;text-align:center; padding: 10px 50px;margin:0; margin-top: 20px; margin-bottom: 10px;">
							<span style="user-select:none;color:black;">EHS</span> Platformu
						</h1>
						<p style="user-select:none;text-align:center; color:#808080; font-weight:bold; padding: 10px 10%; font-size: 15px;margin:0; margin-top: 20px; margin-bottom: 10px;">
							Aramıza hoşgeldin. Çok güzel bir maceraya beraber atılıyoruz. Ama bu maceraya devam edebilmemiz için aşağıdaki doğrulama kodu ile kendini doğrulamak zorundasın :)	
						</p>
						<h2 style="width: 100%; text-align:center;color: #2cc5a2;font-size: 35px;margin:0; margin-top: 20px; margin-bottom: 10px;">`+ verify_code + `</h2>
					`,
				});

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...user
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "email_already_used",
					data: {
						...user
					}
				})
			}
		})
	} catch (error) {
		return res.json({
			success: false,
			error: true,
			err: error,
			data: [],
			message: "something_went_wrong"
		})
	}
})



authRouter.post("/verify-code", async (req, res) => {
	try {
		if (!req.body.email) {
			return res.json({
				success: false,
				error: true,
				message: "Email Zorunlu",
				data: []
			})
		}
		if (!req.body.verify_code) {
			return res.json({
				success: false,
				error: true,
				message: "Doğrulama Kodu Zorunlu",
				data: []
			})
		}

		let Mentee = await Db.Mentee.findOne({
			where: {
				email: req.body.email
			}
		});

		if (Mentee) {
			if (Mentee.getDataValue("verify_code") === req.body.verify_code) {
				Mentee?.setDataValue("verified", true);

				const accessToken = jwt.sign(Mentee.dataValues, process.env.ACCESS_TOKEN_SECRET);
				
				Db.MenteeForm.findOrCreate({
					where: {
						mentee_id: Mentee.getDataValue("id")
					},
					defaults: {
						mentee_id: Mentee.getDataValue("id")
					}
				}).then(async ([form,created]) => {
					if(created){
						var newCV = await Db.CV.create()
			
						form.setDataValue("cv_id",newCV.getDataValue("id"));
			
						await form.save();
						await newCV.save();
			
					}else{
					}

					Mentee?.setDataValue("form_id", form.getDataValue("id"));

					Mentee.save();
				})

				await Mentee.save();

				return res.json({
					success: true,
					error: false,
					message: "success",
					data: Mentee.dataValues,
					accessToken: accessToken
				})
			} else {
				return res.json({
					success: false,
					error: false,
					message: "verify_code_wrong",
					data: []
				})
			}
		} else {
			return res.json({
				success: false,
				error: false,
				message: "email_not_found",
				data: []
			})
		}

	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: false,
			err: await error,
			message: "Bir hata oluştu lütfen daha sonra tekrar deneyin.",
			data: []
		})
	}
})

authRouter.post("/login", async (req, res) => {
	try {
		if(!req.body.email){
			return res.json({
				success: false,
				error: false,
				message: "emal_required",
				data:[]
			})
		}
		if(!req.body.password){
			return res.json({
				success: false,
				error: false,
				message: "password_required",
				data:[]
			})
		}

		let Mentee = await Db.Mentee.findOne({
			where:{
				email: req.body.email
			}
		})

		if(Mentee){
			if(Mentee?.getDataValue("password")=== md5(req.body.password)){

				const accessToken = jwt.sign(Mentee.dataValues, process.env.ACCESS_TOKEN_SECRET);				
				return res.json({
					success: true,
					error: false,
					message: "Giriş Yapıldı",
					data: Mentee,
					accessToken: accessToken
				})
			}else{
				return res.json({
					success: false,
					error: false,
					message: "auth_failed",
					data: []
				})
			}
				
		}else{
			return res.json({
				success: false,
				error: false,
				message: "user_not_found",
				data: []
			})
		}
	} catch (error) {
		return res.json({
			success: false,
			error: true,
			err: await error,
			message: "something_went_wrong",
			data: []
		})
	}
})


authRouter.post("/login-admin", async (req, res) => {
	try {
		if(!req.body.email){
			return res.json({
				success: false,
				error: false,
				message: "emal_required",
				data:[]
			})
		}
		if(!req.body.password){
			return res.json({
				success: false,
				error: false,
				message: "password_required",
				data:[]
			})
		}

		let Admin = await Db.Admin.findOne({
			where:{
				email: req.body.email
			}
		})

		if(Admin){
			if(Admin?.getDataValue("password")=== md5(req.body.password)){

				const accessToken = jwt.sign(Admin.dataValues, process.env.ACCESS_TOKEN_SECRET);				
				return res.json({
					success: true,
					error: false,
					message: "Giriş Yapıldı",
					data: Admin,
					accessToken: accessToken
				})
			}else{
				return res.json({
					success: false,
					error: false,
					message: "auth_failed",
					data: []
				})
			}
				
		}else{
			return res.json({
				success: false,
				error: false,
				message: "user_not_found",
				data: []
			})
		}
	} catch (error) {
		return res.json({
			success: false,
			error: true,
			err: await error,
			message: "something_went_wrong",
			data: []
		})
	}
})

function generate_verify_code() {
	let chars = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9"
	]

	return chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
}

export default authRouter;

export {authenticateToken};