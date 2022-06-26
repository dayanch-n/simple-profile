import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Input from "../../components/input";

const Account = () => {
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

  const onEditPhoto = () => {};

  return (
    <div className="flex flex-col h-full w-full items-center space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        My Account
      </h3>
      <div className="bg-white shadow-md border w-1/2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                    name="photo"
                    type="file"
                    className="hidden"
                    onChange={onEditPhoto}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Email
              </label>
              <Input
                disabled={true}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Name
              </label>
              <Input
                placeholder="Name"
                type="text"
                name="name"
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
                placeholder="*******"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-full items-end justify-end">
            <Button width="50" type="submit">Update Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
