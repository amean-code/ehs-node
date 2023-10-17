import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2Hobby, Hobby, MenteeForm } from "../db/index.js";

// Router yapısı
const HobbyApiRouter = Router();

HobbyApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "hobby-api-working",
		}
	)
});

HobbyApiRouter.post("/add", authenticateToken, async(req, res) => {

	try {
		if (!req.body.name) {
			return res.json({
				success: false,
				error: true,
				message: "name_required",
				data: []
			})
		}
		if (!req.body.description) {
			return res.json({
				success: false,
				error: true,
				message: "description_required",
				data: []
			})
		}
		if (!req.body.isProfiessional) {
			return res.json({
				success: false,
				error: true,
				message: "isProfiessional_required",
				data: []
			})
		}

		Hobby.findOrCreate({
			where: {
				name: req.body.name
			},
			defaults: {
				name: req.body.name,
				description: req.body.description,
				isProfiessional: req.body.isProfiessional
			}
		}).then(async ([hobby, created]) => {

			if (created) {

				var newCV2Hobby = await CV2Hobby.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2Hobby.setDataValue("hobby_id",hobby.getDataValue("id"));
				newCV2Hobby.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2Hobby.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...hobby.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "name_already_used",
					data: hobby.dataValues
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
});

HobbyApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
	try {

		let hobby = await Hobby.findOne({
			where:{
				id: req.params.id
			}
		});

		if(hobby == null) {
			return res.json({
				success: false,
				error: true,
				message: "hobby_not_found",
				data: []
			})
		} else {
			hobby.update({
				name: req.body.name,
				description: req.body.description,
				isProfiessional: req.body.isProfiessional
			})
	
			hobby.save();
	
			return res.send({
				success: true,
				error: false,
				data: hobby.dataValues
			});
		}

		
    } catch (error) {

        //console.log("ERROR: ",error)

        return res.send({
            success: false,
            error: true,
            err: error
        })
    }
});

HobbyApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
	try {
		let hobby = await Hobby.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Hobby = await CV2Hobby.findOne({
			where:{
				hobby_id: req.params.id
			}
		});

		if(hobby == null) {
			return res.json({
				success: false,
				error: true,
				message: "hobby_not_found",
				data: []
			})
		} else {
			hobby.destroy();
			cv2Hobby.destroy();

			return res.send({
				success:true,
				error: false,
				message: "hobby_deleted",
			})
		}
	} catch (error) {

        //console.log("ERROR: ",error)

        return res.send({
            success: false,
            error: true,
            err: error
        })
		
	}
});

export default HobbyApiRouter;




