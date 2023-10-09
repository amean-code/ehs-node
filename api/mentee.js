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




