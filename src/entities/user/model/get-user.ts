"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { User } from "./types";

const BACKEND_URL = process.env.BACKEND_API_URL;

function buildCookieString(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): string {
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const allCookies = buildCookieString(cookieStore);

    const { data } = await axios.get<User>(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: allCookies },
    });

    return data ?? null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // access_token expired — middleware should have already refreshed it,
      // but if we still get 401 here, the session is truly invalid
      return null;
    }
    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
