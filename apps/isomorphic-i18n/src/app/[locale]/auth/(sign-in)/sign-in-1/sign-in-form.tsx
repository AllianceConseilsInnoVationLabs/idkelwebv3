"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { Checkbox, Password, Button, Input, Text } from "rizzui";
import { Form } from "@ui/form";
import { routes } from "@/config/routes";
import { loginSchema, LoginSchema } from "@/validators/login.schema";
import { useTranslations } from "next-intl";

const initialValues: LoginSchema = {
  email: "admin@admin.com",
  password: "admin",
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const t = useTranslations("form");
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
    signIn("credentials", {
      ...data,
    });
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register("rememberMe")}
                label="Remember Me"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button
              className="w-full"
              type="submit"
              size="lg"
            >
              <span>Sign in</span> <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        {t("form-dont-have-an-account")}{" "}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
