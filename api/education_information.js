import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2EducationInformation, EducationInformation, MenteeForm } from "../db/index.js";

// Router yapısı
const EducationInformationApiRouter = Router();

EducationInformationApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "education_information-api-working",
		}
	)
});

EducationInformationApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.university) {
			return res.json({
				success: false,
				error: true,
				message: "university_required",
				data: []
			})
		}
		if (!req.body.department) {
			return res.json({
				success: false,
				error: true,
				message: "department_required",
				data: []
			})
		}
		if (!req.body.rate) {
			return res.json({
				success: false,
				error: true,
				message: "rate_required",
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
		if (!req.body.interesting_lesson) {
			return res.json({
				success: false,
				error: true,
				message: "interesting_lesson_required",
				data: []
			})
		}
		if (!req.body.project_research_topics) {
			return res.json({
				success: false,
				error: true,
				message: "project_research_topics_required",
				data: []
			})
		}
		if (!req.body.active_clubs) {
			return res.json({
				success: false,
				error: true,
				message: "active_clubs_required",
				data: []
			})
		}

		EducationInformation.findOrCreate({
			where: {
				university: req.body.university
			},
			defaults: {
				university: req.body.university,
				department: req.body.department,
				rate: req.body.rate,
				start_date: req.body.start_date,
				finish_date: req.body.finish_date,
				interesting_lesson: req.body.interesting_lesson,
				project_research_topics: req.body.project_research_topics,
				active_clubs: req.body.active_clubs
			}
		}).then(async ([education_information, created]) => {

			if (created) {

				var newCV2EducationInformation = await CV2EducationInformation.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2EducationInformation.setDataValue("education_information_id",education_information.getDataValue("id"));
				newCV2EducationInformation.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2EducationInformation.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...education_information.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "name_already_used",
					data: education_information.dataValues
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

EducationInformationApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let education_information = await EducationInformation.findOne({
			where:{
				id: req.params.id
			}
		});

		if(education_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "education_information_not_found",
				data: []
			})
		} else {
			education_information.update({
				university: req.body.university,
				department: req.body.department,
				rate: req.body.rate,
				start_date: req.body.start_date,
				finish_date: req.body.finish_date,
				interesting_lesson: req.body.interesting_lesson,
				project_research_topics: req.body.project_research_topics,
				active_clubs: req.body.active_clubs
			})
	
			education_information.save();
	
			return res.send({
				success: true,
				error: false,
				data: education_information.dataValues
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

EducationInformationApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let education_information = await EducationInformation.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2EducationInformation = await CV2EducationInformation.findOne({
			where:{
				education_information_id: req.params.id
			}
		});

		if(education_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "education_information_not_found",
				data: []
			})
		} else {
			education_information.destroy();
			cv2EducationInformation.destroy();

			return res.send({
				success:true,
				error: false,
				message: "education_information_deleted",
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

export default EducationInformationApiRouter;




