import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Approval } from "../types/Approval";

export const useFetchTransactions = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [transactions, setTransactions] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingTransactions = async () => {
    try {
      const response = await fetch("/api/transaction/pending");
      if (!response.ok) {
        throw new Error("Failed to fetch pending transactions");
      }
      const { formattedApprovals, message } = await response.json();

      if (formattedApprovals) {
        setApprovals(formattedApprovals);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch pending transactions");
      toast.error(error.message || "Failed to fetch pending transactions");
    } finally {
      setLoading(false);
    }
  };

  const adminApproval = async (id: string) => {
    try {
      const response = await fetch(`/api/transaction/approve/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to approve transaction");
      }
      const { message } = await response.json();
      setApprovals((prevApprovals) => prevApprovals.filter((approval) => approval.id !== id));

      toast.success(message);
    } catch (error: any) {
      setError(error.message || "Failed to approve transaction");
      toast.error(error.message || "Failed to approve transaction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  return { adminApproval, transactions, loading, approvals, error };
};
