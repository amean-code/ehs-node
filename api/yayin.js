import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { Yayin } from "../db/index.js";

// Router yapısı
const YayinApiRouter = Router();

YayinApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "yayin-api-working",
		}
	)
});

YayinApiRouter.get("/add", async(req, res) => {

    const yayinData = req.body;
    console.log(`YAYIN DATA: `,yayinData);

    const newYayin = await Yayin.findOrCreate({
        where: { email: yayinData.email },
       defaults: yayinData});

	res.json(
		{
			success: true,
			data: [...newYayin],
			message: "yayin-api-working",
		}
	)
});

YayinApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const yayinData = req.body;
    console.log(`YAYIN DATA: `,yayinData);

    const yayin = await Yayin.findOne({where:{id:id}});

    if (!yayin) {
        return res.status(400).json({ message: 'Yayın not found' })
    }

    const updateYayin = await Yayin.update( yayinData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateYayin],
			message: "yayin-api-updated",
		}
	)
});

YayinApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const yayin = await Yayin.findOne({where:{id:id}});

    if (!yayin) {
        return res.status(400).json({ message: 'Yayın not found' })
    }

    const destroyYayin = await Yayin.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "yayin-api-deleted",
		}
	)
});

export default YayinApiRouter;




