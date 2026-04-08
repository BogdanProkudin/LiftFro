"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { User } from "./types";

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map((c) => c.name);
    const hasAccessToken = cookieStore.has("access_token");

    console.log("cookieNames", cookieNames);

    const allCookies = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const { data } = await axios.get<User>(
      `${process.env.BACKEND_API_URL}/auth/me`,
      {
        headers: {
          cookie: allCookies,
        },
      },
    );

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        return null;
      }
      console.error("Error fetching user:", error.message);
    }
    return null;
  }
}
