import { Router } from "express";
import formRouter from "./form.js";
import { md5, transporter, jwt} from "../index.js";
import MenteeApiRouter from "./mentee.js";
import HobiApiRouter from "./hobi.js";
import DilApiRouter from "./dil.js";
import YayinApiRouter from "./yayin.js";
import BilgisayarBecerisiApiRouter from "./bilgisayar_becerisi.js";
import EgitimBilgisiApiRouter from "./egitim_bilgisi.js";
import TecrubeBilgisiApiRouter from "./tecrube_bilgisi.js";
import KursBilgisiApiRouter from "./kurs_bilgisi.js";
import ProjeBilgisiApiRouter from "./proje_bilgisi.js"


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
apiRouter.use("/hobi",HobiApiRouter);
apiRouter.use("/dil",DilApiRouter);
apiRouter.use("/yayin",YayinApiRouter);
apiRouter.use("/bilgisayarBecerisi",BilgisayarBecerisiApiRouter);
apiRouter.use("/egitimBilgisi",EgitimBilgisiApiRouter);
apiRouter.use("/tecrubeBilgisi",TecrubeBilgisiApiRouter);
apiRouter.use("/kursBilgisi",KursBilgisiApiRouter);
apiRouter.use("/projeBilgisi",ProjeBilgisiApiRouter);

export default apiRouter;




