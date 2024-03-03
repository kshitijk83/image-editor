"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// import { signIn } from '@/auth'

class UsersList {
  list: Array<any>;
  constructor() {
    this.list = [
      {
        email: "a@a.com",
        password: "1234",
      },
    ];
  }

  add({ email, password }) {
    this.list.push({
      email,
      password,
    });
  }

  getUser({ email, password }) {
    const user = this.list.find(
      (item) => email === item.email && item.password === password
    );

    return user;
  }
}

const userList = new UsersList();

const timer = async (value) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(0);
    }, value);
  });
};

export async function authenticate(formData: FormData) {
  try {
    await timer(2000);
    const email = formData.get("email");
    const password = formData.get("password");
    const user = userList.getUser({ email, password });
    if (!user) {
      return {
        type: "error",
        message: "no user found",
      };
    }
    const encryptedText = `${email}-${password}`;
    cookies().set("token", encryptedText, {
      httpOnly: true,
      secure: false, // only for development for now
      maxAge: 60 * 60 * 24, // One week
    });
    redirect("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  cookies().set("token", "", { maxAge: 0 });
  redirect("/login");
}

export async function signUp(formData: FormData) {
  await timer(2000);
  const email = formData.get("email");
  const password = formData.get("password");
  userList.add({ email, password });
  const encryptedText = `${email}-${password}`;
  cookies().set("token", encryptedText, {
    httpOnly: true,
    secure: false, // only for development for now
    maxAge: 60 * 60 * 24, // One week
  });
  redirect("/dashboard");
}
