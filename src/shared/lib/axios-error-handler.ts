export const handleAxiosError = (error: unknown, message: string) => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: { data?: { message?: string } };
    };
    return axiosError.response?.data?.message || message;
  }
  return message;
};
