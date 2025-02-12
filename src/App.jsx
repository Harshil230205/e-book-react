import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import AdminNavbar from "./components/AdminNavbar";
import MyBooks from "./pages/MyBooks";

const ProtectedRoute = ({ children, auth, redirectTo }) => {
  return auth ? children : <Navigate to={redirectTo} />;
};

const AppContent = () => {
  const auth = localStorage.getItem("bookToken");
  const adminAuth = localStorage.getItem("adminBookToken");
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const showNavbar = !["/login", "/signup", "/admin/login"].includes(
    location.pathname
  );

  return (
    <>
      <Toaster position="top-right" />
      {showNavbar && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/book-list"
          element={
            <ProtectedRoute auth={adminAuth} redirectTo="/admin/login">
              <ApproveBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user-list"
          element={
            <ProtectedRoute auth={adminAuth} redirectTo="/admin/login">
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="/books/upload"
          element={
            <ProtectedRoute auth={auth} redirectTo="/login">
              <UploadBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/my-books"
          element={
            <ProtectedRoute auth={auth} redirectTo="/login">
              <MyBooks />
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
