import AdminHeader from "../../components/admin/AdminHeader";
import BookStatsContainer from "../../components/books/BookStatsContainer";
import { useFetchBooks } from "../../hooks/useFetchBooks";

const Dashboard = () => {
  const { books } = useFetchBooks();
  return (
    <div>
      <div className="w-full h-screen px-10 py-8 bg-white">
        <AdminHeader />
        <hr className="mb-8" />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold">Book Statistics</h2>
          </div>
        </div>
        <BookStatsContainer books={books} />
      </div>
    </div>
  );
};

export default Dashboard;
