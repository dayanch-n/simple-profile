import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");

  return (
    <div className="flex flex-col h-full w-full items-center justify-center space-y-6">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Page Not Found
      </h3>

      <div className="">
        <img width={400} src="/assets/404 Error-rafiki.svg" alt="404" />
        <Link fontSize="xs" href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </Link>
      </div>

      <div>
        <h4 className="pb-5 text-xl">It&apos;s Okay!</h4>
        <button onClick={handleBackToHome}>Let&apos;s Head Back</button>
      </div>
    </div>
  );
};

export default Page404;
