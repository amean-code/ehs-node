import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2ProjectInformation, MenteeForm, ProjectInformation } from "../db/index.js";

// Router yapısı
const ProjectInformationApiRouter = Router();

ProjectInformationApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "projeBilgisi-api-working",
		}
	)
});

ProjectInformationApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.project) {
			return res.json({
				success: false,
				error: true,
				message: "project_required",
				data: []
			})
		}
		if (!req.body.city) {
			return res.json({
				success: false,
				error: true,
				message: "city_required",
				data: []
			})
		}
		if (!req.body.supporting_institution) {
			return res.json({
				success: false,
				error: true,
				message: "supporting_institution_required",
				data: []
			})
		}
		if (!req.body.funding_institution) {
			return res.json({
				success: false,
				error: true,
				message: "funding_institution_required",
				data: []
			})
		}
		if (!req.body.budget) {
			return res.json({
				success: false,
				error: true,
				message: "budget_required",
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
		if (!req.body.awards) {
			return res.json({
				success: false,
				error: true,
				message: "awards_required",
				data: []
			})
		}

		ProjectInformation.findOrCreate({
			where: {
				project: req.body.project
			},
			defaults: {
				project: req.body.project,
				city: req.body.city,
				supporting_institution: req.body.supporting_institution,
				funding_institution: req.body.funding_institution,
				budget: req.body.budget,
				task_1: req.body.task_1,
				task_2: req.body.task_2,
				task_3: req.body.task_3,
				technologies: req.body.technologies,
				awards: req.body.awards
			}
		}).then(async ([project_information, created]) => {

			if (created) {

				var newCV2ProjectInformation = await CV2ProjectInformation.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2ProjectInformation.setDataValue("project_information_id",project_information.getDataValue("id"));
				newCV2ProjectInformation.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2ProjectInformation.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...project_information.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "project_already_used",
					data: project_information.dataValues
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

ProjectInformationApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let project_information = await ProjectInformation.findOne({
			where:{
				id: req.params.id
			}
		});

		if(project_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "project_information_not_found",
				data: []
			})
		} else {
			project_information.update({
				project: req.body.project,
				city: req.body.city,
				supporting_institution: req.body.supporting_institution,
				funding_institution: req.body.funding_institution,
				budget: req.body.budget,
				task_1: req.body.task_1,
				task_2: req.body.task_2,
				task_3: req.body.task_3,
				technologies: req.body.technologies,
				awards: req.body.awards
			})
	
			project_information.save();
	
			return res.send({
				success: true,
				error: false,
				data: project_information.dataValues
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

ProjectInformationApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let project_information = await ProjectInformation.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2ProjectInformation = await CV2ProjectInformation.findOne({
			where:{
				project_information_id: req.params.id
			}
		});

		if(project_information == null) {
			return res.json({
				success: false,
				error: true,
				message: "project_information_not_found",
				data: []
			})
		} else {
			project_information.destroy();
			cv2ProjectInformation.destroy();

			return res.send({
				success:true,
				error: false,
				message: "project_information_deleted",
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

export default ProjectInformationApiRouter;




