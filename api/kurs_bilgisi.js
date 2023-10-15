import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { KursBilgisi } from "../db/index.js";

// Router yapısı
const KursBilgisiApiRouter = Router();

KursBilgisiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "kursBilgisi-api-working",
		}
	)
});

KursBilgisiApiRouter.get("/add", async(req, res) => {

    const kursBilgisiData = req.body;
    console.log(`KursBilgisi DATA: `,kursBilgisiData);

    const newKursBilgisi = await KursBilgisi.findOrCreate({
        where: { email: kursBilgisiData.email },
       defaults: kursBilgisiData});

	res.json(
		{
			success: true,
			data: [...newKursBilgisi],
			message: "kursBilgisi-api-working",
		}
	)
});

KursBilgisiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const kursBilgisiData = req.body;
    console.log(`KursBilgisi DATA: `,kursBilgisiData);

    const kursBilgisi = await KursBilgisi.findOne({where:{id:id}});

    if (!kursBilgisi) {
        return res.status(400).json({ message: 'KursBilgisi not found' })
    }

    const updateKursBilgisi = await KursBilgisi.update( kursBilgisiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateKursBilgisi],
			message: "kursBilgisi-api-updated",
		}
	)
});

KursBilgisiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const kursBilgisi = await KursBilgisi.findOne({where:{id:id}});

    if (!kursBilgisi) {
        return res.status(400).json({ message: 'KursBilgisi not found' })
    }

    const destroyKursBilgisi = await KursBilgisi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "kursBilgisi-api-deleted",
		}
	)
});

export default KursBilgisiApiRouter;




