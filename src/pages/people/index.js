import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const People = () => {
  const [people, setPeople] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const [loadingPeople, setLoadingPeople] = useState(true);

  useEffect(() => {
    getAllPeople();
  }, []);

  const getAllPeople = async () => {
    const user = localStorage.getItem("user");
    const convertUser = JSON.parse(user);

    if (convertUser) {
      setCurrentUser(convertUser);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8100/people/${convertUser._id}`
        );
        setPeople(data);
        setLoadingPeople(false);
      } 
      catch (err) {
        toast.error("Could not fetch the data.")
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center space-y-6">
      <div className="flex justify-between items-center w-1/2 border-b-2 pb-4 px-2 border-b-slate-200 rounded">
        <h3 className="text-2xl">People</h3>
        {currentUser && (
          <div className="flex items-center overflow-hidden justify-center border-blue hover:bg-blue h-12 w-12 cursor-pointer flex-col rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-grey">
            <img
              className="object-cover"
              src={`data:image/png;base64, ${currentUser.photo}`}
              alt="user profile"
              onClick={() => navigate("/account")}
            />
          </div>
        )}
      </div>

      {!loadingPeople ? (
        people.length > 0 &&
        people.map((person, index) => {
          return (
            <div
              key={index}
              className="flex flex-row w-1/2 space-x-6 items-center bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center overflow-hidden justify-center border-blue hover:bg-blue h-28 w-28 cursor-pointer flex-col rounded-full border bg-white uppercase tracking-wide shadow-lg hover:text-grey">
                <img
                  className="object-cover"
                  src={`data:image/png;base64, ${person.photo}`}
                  alt="user profile"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <p className="text-md">Name: {person.name}</p>
                <p className="text-md">Age: {person.age}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center ">
          <div className="w-14 h-14 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
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

export default People;
