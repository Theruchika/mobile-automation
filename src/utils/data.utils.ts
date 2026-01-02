import axios from "axios";

/**
 * Generates a random email using the current timestamp.
 */
export const getRandomEmail = (): string => {
  const email = `testuser${Date.now()}@yopmail.com`;
  console.log("Generated email:", email);
  return email;};

/**
 * Generates a random number string of the specified length.
 */
export const getRandomNumber = (length: number): string => {
  return Math.random().toString().slice(2, 2 + length);
};


/**
 * Fetches the latest OTP for the given email address.
 */

export const fetchLatestOtp = async (
  email: string,
  timeout = 10000
): Promise<string> => {
  try {
    const response = await axios.post(
      "https://otp-getlatestotp-7ywrdjldlq-uc.a.run.app",
      { email },
      { timeout }
    );

    const { success, data, message } = response.data;
    if (success && data?.otp) {
        console.log("Fetched OTP for", email, ":", data.otp);
      return data.otp;
    }
    throw new Error(`Failed to get OTP: ${message ?? "Unknown error"}`);
  } catch (error: any) {
    throw new Error(`Error fetching OTP: ${error.message}`);
  }
};
