
import { Router } from "express";
import { createProgrammingLanguage, deleteProgrammingLanguage, getProgrammingLanguage,
         getProgrammingLanguages, updateProgrammingLanguage } from "../controllers/programmingLanguage";

const router = Router();

router.post('/programming-languages', createProgrammingLanguage);
router.get('/programming-languages', getProgrammingLanguages);
router.get('/programming-languages/:id', getProgrammingLanguage);
router.delete('/programming-languages/:id', deleteProgrammingLanguage);
router.put('/programming-languages/:id', updateProgrammingLanguage);

export default(router);