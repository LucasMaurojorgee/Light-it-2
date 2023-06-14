"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";

type formData = {
  name: string;
};

const UserSchema: z.ZodType<formData> = z.object({
  name: z.string().min(2),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSchema>> = (
    data: formData
  ) => console.log("IT WORKED", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="Lucas"
        {...register("name")}
        error={errors.name}
      />

      <button type="submit">submit</button>
    </form>
  );
};

export default UserForm;
