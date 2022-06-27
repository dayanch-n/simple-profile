import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import Button from "../../components/button";
import Input from "../../components/input";
import getBase64 from "../../helpers/base64";

const Account = () => {

  const initialState = {
    email: "",
    password: "",
    photo: "",
  }

  const [formData, setFormData] = useState(initialState);
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const convertUser = JSON.parse(user);
    if (convertUser) setCurrentUser(convertUser);
  }, []);

  const onSubmit = async () => {
  
    try {
      const { data } = await axios.put(
        `http://localhost:8100/account/${currentUser._id}`,
        {
          ...currentUser,
          name: formData.name ? formData.name : currentUser.name,
          password: formData.password ? formData.password : currentUser.password,
          photo: formData.photo ? formData.photo : currentUser.photo
        }
      );

      if (data) {
        console.log(data.user);
        setFormData({...initialState});
        setCurrentUser({...data.user})
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevItems) => ({ ...prevItems, [name]: value }));
  };

  const onEditPhoto = async (event) => {
    const file = event.target.files[0];
    const baseURL = await getBase64(file);
    if (baseURL) {
      const url = baseURL.split(",")[1];
      setFormData((prevItems) => ({ ...prevItems, photo: url }));
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        My Account
      </h3>
      <div className="bg-white shadow-md border w-1/2 border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full items-center justify-center space-y-2">
            <div className="flex items-center overflow-hidden justify-center border-blue hover:bg-blue h-28 w-28 cursor-pointer flex-col rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-grey">
              {formData.photo ? (
                <img
                  className="object-cover"
                  src={`data:image/png;base64, ${formData.photo}`}
                  alt="user profile"
                />
              ) : (
                currentUser && (
                  <img
                    className="object-cover"
                    src={`data:image/png;base64, ${currentUser.photo}`}
                    alt="user profile"
                  />
                )
              )}
            </div>
            <label
              style={{ fontSize: "0.60rem" }}
              className="border rounded p-1 hover:border-blue-200"
            >
              Change Photo
              <input
                name="photo"
                type="file"
                className="hidden"
                onChange={onEditPhoto}
              />
            </label>
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
                defaultValue={currentUser && currentUser.email}
                style={{ color: "gray" }}
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
                defaultValue={currentUser && currentUser.name}
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
            <Button width="50" type="submit">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
