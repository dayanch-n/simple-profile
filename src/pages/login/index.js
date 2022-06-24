/* eslint-disable no-useless-escape */
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/button";
import Card from "../../components/card";
import Input from "../../components/input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      formData.email
    );
    if (!emailFormat) {
      setError("Please enter a valid email address");
      return;
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevItems) => ({ ...prevItems, [name]: value }));
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Sign in to our account
      </h3>
      <Card width="100">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Email
              </label>
              <Input
                {...register("email", {
                  required: "Please insert your email",
                })}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                New Password
              </label>
              <Input
                {...register("password", {
                  required: "Please insert new password",
                })}
                placeholder="*******"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button
            disabled={Object.values(formData).every(Boolean) ? false : true}
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
