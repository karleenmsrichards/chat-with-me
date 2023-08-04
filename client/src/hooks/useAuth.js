import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  function handleSignUp() {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }

  function handleSignOut() {
    localStorage.removeItem("jwtToken");
    setUser(null);
    navigate("/");
  }

  function handleCallbackResponse(response) {
    if (response && response.credential) {
      let userObject = jwtDecode(response.credential);
      console.log(userObject);

      setShowSignUpForm((prev) => true);
      // localStorage.setItem("jwtToken", response.credential);
      // setUser(userObject);
      // navigate("/dashboard");
    } else {
      console.error("Error handling callback response:", response);
    }
  }

  useEffect(() => {
    async function fetchClientId() {
      try {
        const response = await axios.get("http://localhost:3001/clientId");
        const { clientId } = response.data;
        setClientId(clientId);
      } catch (error) {
        console.error("Error fetching client ID:", error);
      }
    }
    fetchClientId();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token !== null && token !== "") {
      const userObject = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (userObject.exp > currentTime) {
        function verifyToken() {
          axios
            .post(
              "http://localhost:3001/verifyToken",
              { email: userObject.email, name: userObject.name },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                setUser(userObject);
                navigate("/dashboard");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        verifyToken();
      } else {
        localStorage.removeItem("jwtToken");
        setUser(null);
      }
    }
  }, [navigate]);

  return { user, handleSignUp, showSignUpForm, handleSignOut };
};

export default useAuth;
