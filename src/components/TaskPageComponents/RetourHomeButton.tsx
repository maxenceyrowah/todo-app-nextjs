const ReturnHomeButton = ({
  handleReturnHome,
  theme,
}: {
  handleReturnHome: () => void;
  theme: string;
}) => {
  return (
    <button
      onClick={handleReturnHome}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-fit ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
          : theme === "pastel"
          ? "bg-white/80 hover:bg-white text-purple-700 hover:text-purple-800"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
      } shadow-sm hover:shadow-md`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      Retour
    </button>
  );
};

export default ReturnHomeButton;
