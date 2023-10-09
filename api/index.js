import { Router } from "express";
import formRouter from "./form.js";
import { md5, transporter, jwt} from "../index.js";
import MenteeApiRouter from "./mentee.js";

// Router yapısı
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
	res.json(
		{
			success: true,
			data: [],
			message: "ehs-api-working",
		}
	)
});

apiRouter.use("/form",formRouter);
apiRouter.use("/mentee",MenteeApiRouter);

export default apiRouter;



