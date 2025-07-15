const ArticleThumbnail = ({ thumbnailUrl, title }) => {
  return (
    <div className="w-full h-96 bg-gray-200 mb-8 overflow-hidden rounded-lg">
      <img 
        src={thumbnailUrl} 
        alt={title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};
export default ArticleThumbnail;