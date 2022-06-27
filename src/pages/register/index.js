/* eslint-disable no-useless-escape */
import axios from "axios";
import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../components/button";
import Card from "../../components/card";
import DatePicker from "../../components/date-picker";
import Input from "../../components/input";
import getBase64 from "../../helpers/base64";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    photo: "",
  });
  const [error, setError] = useState();
  const ref = createRef();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      formData.email
    );
    if (!emailFormat) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      await axios.post("http://localhost:8100/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      reset({
        name: "",
        email: "",
        password: "",
        gender: "Choose",
        dob: "",
      });
      toast.success("Registered Successfully");
      setFormData((prev) => ({ ...prev, photo: "" }));
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed")
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevItems) => ({ ...prevItems, [name]: value }));
  };

  const onUploadPhoto = async (event) => {
    const file = event.target.files[0];
    const baseURL = await getBase64(file);
    if (baseURL) {
      const url = baseURL.split(",")[1];
      setFormData((prevItems) => ({ ...prevItems, photo: url }));
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Sign in to our account
      </h3>
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full items-center justify-center">
            <div className="flex items-center overflow-hidden justify-center border-blue hover:bg-blue h-28 w-28 cursor-pointer flex-col rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-grey">
              {formData.photo ? (
                <img
                  className="object-cover"
                  src={`data:image/png;base64, ${formData.photo}`}
                  alt="user profile"
                />
              ) : (
                <label className="text-blue upparcase">
                  <span style={{ fontSize: "0.60rem" }} className="mt-2">
                    Upload Photo
                  </span>
                  <input
                    {...register("photo", {
                      required: "Please select photo",
                    })}
                    name="photo"
                    type="file"
                    className="hidden"
                    onChange={onUploadPhoto}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Name
              </label>
              <Input
                {...register("name", {
                  required: "Please insert your name",
                })}
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleInputChange}
              />
            </div>
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
                placeholder="******"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row items-center justify-between space-x-2">
              <div className="w-1/2">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Gender
                </label>
                <select
                  {...register("gender", {
                    required: "Please choose gender",
                  })}
                  name="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleInputChange}
                >
                  <option defaultValue>Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Date of birth
                </label>
                <DatePicker
                  ref={ref}
                  {...register("dob", {
                    required: "Please insert your name",
                  })}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <Button
            ref={ref}
            disabled={Object.values(formData).every(Boolean) ? false : true}
            type="submit"
          >
            Register
          </Button>
        </form>
      </Card>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
