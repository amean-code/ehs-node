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

MenteeApiRouter.post("/update/:id", async(req, res) => {
    const id = req.params.id
    let menteeData = req.body;
    console.log(`MENTEE DATA: `,menteeData);

    let mentee = await Mentee.findOne({where:{id:id}});

    if (!mentee) {
        return res.status(400).json({ message: 'Mentee not found' })
    }

    mentee.update({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        linkedin: req.body.linkedin
    });

    mentee.save();

    const accessToken = jwt.sign(mentee.dataValues, process.env.ACCESS_TOKEN_SECRET);

	return res.json(
		{
			success: true,
			data: mentee.dataValues,
			message: "mentee-api-updated",
            accessToken: accessToken
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




