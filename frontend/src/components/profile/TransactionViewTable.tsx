import { format } from "date-fns";
import { TransactionDetails } from "../../types/Transaction";
import Table from "../ui/Table";

const TransactionViewTable: React.FC<{ transactions: TransactionDetails[] }> = ({
  transactions,
}) => {
  const columns = [
    {
      key: "_id",
      header: "ID",
      render: (transaction: TransactionDetails) => (
        <div className="text-sm font-medium text-gray-900">{transaction._id}</div>
      ),
    },
    {
      key: "book.name",
      header: "Book Name",
      render: (transaction: TransactionDetails) => (
        <div className="text-sm font-medium text-gray-900">{transaction.book.name}</div>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (transaction: TransactionDetails) => (
        <div className="text-sm text-gray-900 ">
          {format(new Date(transaction.dueDate), "MM/dd/yyyy")}
        </div>
      ),
    },
    {
      key: "transactionType",
      header: "Transaction Type",
      render: (transaction: TransactionDetails) => (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {transaction.transactionType.charAt(0).toUpperCase() +
            transaction.transactionType.slice(1)}
        </span>
      ),
    },
  ];

  return <Table data={transactions} columns={columns as any} />;
};

export default TransactionViewTable;
