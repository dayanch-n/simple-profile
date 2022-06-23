/* eslint-disable no-useless-escape */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Card from "../../components/card";
import DatePicker from "../../components/date-picker";
import Input from "../../components/input";

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
     <h3 class="text-2xl font-medium text-gray-900 dark:text-white">Sign in to our account</h3>
      <Card width="100">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex items-center justify-center">
            <label className="text-blue border-blue hover:bg-blue flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-grey">
              <span style={{fontSize: '0.60rem'}} className="mt-2">Upload Photo</span>
              <input name="photo" type="file" class="hidden" />
            </label>
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
                  placeholder="example@gmail.com"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>
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
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Date of birth
                  </label>
                  <DatePicker onSelect={handleInputChange} />
                </div>
              </div>
            </div>
          <Button width={"full"}>Register</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;