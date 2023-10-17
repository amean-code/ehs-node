import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2Publish, MenteeForm, Publish } from "../db/index.js";

// Router yapısı
const PublishApiRouter = Router();

PublishApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "yayin-api-working",
		}
	)
});

PublishApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.name) {
			return res.json({
				success: false,
				error: true,
				message: "name_required",
				data: []
			})
		}
		if (!req.body.publishing_institution) {
			return res.json({
				success: false,
				error: true,
				message: "publishing_institution_required",
				data: []
			})
		}
		if (!req.body.publish_date) {
			return res.json({
				success: false,
				error: true,
				message: "publish_date_required",
				data: []
			})
		}
		if (!req.body.DOI) {
			return res.json({
				success: false,
				error: true,
				message: "DOI_required",
				data: []
			})
		}

		Publish.findOrCreate({
			where: {
				name: req.body.name
			},
			defaults: {
				name: req.body.name,
				publishing_institution: req.body.publishing_institution,
				publish_date: req.body.publish_date,
				DOI: req.body.DOI
			}
		}).then(async ([publish, created]) => {

			if (created) {

				var newCV2Publish = await CV2Publish.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2Publish.setDataValue("publish_id",publish.getDataValue("id"));
				newCV2Publish.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));

				await newCV2Publish.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...publish.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "name_already_used",
					data: publish.dataValues
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

PublishApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let publish = await Publish.findOne({
			where:{
				id: req.params.id
			}
		});

		if(publish == null) {
			return res.json({
				success: false,
				error: true,
				message: "publish_not_found",
				data: []
			})
		} else {
			publish.update({
				name: req.body.name,
				publishing_institution: req.body.publishing_institution,
				publish_date: req.body.publish_date,
				DOI: req.body.DOI
			})
	
			publish.save();
	
			return res.send({
				success: true,
				error: false,
				data: publish.dataValues
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

PublishApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let publish = await Publish.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Publish = await CV2Publish.findOne({
			where:{
				publish_id: req.params.id
			}
		});

		if(publish == null) {
			return res.json({
				success: false,
				error: true,
				message: "publish_not_found",
				data: []
			})
		} else {
			publish.destroy();
			cv2Publish.destroy();

			return res.send({
				success:true,
				error: false,
				message: "publish_deleted",
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

export default PublishApiRouter;




