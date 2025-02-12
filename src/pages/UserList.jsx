import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { baseUrl } from "../baseUrl";

const UsersList = () => {
  const adminToken = localStorage.getItem("adminBookToken");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ page, limit: limit });
      const response = await fetch(
        `${baseUrl}/api/admin/users/getAll?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
        }
      );
      const data = await response.json();

      setUsers(data.users);
      setTotalPages(Math.ceil(data.totalPages / limit));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 text-gray-800">Name</th>
                <th className="text-left p-2 text-gray-800">Email</th>
                <th className="text-left p-2 text-gray-800">Admin Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-600">
                    Loading...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-2 text-gray-800">{user.name}</td>
                    <td className="p-2 text-gray-600">{user.email}</td>
                    <td className="p-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          user.isAdmin
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
