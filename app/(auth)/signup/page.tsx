import SignupForm from "@/components/SignupForm";
import SubmitBtn from "@/components/SubmitBtn";
import { signUp } from "@/lib/actions";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-pink-100">
      <SignupForm />
    </div>
  );
};

export default SignUp;
