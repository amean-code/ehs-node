import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { ProjeBilgisi } from "../db/index.js";

// Router yapısı
const ProjeBilgisiApiRouter = Router();

ProjeBilgisiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "projeBilgisi-api-working",
		}
	)
});

ProjeBilgisiApiRouter.get("/add", async(req, res) => {

    const projeBilgisiData = req.body;
    console.log(`ProjeBilgisi DATA: `,projeBilgisiData);

    const newProjeBilgisi = await ProjeBilgisi.findOrCreate({
        where: { email: projeBilgisiData.email },
       defaults: projeBilgisiData});

	res.json(
		{
			success: true,
			data: [...newProjeBilgisi],
			message: "projeBilgisi-api-working",
		}
	)
});

ProjeBilgisiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const projeBilgisiData = req.body;
    console.log(`ProjeBilgisi DATA: `,projeBilgisiData);

    const projeBilgisi = await ProjeBilgisi.findOne({where:{id:id}});

    if (!projeBilgisi) {
        return res.status(400).json({ message: 'ProjeBilgisi not found' })
    }

    const updateProjeBilgisi = await ProjeBilgisi.update( projeBilgisiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateProjeBilgisi],
			message: "projeBilgisi-api-updated",
		}
	)
});

ProjeBilgisiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const projeBilgisi = await ProjeBilgisi.findOne({where:{id:id}});

    if (!projeBilgisi) {
        return res.status(400).json({ message: 'ProjeBilgisi not found' })
    }

    const destroyProjeBilgisi = await ProjeBilgisi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "projeBilgisi-api-deleted",
		}
	)
});

export default ProjeBilgisiApiRouter;




