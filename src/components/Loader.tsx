
const Loader = () => {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[#193a70] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[#193a70] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-[#193a70] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};

export default Loader;
