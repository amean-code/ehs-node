import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2ExperienceInformation, ExperienceInformation, MenteeForm } from "../db/index.js";

// Router yapısı
const ExperienceInformationApiRouter = Router();

ExperienceInformationApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "experience_information-api-working",
		}
	)
});

ExperienceInformationApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.position) {
			return res.json({
				success: false,
				error: true,
				message: "position_required",
				data: []
			})
		}
		if (!req.body.institution) {
			return res.json({
				success: false,
				error: true,
				message: "institution_required",
				data: []
			})
		}
		if (!req.body.start_date) {
			return res.json({
				success: false,
				error: true,
				message: "start_date_required",
				data: []
			})
		}
		if (!req.body.finish_date) {
			return res.json({
				success: false,
				error: true,
				message: "finish_date_required",
				data: []
			})
		}
		if (!req.body.task_1) {
			return res.json({
				success: false,
				error: true,
				message: "task_1_required",
				data: []
			})
		}
		if (!req.body.task_2) {
			return res.json({
				success: false,
				error: true,
				message: "task_2_required",
				data: []
			})
		}
		if (!req.body.task_3) {
			return res.json({
				success: false,
				error: true,
				message: "task_3_required",
				data: []
			})
		}
		if (!req.body.technologies) {
			return res.json({
				success: false,
				error: true,
				message: "technologies_required",
				data: []
			})
		}

		ExperienceInformation.findOrCreate({
			where: {
				institution: req.body.institution
			},
			defaults: {
				position: req.body.position,
				institution: req.body.institution,
				start_date: req.body.start_date,
				finish_date: req.body.finish_date,
				task_1: req.body.task_1,
				task_2: req.body.task_2,
				task_3: req.body.task_3,
				technologies: req.body.technologies
			}
		}).then(async ([experience_information, created]) => {

			if (created) {

				var newCV2ExperienceInformation = await CV2ExperienceInformation.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2ExperienceInformation.setDataValue("experience_information_id",experience_information.getDataValue("id"));
				newCV2ExperienceInformation.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2ExperienceInformation.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...experience_information.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "institution_already_used",
					data: experience_information.dataValues
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

ExperienceInformationApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let experience_information = await ExperienceInformation.findOne({
			where:{
				id: req.params.id
			}
		});

		if(experience_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "experience_information_not_found",
				data: []
			})
		} else {
			experience_information.update({
				position: req.body.position,
				institution: req.body.institution,
				start_date: req.body.start_date,
				finish_date: req.body.finish_date,
				task_1: req.body.task_1,
				task_2: req.body.task_2,
				task_3: req.body.task_3,
				technologies: req.body.technologies
			})
	
			experience_information.save();
	
			return res.send({
				success: true,
				error: false,
				data: experience_information.dataValues
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

ExperienceInformationApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let experience_information = await ExperienceInformation.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2ExperienceInformation = await CV2ExperienceInformation.findOne({
			where:{
				experience_information_id: req.params.id
			}
		});

		if(experience_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "experience_information_not_found",
				data: []
			})
		} else {
			experience_information.destroy();
			cv2ExperienceInformation.destroy();

			return res.send({
				success:true,
				error: false,
				message: "experience_information_deleted",
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

export default ExperienceInformationApiRouter;




