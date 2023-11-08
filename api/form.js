import { Router } from "express";
import { authenticateToken } from "../core/auth.js";

import { md5, transporter, jwt} from "../index.js";
import { CV, MenteeForm } from "../db/index.js";
import * as Db from "../db/index.js"
import { Op } from "sequelize";

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

apiRouter.post("/add",authenticateToken, async (req, res) => {

	MenteeForm.findOrCreate({
		where: {
			mentee_id: req.user.id
		},
		defaults: {
			mentee_id: req.user.id
		}
	}).then(async ([form,created]) => {
		if(created){
			var newCV = await CV.create()

			form.setDataValue("cv_id",newCV.getDataValue("id"));

			await form.save();
			await newCV.save();

			return res.json({
				success: true,
				error: false,
				message: "Form Oluşturuldu",
				data: {
					...form.dataValues
				}
			})

		}else{
			return res.json({
				success: false,
				error: true,
				message: "form_already_created",
				data: {
					...form.dataValues
				}
			})
		}
	})
	
});

apiRouter.get("/get-form",authenticateToken,async (req,res)=>{
	try {

		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		let education_information_ins = await Db.CV2EducationInformation.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let education_informations = await Db.EducationInformation.findAll({
			where: {
				id: {
					[Op.in]: education_information_ins.map(a=>{return a.getDataValue("education_information_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		education_informations = education_informations.map((item)=>{
			return {
				...item.dataValues,
				id: education_information_ins.find((a)=>{
					if(a.getDataValue("education_information_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		})

		let experience_information_ins = await Db.CV2ExperienceInformation.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let experience_informations = await Db.ExperienceInformation.findAll({
			where: {
				id: {
					[Op.in]: experience_information_ins.map(a=>{return a.getDataValue("experience_information_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		experience_informations = experience_informations.map((item)=>{
			return {
				...item.dataValues,
				id: experience_information_ins.find((a)=>{
					if(a.getDataValue("experience_information_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		})

		let course_information_ins = await Db.CV2CourseInformation.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let course_informations = await Db.CourseInformation.findAll({
			where: {
				id: {
					[Op.in]: course_information_ins.map(a=>{return a.getDataValue("course_information_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		course_informations = course_informations.map((item)=>{
			return {
				...item.dataValues,
				id: course_information_ins.find((a)=>{
					if(a.getDataValue("course_information_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		})

		let project_information_ins = await Db.CV2ProjectInformation.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let project_informations = await Db.ProjectInformation.findAll({
			where: {
				id: {
					[Op.in]: project_information_ins.map(a=>{return a.getDataValue("project_information_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		project_informations = project_informations.map((item)=>{
			return {
				...item.dataValues,
				id: project_information_ins.find((a)=>{
					if(a.getDataValue("project_information_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		})

		let language_ins = await Db.CV2Language.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let languages = await Db.Language.findAll({
			where: {
				id: {
					[Op.in]: language_ins.map(a=>{return a.getDataValue("language_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		languages = languages.map((item)=>{
			return {
				...item.dataValues,
				id: language_ins.find((a)=>{
					if(a.getDataValue("language_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				point: language_ins.find((a)=>{
					if(a.getDataValue("language_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("point")
			}
		})

		let computer_skill_ins = await Db.CV2ComputerSkill.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let computer_skills = await Db.ComputerSkill.findAll({
			where: {
				id: {
					[Op.in]: computer_skill_ins.map(a=>{return a.getDataValue("computer_skill_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		computer_skills = computer_skills.map((item)=>{
			return {
				...item.dataValues,
				id: computer_skill_ins.find((a)=>{
					if(a.getDataValue("computer_skill_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				point: computer_skill_ins.find((a)=>{
					if(a.getDataValue("computer_skill_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("point")
				
			}
		})

		let publish_ins = await Db.CV2Publish.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let publishes = await Db.Publish.findAll({
			where: {
				id: {
					[Op.in]: publish_ins.map(a=>{return a.getDataValue("publish_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		publishes = publishes.map((item)=>{
			return {
				...item.dataValues,
				id: publish_ins.find((a)=>{
					if(a.getDataValue("publish_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		})

		let hobby_ins = await Db.CV2Hobby.findAll({
			where: {
				cv_id: cv_id
			},
			order:[
				["id","ASC"]
			]
		});

		let hobbies = await Db.Hobby.findAll({
			where: {
				id: {
					[Op.in]: hobby_ins.map(a=>{return a.getDataValue("hobby_id")})
				}
			},order:[
				["id","ASC"]
			]
		})

		hobbies = hobbies.map((item)=>{
			return {
				...item.dataValues,
				id: hobby_ins.find((a)=>{
					if(a.getDataValue("hobby_id")==item.getDataValue("id")){
						return true
					}return false
				}).getDataValue("id"),
				
			}
		});

		let post_mentoring_process = await Db.PostMentoringProcess.findOne({
			where: {
				cv_id: cv_id
			}
		});

		if(!post_mentoring_process){
			post_mentoring_process = {
				id: 0,
				question_1:"",
				question_2:[],
				question_3:"",
				question_4:"",
				question_5:""
			}
		}

		let mentoring_process_general_information = await Db.MentoringProcessGeneralInformation.findOne({
			where: {
				cv_id: cv_id
			}
		});

		if(!mentoring_process_general_information){
			mentoring_process_general_information = {
				id: 0,
				question_1:"",
				question_2:[],
				question_3:"",
				question_4:"",
				question_5:""
			}
		}

		let mentoring_process_detailed_information = await Db.MentoringProcessDetailedInformation.findOne({
			where: {
				cv_id: cv_id
			}
		});

		if(!mentoring_process_detailed_information){
			mentoring_process_detailed_information = {
				id: 0,
				question_1:"",
				question_2:[],
				question_3:"",
				question_4:"",
				question_5:""
			}
		}

		let university_representation_process_general_information = await Db.UniversityRepresentationProcessGeneralInformation.findOne({
			where: {
				cv_id: cv_id
			}
		});

		if(!university_representation_process_general_information){
			university_representation_process_general_information = {
				id: 0,
				question_1:"",
				question_2:"",
				question_3:"",
				question_4:"",
				question_5:"",
				question_6:""
			}
		}

		return res.json({
			success: true,
			educations: education_informations,
			experience_informations: experience_informations,
			course_informations: course_informations,
			project_informations: project_informations,
			languages: languages,
			computer_skills: computer_skills,
			publishes:publishes,
			hobbies:hobbies,
			post_mentoring_process: post_mentoring_process.dataValues,
			mentoring_process_general_information: mentoring_process_general_information.dataValues,
			mentoring_process_detailed_information: mentoring_process_detailed_information.dataValues,
			university_representation_process_general_information:university_representation_process_general_information
		})
	} catch (error) {
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/fill-form",authenticateToken,async (req,res)=>{
	try {

		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		if(req.body.educations){

			req.body.educations.forEach(async (education,ed_index)=>{

				if(education.id>0){
					const curr_cv2_education = await Db.CV2EducationInformation.findOne({
						where:{
							id : education.id
						}
					});

					const curr_education = await Db.EducationInformation.findOne({
						where:{
							id: curr_cv2_education.getDataValue("education_information_id")
						}
					})


					curr_education.update({
						department: education.department,
						university: education.university,
						rate: education.rate,
						start_date: education.start_date,
						finish_date: education.finish_date,
						interesting_lesson: education.interesting_lesson,
						project_research_topics: education.project_research_topics,
						active_clubs: education.active_clubs
					});

					curr_education.save();

				}else{

					let new_education = await Db.EducationInformation.create({
						department: education.department,
						university: education.university,
						rate: education.rate,
						start_date: education.start_date,
						finish_date: education.finish_date,
						interesting_lesson: education.interesting_lesson,
						project_research_topics: education.project_research_topics,
						active_clubs: education.active_clubs
					})
	
					Db.CV2EducationInformation.create({
						cv_id: cv_id,
						education_information_id: new_education.getDataValue("id")
					})
				}
			})
		}

		if(req.body.experience_informations){

			req.body.experience_informations.forEach(async (exprience,ed_index)=>{

				if(exprience.id>0){
					const curr_cv2_experience = await Db.CV2ExperienceInformation.findOne({
						where:{
							id : exprience.id
						}
					});

					const curr_experience = await Db.ExperienceInformation.findOne({
						where:{
							id: curr_cv2_experience.getDataValue("experience_information_id")
						}
					})


					curr_experience.update({
						position:exprience.position,
						institution:exprience.institution,
						start_date:exprience.start_date,
						finish_date:exprience.finish_date,
						task_1:exprience.task_1,
						task_2:exprience.task_2,
						task_3:exprience.task_3,
						technologies: exprience.technologies
					});

					curr_experience.save();

				}else{

					let new_experience = await Db.ExperienceInformation.create({
						position:exprience.position,
						institution:exprience.institution,
						start_date:exprience.start_date,
						finish_date:exprience.finish_date,
						task_1:exprience.task_1,
						task_2:exprience.task_2,
						task_3:exprience.task_3,
						technologies: exprience.technologies
					})
	
					Db.CV2ExperienceInformation.create({
						cv_id: cv_id,
						experience_information_id: new_experience.getDataValue("id")
					})
				}
			})
		}

		if(req.body.course_informations){

			req.body.course_informations.forEach(async (course,ed_index)=>{

				if(course.id>0){
					const curr_cv2_course = await Db.CV2CourseInformation.findOne({
						where:{
							id : course.id
						}
					});

					const curr_course = await Db.CourseInformation.findOne({
						where:{
							id: curr_cv2_course.getDataValue("course_information_id")
						}
					})


					curr_course.update({
						name: course.name ,
						institution: course.institution ,
						finish_date: course.finish_date ,
						skill_1: course.skill_1 ,
						skill_2: course.skill_2 ,
						skill_3: course.skill_3 
					});

					curr_course.save();

				}else{

					let new_course = await Db.CourseInformation.create({
						name: course.name ,
						institution: course.institution ,
						finish_date: course.finish_date ,
						skill_1: course.skill_1 ,
						skill_2: course.skill_2 ,
						skill_3: course.skill_3 
					})
	
					Db.CV2CourseInformation.create({
						cv_id: cv_id,
						course_information_id: new_course.getDataValue("id")
					})
				}
			})
		}

		if(req.body.project_informations){

			req.body.project_informations.forEach(async (project,ed_index)=>{

				if(project.id>0){
					const curr_cv2_project = await Db.CV2ProjectInformation.findOne({
						where:{
							id : project.id
						}
					});

					const curr_project = await Db.ProjectInformation.findOne({
						where:{
							id: curr_cv2_project.getDataValue("project_information_id")
						}
					})


					curr_project.update({
						project: project.project,
						city: project.city,
						supporting_institution: project.supporting_institution,
						funding_institution: project.funding_institution,
						budget: project.budget,
						task_1: project.task_1,
						task_2: project.task_2,
						task_3: project.task_3,
						technologies: project.technologies,
						awards: project.awards
					});

					curr_project.save();

				}else{

					let new_project = await Db.ProjectInformation.create({
						project: project.project,
						city: project.city,
						supporting_institution: project.supporting_institution,
						funding_institution: project.funding_institution,
						budget: project.budget,
						task_1: project.task_1,
						task_2: project.task_2,
						task_3: project.task_3,
						technologies: project.technologies,
						awards: project.awards
					})
	
					Db.CV2ProjectInformation.create({
						cv_id: cv_id,
						project_information_id: new_project.getDataValue("id")
					})
				}
			})
		}

		if(req.body.hobbies){

			req.body.hobbies.forEach(async (hobby,ed_index)=>{

				if(hobby.id>0){
					const curr_cv2_hobby = await Db.CV2Hobby.findOne({
						where:{
							id : hobby.id
						}
					});

					const curr_hobby = await Db.Hobby.findOne({
						where:{
							id: curr_cv2_hobby.getDataValue("hobby_id")
						}
					})


					curr_hobby.update({
						name: hobby.name,
						description: hobby.description,
						isProfiessional: hobby.isProfiessional
					});

					curr_hobby.save();

				}else{

					let new_hobby = await Db.Hobby.create({
						name: hobby.name,
						description: hobby.description,
						isProfiessional: hobby.isProfiessional
					})
	
					Db.CV2Hobby.create({
						cv_id: cv_id,
						hobby_id: new_hobby.getDataValue("id")
					})
				}
			})
		}

		if(req.body.publishes){

			req.body.publishes.forEach(async (publish,ed_index)=>{

				if(publish.id>0){
					const curr_cv2_publish = await Db.CV2Publish.findOne({
						where:{
							id : publish.id
						}
					});

					const curr_publish = await Db.Publish.findOne({
						where:{
							id: curr_cv2_publish.getDataValue("publish_id")
						}
					})


					curr_publish.update({
						name: publish.name ,
						publishing_institution: publish.publishing_institution ,
						publish_date: publish.publish_date ,
						DOI: publish.DOI 
					});

					curr_publish.save();

				}else{

					let new_publish = await Db.Publish.create({
						name: publish.name ,
						publishing_institution: publish.publishing_institution ,
						publish_date: new Date(publish.publish_date).toUTCString() ,
						DOI: publish.DOI 
					})
	
					Db.CV2Publish.create({
						cv_id: cv_id,
						publish_id: new_publish.getDataValue("id")
					})
				}
			})
		}

		if(req.body.languages){

			req.body.languages.forEach(async (language,ed_index)=>{

				if(language.id>0){
					const curr_cv2_language = await Db.CV2Language.findOne({
						where:{
							id : language.id
						}
					});

					const curr_language = await Db.Language.findOne({
						where:{
							id: curr_cv2_language.getDataValue("language_id")
						}
					})


					curr_cv2_language.update({
						point: language.point,
					})

					curr_cv2_language.save();

					curr_language.update({
						language: language.language
					});

					curr_language.save();

				}else{

					let new_language = await Db.Language.create({
						language: language.language
					})
	
					Db.CV2Language.create({
						cv_id: cv_id,
						point: language.point ,
						language_id: new_language.getDataValue("id")
					})
				}
			})
		}

		if(req.body.computer_skills){

			req.body.computer_skills.forEach(async (skill,ed_index)=>{

				if(skill.id>0){
					const curr_cv2_skill = await Db.CV2ComputerSkill.findOne({
						where:{
							id : skill.id
						}
					});

					const curr_skill = await Db.ComputerSkill.findOne({
						where:{
							id: curr_cv2_skill.getDataValue("computer_skill_id")
						}
					})


					curr_cv2_skill.update({
						point: skill.point,
					})

					curr_cv2_skill.save();

					curr_skill.update({
						skill: skill.skill
					});

					curr_skill.save();

				}else{

					let new_skill = await Db.ComputerSkill.create({
						skill: skill.skill
					})
	
					Db.CV2ComputerSkill.create({
						cv_id: cv_id,
						point: skill.point ,
						computer_skill_id: new_skill.getDataValue("id")
					})
				}
			})
		}

		

		return res.json({
			success: true
		})
	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/delete-item-from-form",authenticateToken, async(req,res)=>{
	try {
		if(req.body.key == "education"){
			let education_cv2 = await Db.CV2EducationInformation.findOne({
				where: {
					id: req.body.id
				}
			});

			let education = await Db.EducationInformation.findOne({
				where: {
					id: education_cv2.getDataValue("education_information_id")
				}
			})

			education.destroy();

			education_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "education-deleted"
			})
		}else if(req.body.key == "experience"){
			let experience_cv2 = await Db.CV2ExperienceInformation.findOne({
				where: {
					id: req.body.id
				}
			});

			let experience = await Db.ExperienceInformation.findOne({
				where: {
					id: experience_cv2.getDataValue("experience_information_id")
				}
			})

			experience.destroy();

			experience_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "experience-deleted"
			})
		}else if(req.body.key == "course"){
			let course_cv2 = await Db.CV2CourseInformation.findOne({
				where: {
					id: req.body.id
				}
			});

			let course = await Db.CourseInformation.findOne({
				where: {
					id: course_cv2.getDataValue("course_information_id")
				}
			})

			course.destroy();

			course_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "course-deleted"
			})
		}else if(req.body.key == "project"){
			let project_cv2 = await Db.CV2ProjectInformation.findOne({
				where: {
					id: req.body.id
				}
			});

			let project = await Db.ProjectInformation.findOne({
				where: {
					id: project_cv2.getDataValue("project_information_id")
				}
			})

			project.destroy();

			project_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "project-deleted"
			})
		}else if(req.body.key == "publish"){
			let publish_cv2 = await Db.CV2Publish.findOne({
				where: {
					id: req.body.id
				}
			});

			let publish = await Db.Publish.findOne({
				where: {
					id: publish_cv2.getDataValue("publish_id")
				}
			})

			publish.destroy();

			publish_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "publish-deleted"
			})
		}else if(req.body.key == "hobby"){
			let hobby_cv2 = await Db.CV2Hobby.findOne({
				where: {
					id: req.body.id
				}
			});

			let hobby = await Db.Hobby.findOne({
				where: {
					id: hobby_cv2.getDataValue("hobby_id")
				}
			})

			hobby.destroy();

			hobby_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "hobby-deleted"
			})
		}else if(req.body.key == "language"){
			let language_cv2 = await Db.CV2Language.findOne({
				where: {
					id: req.body.id
				}
			});
			
			language_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "language-deleted"
			})
		}else if(req.body.key == "computer-skill"){
			let computer_skill_cv2 = await Db.CV2ComputerSkill.findOne({
				where: {
					id: req.body.id
				}
			});
			
			computer_skill_cv2.destroy();

			return res.send({
				success: true,
				error: false,
				message: "computer-skill-deleted"
			})
		}else{
			return res.send({
				success: false,
				error: false,
				message: "key-not-found"
			})
		}
	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/mentoring-process-general-information-form",authenticateToken,async (req,res)=>{
	try {

		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		let [mentoring_process_general_information,created] = await Db.MentoringProcessGeneralInformation.findOrCreate({
			where:{
				cv_id:cv_id
			},
			defaults:{
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4,
				question_5: req.body.question_5
			}
		});

		if(!created){
			mentoring_process_general_information.update({
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4,
				question_5: req.body.question_5
			});

			mentoring_process_general_information.save();
		}

		return res.send({
			success: true,
			data: mentoring_process_general_information.dataValues
		})

	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/university-representation-process-general-information",authenticateToken,async (req,res)=>{
	try {

		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		console.timeLog("FORM BODY: ",req.body);

		let [university_representation_process_general_information,created] = await Db.UniversityRepresentationProcessGeneralInformation.findOrCreate({
			where:{
				cv_id:cv_id
			},
			defaults:{
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4,
				question_5: req.body.question_5,
				question_6: req.body.question_6
			}
		});

		if(!created){
			university_representation_process_general_information.update({
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4,
				question_5: req.body.question_5,
				question_6: req.body.question_6
			});

			university_representation_process_general_information.save();
		}

		return res.send({
			success: true,
			data: university_representation_process_general_information.dataValues
		})

	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/post-mentoring-process",authenticateToken,async (req,res)=>{
	try {

		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		let [post_mentoring_process,created] = await Db.PostMentoringProcess.findOrCreate({
			where:{
				cv_id:cv_id
			},
			defaults:{
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4
			}
		});

		if(!created){
			post_mentoring_process.update({
				question_1: req.body.question_1,
				question_2: req.body.question_2,
				question_3: req.body.question_3,
				question_4: req.body.question_4
			});

			post_mentoring_process.save();
		}

		return res.send({
			success: true,
			data: post_mentoring_process.dataValues
		})

	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

apiRouter.post("/mentoring-process-detailed-information-form",authenticateToken,async (req,res)=>{
	try {
		let form = await Db.MenteeForm.findOne({
			where:{
				mentee_id: req.user.id
			}
		})

		let cv_id = form.getDataValue("cv_id");

		let [mentoring_process_detailed_information,created] = await Db.MentoringProcessDetailedInformation.findOrCreate({
			where:{
				cv_id:cv_id
			},
			defaults:{
				lisans_ve_lisansustu_tez_mentorlugu_question_1: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_1?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_1
						:"",
				lisans_ve_lisansustu_tez_mentorlugu_question_2: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_2?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_2
						:"",
				lisans_ve_lisansustu_tez_mentorlugu_question_3: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_3?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_3
						:"",
				proje_mentorlugu_question_1: 
					req.body.proje_mentorlugu_question_1?
						req.body.proje_mentorlugu_question_1
						:"",
				proje_mentorlugu_question_2: 
					req.body.proje_mentorlugu_question_2?
						req.body.proje_mentorlugu_question_2
						:"",
				proje_mentorlugu_question_3: 
					req.body.proje_mentorlugu_question_3?
						req.body.proje_mentorlugu_question_3
						:"",
				akademik_ve_kariyer_mentorlugu_question_1: 
					req.body.akademik_ve_kariyer_mentorlugu_question_1?
						req.body.akademik_ve_kariyer_mentorlugu_question_1
						:"",
				akademik_ve_kariyer_mentorlugu_question_2: 
					req.body.akademik_ve_kariyer_mentorlugu_question_2?
						req.body.akademik_ve_kariyer_mentorlugu_question_2
						:"",
				girisimcilik_mentorlugu_question_1: 
					req.body.girisimcilik_mentorlugu_question_1?
						req.body.girisimcilik_mentorlugu_question_1
						:"",
				girisimcilik_mentorlugu_question_2: 
					req.body.girisimcilik_mentorlugu_question_2?
						req.body.girisimcilik_mentorlugu_question_2
						:"",
				girisimcilik_mentorlugu_question_3: 
					req.body.girisimcilik_mentorlugu_question_3?
						req.body.girisimcilik_mentorlugu_question_3
						:"",
				akran_mentorlugu_question_1: 
					req.body.akran_mentorlugu_question_1?
						req.body.akran_mentorlugu_question_1
						:"",
				akran_mentorlugu_question_2: 
					req.body.akran_mentorlugu_question_2?
						req.body.akran_mentorlugu_question_2
						:""
			}
		});

		if(!created){
			mentoring_process_detailed_information.update({
				lisans_ve_lisansustu_tez_mentorlugu_question_1: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_1?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_1
						:"",
				lisans_ve_lisansustu_tez_mentorlugu_question_2: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_2?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_2
						:"",
				lisans_ve_lisansustu_tez_mentorlugu_question_3: 
					req.body.lisans_ve_lisansustu_tez_mentorlugu_question_3?
						req.body.lisans_ve_lisansustu_tez_mentorlugu_question_3
						:"",
				proje_mentorlugu_question_1: 
					req.body.proje_mentorlugu_question_1?
						req.body.proje_mentorlugu_question_1
						:"",
				proje_mentorlugu_question_2: 
					req.body.proje_mentorlugu_question_2?
						req.body.proje_mentorlugu_question_2
						:"",
				proje_mentorlugu_question_3: 
					req.body.proje_mentorlugu_question_3?
						req.body.proje_mentorlugu_question_3
						:"",
				akademik_ve_kariyer_mentorlugu_question_1: 
					req.body.akademik_ve_kariyer_mentorlugu_question_1?
						req.body.akademik_ve_kariyer_mentorlugu_question_1
						:"",
				akademik_ve_kariyer_mentorlugu_question_2: 
					req.body.akademik_ve_kariyer_mentorlugu_question_2?
						req.body.akademik_ve_kariyer_mentorlugu_question_2
						:"",
				girisimcilik_mentorlugu_question_1: 
					req.body.girisimcilik_mentorlugu_question_1?
						req.body.girisimcilik_mentorlugu_question_1
						:"",
				girisimcilik_mentorlugu_question_2: 
					req.body.girisimcilik_mentorlugu_question_2?
						req.body.girisimcilik_mentorlugu_question_2
						:"",
				girisimcilik_mentorlugu_question_3: 
					req.body.girisimcilik_mentorlugu_question_3?
						req.body.girisimcilik_mentorlugu_question_3
						:"",
				akran_mentorlugu_question_1: 
					req.body.akran_mentorlugu_question_1?
						req.body.akran_mentorlugu_question_1
						:"",
				akran_mentorlugu_question_2: 
					req.body.akran_mentorlugu_question_2?
						req.body.akran_mentorlugu_question_2
						:""
			});

			mentoring_process_detailed_information.save();
		}

		return res.send({
			success: true,
			data: mentoring_process_detailed_information.dataValues
		})

	} catch (error) {
		console.log("ERROR: ",error)
		return res.json({
			success: false,
			error: true,
			err: await error
		})
	}
})

export default apiRouter;