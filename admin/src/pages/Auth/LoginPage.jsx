import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../apis/apis";

const LoginPage = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.emailOrMobile) {
      toast.error("Email/mobile is required");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(apis.auth.login, form);

      if (response?.data?.success) {
        if (response?.data?.data?.user?.role !== "admin") {
          toast.error("Unauthorized");
          navigate("/login");
        } else {
          storeToken(response?.data?.data?.token);
          toast.success(response?.data?.message || "Login successful");
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailOrMobile" className="form-label">Email or Mobile</label>
            <input
              type="text"
              className="form-control"
              id="emailOrMobile"
              name="emailOrMobile"
              value={form.emailOrMobile}
              onChange={handleChange}
              placeholder="Enter email or mobile"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
