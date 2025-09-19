import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const verifyToken = async (accessToken) => {
  return axios.post(
    `${BACKEND_URL}/login/verify-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
