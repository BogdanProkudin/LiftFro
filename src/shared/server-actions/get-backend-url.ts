"use server";

export const getBackUrl = async () => {
  return process.env.BACKEND_API_URL || "http://localhost:8080";
};
