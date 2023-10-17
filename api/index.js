import { Router } from "express";
import formRouter from "./form.js";
import { md5, transporter, jwt} from "../index.js";
import MenteeApiRouter from "./mentee.js";
import HobbyApiRouter from "./hobby.js";
import LanguageApiRouter from "./language.js";
import PublishApiRouter from "./publish.js";
import ComputerSkillApiRouter from "./computer_skill.js";
import EducationInformationApiRouter from "./education_information.js";
import ExperienceInformationApiRouter from "./experience_information.js";
import CourseInformationApiRouter from "./course_information.js";
import ProjectInformationApiRouter from "./project_information.js"


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
apiRouter.use("/hobby",HobbyApiRouter);
apiRouter.use("/language",LanguageApiRouter);
apiRouter.use("/publish",PublishApiRouter);
apiRouter.use("/computerSkill",ComputerSkillApiRouter);
apiRouter.use("/educationInformation",EducationInformationApiRouter);
apiRouter.use("/experienceInformation",ExperienceInformationApiRouter);
apiRouter.use("/courseInformation",CourseInformationApiRouter);
apiRouter.use("/projectInformation",ProjectInformationApiRouter);

export default apiRouter;




