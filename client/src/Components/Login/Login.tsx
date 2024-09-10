import React, { useContext, useState } from "react";
import { TranslatorContext } from "../../contexts/TranslatorContext";
import translations from "./LoginTranslations.json";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define a type for translations object if needed
interface Translations {
  [key: string]: string;
}

const Login = () => {
  const context = useContext(TranslatorContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!context) {
    return <p>Error: TranslatorContext not available.</p>;
  }

  const { language, setLanguage } = context;
  const t = (translations as Record<string, Translations>)[language] || {};

  if (!t) {
    return <div>Error: Translations not found for the selected language.</div>;
  }

  // Correctly type the event parameter
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signin", {
        username,
        password,
      });

      const { token } = response.data;
      // Save token to local storage or context
      localStorage.setItem("token", token);

      // Navigate to the dashboard after successful sign-in
      navigate("/bookshelf");
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Assuming your error response has a structure like this:
        const axiosError = err as { response?: { status: number } };
        if (axiosError.response && axiosError.response.status === 401) {
          setError("Unauthorized. Your username or password is incorrect.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">{t["Login"]}</Typography>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          |
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={() => setLanguage("es")}
          >
            Español
          </button>
          <TextField
            label={t["Username"]}
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            label={t["Password"]}
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {t["Login"]}
        </Button>
         <Button type="button" variant="contained" color="secondary"   onClick={() => navigate("/CreateAccount")}>
          Sign Up
        </Button>
        
        
        
       
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </div>
  );
};

export default Login;
