import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { Dil } from "../db/index.js";

// Router yapısı
const DilApiRouter = Router();

DilApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "dil-api-working",
		}
	)
});

DilApiRouter.get("/add", async(req, res) => {

    const dilData = req.body;
    console.log(`DIL DATA: `,dilData);

    const newDil = await Dil.findOrCreate({
        where: { email: dilData.email },
       defaults: dilData});

	res.json(
		{
			success: true,
			data: [...newDil],
			message: "dil-api-working",
		}
	)
});

DilApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const dilData = req.body;
    console.log(`DIL DATA: `,dilData);

    const dil = await Dil.findOne({where:{id:id}});

    if (!dil) {
        return res.status(400).json({ message: 'Dil not found' })
    }

    const updateDil = await Dil.update( dilData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateDil],
			message: "dil-api-updated",
		}
	)
});

DilApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const dil = await Dil.findOne({where:{id:id}});

    if (!dil) {
        return res.status(400).json({ message: 'Dil not found' })
    }

    const destroyDil = await Dil.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "dil-api-deleted",
		}
	)
});

export default DilApiRouter;




