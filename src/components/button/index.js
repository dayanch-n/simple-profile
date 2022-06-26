const Button = (props) => {
  const { children, width='full' } = props
  return (
      <button
        {...props}
        className={`flex space-x-2 justify-center px-6 py-2.5 bg-blue-600 text-white font-medium w-${width} text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
        {...props}
      >
        {children}
      </button>
  );
};

export default Button;
