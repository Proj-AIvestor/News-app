const SourceLink = ({ url, source }) => {
  return (
    <div className="mt-8 text-sm text-gray-600">
      <p>
        Full article available at: 
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline ml-1"
        >
          {source}
        </a>
      </p>
    </div>
  );
};

export default SourceLink;