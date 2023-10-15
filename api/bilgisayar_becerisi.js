import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";
import { BilgisayarBecerisi } from "../db/index.js";

// Router yapısı
const BilgisayarBecerisiApiRouter = Router();

BilgisayarBecerisiApiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "bilgisayarBecerisi-api-working",
		}
	)
});

BilgisayarBecerisiApiRouter.get("/add", async(req, res) => {

    const bilgisayarBecerisiData = req.body;
    console.log(`Bilgisayar Becerisi DATA: `,bilgisayarBecerisiData);

    const newBilgisayarBecerisi = await BilgisayarBecerisi.findOrCreate({
        where: { email: bilgisayarBecerisiData.email },
       defaults: bilgisayarBecerisiData});

	res.json(
		{
			success: true,
			data: [...newBilgisayarBecerisi],
			message: "bilgisayarBecerisi-api-working",
		}
	)
});

BilgisayarBecerisiApiRouter.put("/update/:id", async(req, res) => {
    const id = req.params.id
    const bilgisayarBecerisiData = req.body;
    console.log(`bilgisayarBecerisi DATA: `,bilgisayarBecerisiData);

    const bilgisayarBecerisi = await BilgisayarBecerisi.findOne({where:{id:id}});

    if (!bilgisayarBecerisi) {
        return res.status(400).json({ message: 'Bilgisayar Becerisi not found' })
    }

    const updateBilgisayarBecerisi = await BilgisayarBecerisi.update( bilgisayarBecerisiData, { where: { id: id} });

	res.json(
		{
			success: true,
			data: [...updateBilgisayarBecerisi],
			message: "bilgisayarBecerisi-api-updated",
		}
	)
});

BilgisayarBecerisiApiRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    const bilgisayarBecerisi = await BilgisayarBecerisi.findOne({where:{id:id}});

    if (!bilgisayarBecerisi) {
        return res.status(400).json({ message: 'Bilgisayar Becerisi not found' })
    }

    const destroyBilgisayarBecerisi = await BilgisayarBecerisi.destroy({ where: { id: id} });

	res.json(
		{
			success: true,
			message: "bilgisayarBecerisi-api-deleted",
		}
	)
});

export default BilgisayarBecerisiApiRouter;




