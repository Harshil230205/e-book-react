import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import UploadBook from "./pages/UploadBook";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/AdminLogin";
import ApproveBooks from "./pages/ApproveBooks";
import UsersList from "./pages/UserList";
import Books from "./pages/Books";

const ProtectedRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const auth = localStorage.getItem("bookToken");
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/admin/login";

  return (
    <>
      <Toaster position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/book-list" element={<ApproveBooks />} />
        <Route path="/admin/uesr-list" element={<UsersList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="/books/upload"
          element={
            <ProtectedRoute auth={auth}>
              <UploadBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
