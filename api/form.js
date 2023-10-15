import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV, MenteeForm } from "../db/index.js";

// Router yapısı
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "form-api-working",
		}
	)
});

apiRouter.post("/add",authenticateToken, async (req, res) => {

	MenteeForm.findOrCreate({
		where: {
			mentee_id: req.user.id
		},
		defaults: {
			mentee_id: req.user.id
		}
	}).then(async ([form,created]) => {
		if(created){
			var newCV = await CV.create()

			form.setDataValue("cv_id",newCV.getDataValue("id"));

			await form.save();
			await newCV.save();

			return res.json({
				success: true,
				error: false,
				message: "Form Oluşturuldu",
				data: {
					...form.dataValues
				}
			})

		}else{
			return res.json({
				success: false,
				error: true,
				message: "form_already_created",
				data: {
					...form.dataValues
				}
			})
		}
	})
	
});



export default apiRouter;




