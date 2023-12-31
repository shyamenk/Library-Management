import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

const useUserTransaction = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user?.userId) {
          const response = await fetch(`/api/users/${user.userId}/transactions`);
          if (!response.ok) {
            toast.error("Failed to fetch transactions");
          } else {
            const data = await response.json();
            setTransactions(data);
          }
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch transactions");
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.userId]);

  return { transactions, loading, error };
};

export default useUserTransaction;
