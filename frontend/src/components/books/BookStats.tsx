interface BookStatsProps {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

const BookStats: React.FC<BookStatsProps> = ({ label, count, color, icon }) => {
  return (
    <div className="flex items-center justify-center p-4 space-x-2 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="font-semibold text-gray-500 text-md">{label}</h2>
      </div>
      <p className={`text-xl font-bold text-${color}`}>{count}</p>
    </div>
  );
};

export default BookStats;
