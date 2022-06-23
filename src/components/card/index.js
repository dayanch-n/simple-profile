const Card = ({ children, width }) => {
  return (
    <div
      className={`bg-white shadow-md border w-${width} border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700`}
    >
      {children}
    </div>
  );
};

export default Card;