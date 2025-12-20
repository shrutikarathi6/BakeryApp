export const DEV_OTP = "123456";

export function verifyOtp(otp: string) {
  return otp === DEV_OTP;
}
