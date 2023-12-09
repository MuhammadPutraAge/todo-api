import { ResultFactory, validationResult } from "express-validator";

const customValidationResult: ResultFactory<string> =
  validationResult.withDefaults({
    formatter: (err) => err.msg,
  });

export default customValidationResult;
