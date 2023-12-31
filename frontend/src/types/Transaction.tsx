export type TransactionDetails = {
  _id: string;
  dueDate: string;
  transactionType: string;
  book: {
    name: string;
  };
};
