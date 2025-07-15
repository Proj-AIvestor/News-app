const ArticleContent = ({ content }) => {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return (
    <div className="text-lg text-gray-800 leading-relaxed space-y-6">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default ArticleContent;