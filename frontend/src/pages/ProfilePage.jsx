import AppLayout from "../layout/AppLayout";

import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {

  const { user } = useAuth();

  return (

    <AppLayout>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-10">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-black mb-8">
          Profile
        </h1>

        {/* User Details */}

        <div className="space-y-6 text-lg">

          <div>
            <p className="text-gray-500">
              Name
            </p>

            <h2 className="text-2xl font-semibold text-black">
              {user?.name}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Username
            </p>

            <h2 className="text-2xl font-semibold text-black">
              {user?.username}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>

            <h2 className="text-2xl font-semibold text-black">
              {user?.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Role
            </p>

            <h2 className="text-2xl font-semibold capitalize text-black">
              {user?.role}
            </h2>
          </div>

        </div>

      </div>

    </AppLayout>
  );
};

export default ProfilePage;