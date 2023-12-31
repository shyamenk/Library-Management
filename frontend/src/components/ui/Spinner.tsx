const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/80 bg-opacity-70">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 border-8 border-dashed rounded-full border-brand animate-spin"></div>
        <span className="text-white">Loading</span>
      </div>
    </div>
  );
};

export default Spinner;
