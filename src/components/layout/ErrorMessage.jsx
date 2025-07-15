const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 text-xl mb-4">Error Loading Article</div>
        <p className="text-gray-600 mb-4">{message}</p>
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;