import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CourseInformation, CV2CourseInformation, MenteeForm } from "../db/index.js";

// Router yapısı
const CourseInformationApiRouter = Router();

CourseInformationApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "course_information-api-working",
		}
	)
});

CourseInformationApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.name) {
			return res.json({
				success: false,
				error: true,
				message: "name_required",
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
		if (!req.body.finish_date) {
			return res.json({
				success: false,
				error: true,
				message: "finish_date_required",
				data: []
			})
		}
		if (!req.body.skill_1) {
			return res.json({
				success: false,
				error: true,
				message: "skill_1_required",
				data: []
			})
		}
		if (!req.body.skill_2) {
			return res.json({
				success: false,
				error: true,
				message: "skill_2_required",
				data: []
			})
		}
		if (!req.body.skill_3) {
			return res.json({
				success: false,
				error: true,
				message: "skill_3_required",
				data: []
			})
		}

		CourseInformation.findOrCreate({
			where: {
				name: req.body.name
			},
			defaults: {
				name: req.body.name,
				institution: req.body.institution,
				finish_date: req.body.finish_date,
				skill_1: req.body.skill_1,
				skill_2: req.body.skill_2,
				skill_3: req.body.skill_3,
			}
		}).then(async ([course_information, created]) => {

			if (created) {

				var newCV2CourseInformation = await CV2CourseInformation.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2CourseInformation.setDataValue("course_information_id",course_information.getDataValue("id"));
				newCV2CourseInformation.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2CourseInformation.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...course_information.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "name_already_used",
					data: course_information.dataValues
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

CourseInformationApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let course_information = await CourseInformation.findOne({
			where:{
				id: req.params.id
			}
		});

		if(course_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "course_information_not_found",
				data: []
			})
		} else {
			course_information.update({
				name: req.body.name,
				institution: req.body.institution,
				finish_date: req.body.finish_date,
				skill_1: req.body.skill_1,
				skill_2: req.body.skill_2,
				skill_3: req.body.skill_3,
			})
	
			course_information.save();
	
			return res.send({
				success: true,
				error: false,
				data: course_information.dataValues
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

CourseInformationApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let course_information = await CourseInformation.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2CourseInformation = await CV2CourseInformation.findOne({
			where:{
				course_information_id: req.params.id
			}
		});

		if(course_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "course_information_not_found",
				data: []
			})
		} else {
			course_information.destroy();
			cv2CourseInformation.destroy();

			return res.send({
				success:true,
				error: false,
				message: "course_information_deleted",
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

export default CourseInformationApiRouter;




