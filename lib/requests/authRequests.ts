import { instance } from "../instance";

export interface OtpRequestParams {
  phone: string;
}

export interface OtpResponse {
  success: boolean;
  retryDelay: number; 
}

export const postOtp = async ({ phone }: OtpRequestParams) => {
  const response = await instance.post<OtpResponse>('/auth/otp', { phone });
  return response.data;
};