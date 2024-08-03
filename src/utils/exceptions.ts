import { ZodIssue } from "zod";

export const NotFoundException = (message: string) => {
  return {
    error_message: message || "Not Found",
    status: 404,
  };
};

export const ZodIssueException = (errors: ZodIssue[]) => {
  return {
    errors,
    error_message: "Validation Error",
    status: 400,
  };
};
