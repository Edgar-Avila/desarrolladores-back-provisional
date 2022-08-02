
import { Router } from "express";
import { createProgrammingLanguage, deleteProgrammingLanguage, getProgrammingLanguage,
         getProgrammingLanguages, updateProgrammingLanguage } from "../controllers/programmingLanguage";

const router = Router();

router.post('/', createProgrammingLanguage);
router.get('/', getProgrammingLanguages);
router.get('/:id', getProgrammingLanguage);
router.delete('/:id', deleteProgrammingLanguage);
router.put('/:id', updateProgrammingLanguage);

export default(router);