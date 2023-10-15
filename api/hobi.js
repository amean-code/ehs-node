import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { Hobi } from "../db/index.js";

// Router yapısı
const HobiApiRouter = Router();

HobiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "hobi-api-working",
		}
	)
});

HobiApiRouter.get("/add", async(req, res) => {

    const hobiData = req.body;
    console.log(`HOBI DATA: `,hobiData);

    const newHobi = await Hobi.findOrCreate({
        where: { email: hobiData.email },
       defaults: hobiData});

	res.json(
		{
			success: true,
			data: [...newHobi],
			message: "hobi-api-working",
		}
	)
});

HobiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const hobiData = req.body;
    console.log(`HOBI DATA: `,hobiData);

    const hobi = await Hobi.findOne({where:{id:id}});

    if (!hobi) {
        return res.status(400).json({ message: 'Hobi not found' })
    }

    const updateHobi = await Hobi.update( hobiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateHobi],
			message: "hobi-api-updated",
		}
	)
});

HobiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const hobi = await Hobi.findOne({where:{id:id}});

    if (!hobi) {
        return res.status(400).json({ message: 'Hobi not found' })
    }

    const destroyHobi = await Hobi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "hobi-api-deleted",
		}
	)
});

export default HobiApiRouter;




