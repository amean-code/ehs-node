import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { EgitimBilgisi } from "../db/index.js";

// Router yapısı
const EgitimBilgisiApiRouter = Router();

EgitimBilgisiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "egitimBilgisi-api-working",
		}
	)
});

EgitimBilgisiApiRouter.get("/add", async(req, res) => {

    const egitimBilgisiData = req.body;
    console.log(`EgitimBilgisi DATA: `,egitimBilgisiData);

    const newEgitimBilgisi = await EgitimBilgisi.findOrCreate({
        where: { email: egitimBilgisiData.email },
       defaults: egitimBilgisiData});

	res.json(
		{
			success: true,
			data: [...newEgitimBilgisi],
			message: "egitimBilgisi-api-working",
		}
	)
});

EgitimBilgisiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const egitimBilgisiData = req.body;
    console.log(`EgitimBilgisi DATA: `,egitimBilgisiData);

    const egitimBilgisi = await EgitimBilgisi.findOne({where:{id:id}});

    if (!egitimBilgisi) {
        return res.status(400).json({ message: 'EgitimBilgisi not found' })
    }

    const updateEgitimBilgisi = await EgitimBilgisi.update( egitimBilgisiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateEgitimBilgisi],
			message: "egitimBilgisi-api-updated",
		}
	)
});

EgitimBilgisiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const egitimBilgisi = await EgitimBilgisi.findOne({where:{id:id}});

    if (!egitimBilgisi) {
        return res.status(400).json({ message: 'EgitimBilgisi not found' })
    }

    const destroyEgitimBilgisi = await EgitimBilgisi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "egitimBilgisi-api-deleted",
		}
	)
});

export default EgitimBilgisiApiRouter;




