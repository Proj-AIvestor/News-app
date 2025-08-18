const ArticleThumbnail = ({ thumbnailUrl, title }) => {
  return (
    <div className="w-full bg-gray-200 mb-8 rounded-lg">
      <img 
        src={thumbnailUrl} 
        alt={title}
        className="w-full h-auto rounded-lg shadow-md object-contain"
      />
    </div>
  );
};
export default ArticleThumbnail;