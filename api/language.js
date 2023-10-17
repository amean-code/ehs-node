import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV2Language, Language, MenteeForm } from "../db/index.js";

// Router yapısı
const LanguageApiRouter = Router();

LanguageApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "language-api-working",
		}
	)
});

LanguageApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.language) {
			return res.json({
				success: false,
				error: true,
				message: "language_required",
				data: []
			})
		}
		if (!req.body.flag) {
			return res.json({
				success: false,
				error: true,
				message: "flag_required",
				data: []
			})
		}
		if (!req.body.point) {
			return res.json({
				success: false,
				error: true,
				message: "point_required",
				data: []
			})
		}

		Language.findOrCreate({
			where: {
				language: req.body.language
			},
			defaults: {
				language: req.body.language,
				flag: req.body.flag
			}
		}).then(async ([language, created]) => {

			if (created) {

				var newCV2Language = await CV2Language.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2Language.setDataValue("language_id",language.getDataValue("id"));
				newCV2Language.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));
				newCV2Language.setDataValue("point",req.body.point);

				await newCV2Language.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...language.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "language_already_used",
					data: language.dataValues
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

LanguageApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
	try {

		let language = await Language.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Language = await CV2Language.findOne({
			where:{
				language_id: req.params.id
			}
		});

		if(language == null) {
			return res.json({
				success: false,
				error: true,
				message: "language_not_found",
				data: []
			})
		} else {
			language.update({
				language: req.body.language,
				flag: req.body.flag
			})
			language.save();
			cv2Language.update({
				point: req.body.point
			})
			cv2Language.save();

	
			return res.send({
				success: true,
				error: false,
				data: language.dataValues
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

LanguageApiRouter.delete("/delete/:id", async(req, res) => {
    try {
		let language = await Language.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Language = await CV2Language.findOne({
			where:{
				language_id: req.params.id
			}
		});

		if(language == null) {
			return res.json({
				success: false,
				error: true,
				message: "language_not_found",
				data: []
			})
		} else {
			language.destroy();
			cv2Language.destroy();

			return res.send({
				success:true,
				error: false,
				message: "language_deleted",
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

export default LanguageApiRouter;




