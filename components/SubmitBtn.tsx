"use client";

import { useFormStatus } from "react-dom";

function SubmitBtn({ children }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? "Loading..." : children}
    </button>
  );
}

export default SubmitBtn;
