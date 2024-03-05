"use client";

import { UserSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserSchema>) {
    try {
      setLoading(true);
      const resp = await authenticate({
        email: values.email,
        password: values.password,
      });
      if (resp.type === "error") {
        form.setError("root", { message: resp.message });
      }
    } catch (err) {
      form.setError("root", { message: JSON.stringify(err) });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-[400px] border-2 border-slate-50 p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="text-sm underline mt-3">
        <Link href="/signup" className=" hover:bg-black hover:text-white p-1">
          Sign Up?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
