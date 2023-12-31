import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

type User = {
  name: string;
  email: string;
  userName: string;
  contactNumber: string;
};
const ProfileCard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const { user } = useAuth();
  const fetchUser = async () => {
    const response = await fetch(`/api/users/${user?.userId}`);
    if (response.ok) {
      const { mesage, user } = await response.json();
      setUserDetails(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-full mt-10 border rounded-lg bg-gray-50">
      <div className="flex items-center w-full p-4">
        <img
          className="object-cover w-20 h-20 border-2 border-gray-300 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Placeholder"
        />
        <div className="flex flex-col ml-4">
          <div className="flex items-center mt-1">
            <p className="text-lg font-semibold text-gray-800">{userDetails?.name}</p>
          </div>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-600">{userDetails?.email}</p>
          </div>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-600">{userDetails?.contactNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
