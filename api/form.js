import { Router } from "express";

import { md5, transporter, jwt} from "../index.js";

// Router yapısı
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "form-api-working",
		}
	)
});

export default apiRouter;




