"use client";
import { useState, useEffect } from "react";
import styles from "./usersAccounts.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || userInfo.email !== process.env.NEXT_PUBLIC_ADMIN_USER) {
      router.push("/");
      toast.error("You are not authorized to access this page");
      return;
    }

    async function fetchUsers() {
      try {
        // Replace with your actual API call
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router]);

  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter users by search term
  const filteredUsers = sortedUsers.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const handleEditUser = (userId) => {
    // Implement edit functionality
    router.push(`/admin/users/edit/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading users...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>
                Name {getSortIndicator("name")}
              </th>
              <th onClick={() => requestSort("email")}>
                Email {getSortIndicator("email")}
              </th>
              <th onClick={() => requestSort("role")}>
                Role {getSortIndicator("role")}
              </th>
              <th onClick={() => requestSort("createdAt")}>
                Joined {getSortIndicator("createdAt")}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      {/* <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.name}
                        className={styles.avatar}
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      /> */}
                      <span>{user.name || "N/A"}</span>
                    </div>
                  </td>
                  <td>{user.email || "N/A"}</td>
                  <td>
                    <span
                      className={`${styles.roleBadge} ${
                        styles[user.role?.toLowerCase()] || ""
                      }`}
                    >
                      {user.role || "N/A"}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        user.active ? styles.active : styles.inactive
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditUser(user.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noResults}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.activePage : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
