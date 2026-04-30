import { AuthButton } from "@/shared/ui/buttons/button-oauth";

const AppleIcon = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
    <path
      d="M13.173 9.545c-.02-2.19 1.79-3.254 1.872-3.308-1.02-1.49-2.607-1.695-3.17-1.717-1.347-.137-2.632.796-3.315.796-.682 0-1.733-.777-2.852-.756-1.46.022-2.81.852-3.562 2.159C.567 9.22 1.67 13.6 3.28 15.99c.79 1.168 1.733 2.48 2.971 2.432 1.192-.048 1.642-.774 3.082-.774 1.442 0 1.85.774 3.106.75 1.285-.022 2.097-1.19 2.882-2.362a11.35 11.35 0 001.308-2.739c-.03-.013-2.48-.95-2.456-3.752zM10.96 3.018C11.603 2.24 12.04 1.16 11.912 0c-.927.038-2.048.617-2.713 1.396-.596.689-1.118 1.79-.977 2.845.93.073 2.097-.473 2.737-1.223z"
      fill="currentColor"
    />
  </svg>
);
export const AppleAuth = () => {
  const handleAppleAuth = async () => {};

  return (
    <AuthButton
      icon={<AppleIcon />}
      label="Continue with Apple"
      onClick={handleAppleAuth}
      variant="apple"
    />
  );
};
