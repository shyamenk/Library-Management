import ProfileCard from "../components/profile/ProfileCard";
import TransactionViewTable from "../components/profile/TransactionViewTable";
import useUserTransaction from "../hooks/useUserTransaction";

const UserProfilePage = () => {
  const { transactions } = useUserTransaction();

  return (
    <>
      <section className="w-full px-16 py-4 mx-auto mt-6 max-w-7xl">
        <div className="flex flex-col mb-6 space-y-4 md:gap-4 md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">User Profile</h2>
            <p className="mt-1 text-sm text-gray-700">
              User profile details. You can view and manage your account information below.
            </p>
          </div>

          <ProfileCard />
        </div>
        <h2 className="text-lg font-semibold">User Transaction</h2>
        <p className="mt-1 text-sm text-gray-700">
          User Transaction details. You can view and manage your account information below.
        </p>
        <TransactionViewTable transactions={transactions} />
      </section>
    </>
  );
};

export default UserProfilePage;
