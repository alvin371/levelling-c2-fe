export const getErrorStatus = (error: unknown) => {
  return error &&
    typeof error === "object" &&
    "status" in error &&
    typeof error.status === "number"
    ? error.status
    : 500;
};
