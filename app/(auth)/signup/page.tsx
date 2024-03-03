import SubmitBtn from "@/components/SubmitBtn";
import { signUp } from "@/lib/actions";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <form action={signUp} className="flex gap-2 flex-col align-top w-[400px]">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <SubmitBtn>SignUp</SubmitBtn>
      <Link href="/login">Login</Link>
    </form>
  );
};

export default SignUp;
