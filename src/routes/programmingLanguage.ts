
import { Router } from "express";
import { createProgrammingLanguage, deleteProgrammingLanguage, getProgrammingLanguage,
         getProgrammingLanguages, updateProgrammingLanguage } from "../controllers/programmingLanguage";

const router = Router();

router.post('/ProgrammingLanguages', createProgrammingLanguage);
router.get('/ProgrammingLanguages', getProgrammingLanguages);
router.get('/ProgrammingLanguages/:id', getProgrammingLanguage);
router.delete('/ProgrammingLanguages/:id', deleteProgrammingLanguage);
router.put('/ProgrammingLanguages/:id', updateProgrammingLanguage);

export default(router);