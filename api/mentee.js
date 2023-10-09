import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { Mentee } from "../db/index.js";

// Router yapısı
const MenteeApiRouter = Router();

MenteeApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "mentee-api-working",
		}
	)
});

MenteeApiRouter.get("/add", async(req, res) => {

    const menteeData = req.body;
    console.log(`MENTEE DATA: `,menteeData);

    menteeData.password = md5(menteeData.password);
    menteeData.verified = false;
    menteeData.accepted = false;
    menteeData.verify_code = generate(6);

    const newMentee = await Mentee.findOrCreate({
        where: { email: menteeData.email },
       defaults: menteeData});

	res.json(
		{
			success: true,
			data: [...newMentee],
			message: "mentee-api-working",
		}
	)
});

MenteeApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const menteeData = req.body;
    console.log(`MENTEE DATA: `,menteeData);

    menteeData.password = md5(menteeData.password);
    menteeData.verified = false;
    menteeData.accepted = false;
    menteeData.verify_code = generate(6);

    const mentee = await Mentee.findOne({where:{id:id}});

    if (!mentee) {
        return res.status(400).json({ message: 'Mentee not found' })
    }

    const updateMentee = await Mentee.update( menteeData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateMentee],
			message: "mentee-api-updated",
		}
	)
});

MenteeApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const mentee = await Mentee.findOne({where:{id:id}});

    if (!mentee) {
        return res.status(400).json({ message: 'Mentee not found' })
    }

    const destroyMentee = await Mentee.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "mentee-api-deleted",
		}
	)
});

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}

export default MenteeApiRouter;




