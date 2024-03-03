import React from "react";
import { authenticate } from "../../../lib/actions";
import { useFormStatus } from "react-dom";
import SubmitBtn from "@/components/SubmitBtn";
import Link from "next/link";

function Login() {
  return (
    <form
      action={authenticate}
      className="flex gap-2 flex-col align-top w-[400px]"
    >
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <SubmitBtn>Login</SubmitBtn>
      <Link href="/signup">SignUp</Link>
    </form>
  );
}

export default Login;
