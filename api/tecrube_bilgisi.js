import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { TecrubeBilgisi } from "../db/index.js";

// Router yapısı
const TecrubeBilgisiApiRouter = Router();

TecrubeBilgisiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "tecrubeBilgisi-api-working",
		}
	)
});

TecrubeBilgisiApiRouter.get("/add", async(req, res) => {

    const tecrubeBilgisiData = req.body;
    console.log(`TecrubeBilgisi DATA: `,tecrubeBilgisiData);

    const newTecrubeBilgisi = await TecrubeBilgisi.findOrCreate({
        where: { email: tecrubeBilgisiData.email },
       defaults: tecrubeBilgisiData});

	res.json(
		{
			success: true,
			data: [...newTecrubeBilgisi],
			message: "tecrubeBilgisi-api-working",
		}
	)
});

TecrubeBilgisiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const tecrubeBilgisiData = req.body;
    console.log(`TecrubeBilgisi DATA: `,tecrubeBilgisiData);

    const tecrubeBilgisi = await TecrubeBilgisi.findOne({where:{id:id}});

    if (!tecrubeBilgisi) {
        return res.status(400).json({ message: 'TecrubeBilgisi not found' })
    }

    const updateTecrubeBilgisi = await TecrubeBilgisi.update( tecrubeBilgisiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateTecrubeBilgisi],
			message: "tecrubeBilgisi-api-updated",
		}
	)
});

TecrubeBilgisiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const tecrubeBilgisi = await TecrubeBilgisi.findOne({where:{id:id}});

    if (!tecrubeBilgisi) {
        return res.status(400).json({ message: 'TecrubeBilgisi not found' })
    }

    const destroyTecrubeBilgisi = await TecrubeBilgisi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "tecrubeBilgisi-api-deleted",
		}
	)
});

export default TecrubeBilgisiApiRouter;




