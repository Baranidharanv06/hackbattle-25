"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { verifyToken } from "../api/user/route";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hackbattle-25.firebaseapp.com",
  projectId: "hackbattle-25",
  storageBucket: "hackbattle-25.appspot.com",
  messagingSenderId: "523134092665",
  appId: "1:523134092665:web:c1cc17fed967ad83ee1ba8",
  measurementId: "G-KE9DQEGDGG",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "vitstudent.ac.in",
  prompt: "select_account",
});

async function getUserContext(accessToken) {
  try {
    const res = await verifyToken(accessToken);

    const userStatus = res.data.status;
    localStorage.setItem("UserStatus", userStatus);
    localStorage.setItem("AccessToken", accessToken);

    if (userStatus === 0) {
      window.location.href = "/dashboard";
    } else if (userStatus === 1) {
      window.location.href = "/team";
    }
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("UserStatus");
    } else if (error.response?.status === 404) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("UserStatus");
    }
    console.error("Error verifying token:", error);
  }
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) throw new Error("No credentials found");

  const accessToken = credential.accessToken;
  await getUserContext(accessToken);

  return result.user;
}

export async function logout() {
  await signOut(auth);
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("UserStatus");
}
