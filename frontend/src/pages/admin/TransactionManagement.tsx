import AdminHeader from "../../components/admin/AdminHeader";
import Spinner from "../../components/ui/Spinner";
import { useFetchTransactions } from "../../hooks/useFetchtransactions";

const TransactionManagement = () => {
  const { approvals, adminApproval, loading } = useFetchTransactions();

  const approveTransaction = (approvalId: string) => {
    adminApproval(approvalId);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full h-screen px-10 py-8 bg-white">
        <AdminHeader />
        <hr className="mb-8" />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold">Transaction Management</h2>
            <p className="mt-1 text-sm text-gray-700">
              Here, you'll find a list of pending transactions awaiting approval. Take action!
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden border rounded-lg">
            <thead className="p-2 mb-4 text-sm font-semibold text-left bg-gray-200">
              <tr>
                <th className="px-3 py-2 border-b-2 border-gray-300">Approval ID</th>
                <th className="px-3 py-2 border-b-2 border-gray-300">User</th>
                <th className="px-3 py-2 border-b-2 border-gray-300">Book</th>
                <th className="px-3 py-2 border-b-2 border-gray-300">Status</th>
                <th className="px-3 py-2 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {approvals.map((approval) => (
                <tr key={approval.id}>
                  <td className="px-3 py-2 border-b border-gray-300">{approval.id}</td>
                  <td className="px-3 py-2 border-b border-gray-300">{approval.userName}</td>
                  <td className="px-3 py-2 border-b border-gray-300">{approval.bookName}</td>
                  <td className="px-3 py-2 border-b border-gray-300">{approval.status}</td>
                  <td className="px-3 py-2 border-b border-gray-300">
                    {approval.status === "Pending" && (
                      <button
                        className="px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        onClick={() => approveTransaction(approval.id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionManagement;
