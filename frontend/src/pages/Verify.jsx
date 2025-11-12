import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../main";
import Loding from "../Loding";

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  async function verifyUser() {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify/${params.token}`
      );
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
          <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">
              Account Verification
            </h1>
            <p className="text-gray-600 mb-6">
              We’re verifying your account token. Once verified, you’ll be able
              to access all features of the application.
            </p>

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-6 py-4 rounded-lg shadow-sm mb-6">
                <p className="text-lg font-medium">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg shadow-sm mb-6">
                <p className="text-lg font-medium">{errorMessage}</p>
              </div>
            )}

            {(successMessage || errorMessage) && (
              <button
                onClick={() => navigate("/login")}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Go to Login
              </button>
            )}

            <p className="text-sm text-gray-500 mt-6">
              Thank you for being a part of our platform 💜. <br />
              If you face any issue, please contact support.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Verify;
