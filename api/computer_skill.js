import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { ComputerSkill, CV2ComputerSkill, MenteeForm } from "../db/index.js";

// Router yapısı
const ComputerSkillApiRouter = Router();

ComputerSkillApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "computerSkill-api-working",
		}
	)
});

ComputerSkillApiRouter.post("/add", authenticateToken, async(req, res) => {

    try {
		if (!req.body.skill) {
			return res.json({
				success: false,
				error: true,
				message: "skill_required",
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

		ComputerSkill.findOrCreate({
			where: {
				skill: req.body.skill
			},
			defaults: {
				skill: req.body.skill
			}
		}).then(async ([computer_skill, created]) => {

			if (created) {

				var newCV2ComputerSkill = await CV2ComputerSkill.create()
				var menteeForm = await MenteeForm.findOne({
					where: {
						mentee_id: req.user.id
					}
				})

				newCV2ComputerSkill.setDataValue("computer_skill_id",computer_skill.getDataValue("id"));
				newCV2ComputerSkill.setDataValue("cv_id",menteeForm.getDataValue("cv_id"));
				newCV2ComputerSkill.setDataValue("point",req.body.point);

				await newCV2ComputerSkill.save();

				return res.json({
					success: true,
					error: false,
					message: "succesfull",
					data: {
						...computer_skill.dataValues
					}
				});
			} else {
				return res.json({
					success: false,
					error: false,
					message: "computer_skill_already_used",
					data: computer_skill.dataValues
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

ComputerSkillApiRouter.put("/update/:id", authenticateToken, async(req, res) => {
    try {

		let computer_skill = await ComputerSkill.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Computer_skill = await CV2ComputerSkill.findOne({
			where:{
				computer_skill_id: req.params.id
			}
		});

		if(computer_skill == null) {
			return res.json({
				success: false,
				error: true,
				message: "computer_skill_not_found",
				data: []
			})
		} else {
			computer_skill.update({
				skill: req.body.skill
			})
			computer_skill.save();
			cv2Computer_skill.update({
				point: req.body.point
			})
			cv2Computer_skill.save();

	
			return res.send({
				success: true,
				error: false,
				data: computer_skill.dataValues
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

ComputerSkillApiRouter.delete("/delete/:id", authenticateToken, async(req, res) => {
    try {
		let computer_skill = await ComputerSkill.findOne({
			where:{
				id: req.params.id
			}
		});
		let cv2Computer_skill = await CV2ComputerSkill.findOne({
			where:{
				computer_skill_id: req.params.id
			}
		});

		if(computer_skill == null) {
			return res.json({
				success: false,
				error: true,
				message: "computer_skill_not_found",
				data: []
			})
		} else {
			computer_skill.destroy();
			cv2Computer_skill.destroy();

			return res.send({
				success:true,
				error: false,
				message: "computer_skill_deleted",
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

export default ComputerSkillApiRouter;




