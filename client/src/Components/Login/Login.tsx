import React, { useContext } from "react";
import { TranslatorContext } from "../../contexts/TranslatorContext";
import translations from "../Login/LoginTranslations.json";
import { TextField, Button, Typography, Link } from "@mui/material"; // Corrected import for Link
import { useNavigate } from "react-router-dom";

// Define a type for translations object if needed
interface Translations {
  [key: string]: string;
}

function Login() {
  const context = useContext(TranslatorContext);
  const navigate = useNavigate(); // Initialize useNavigate

  if (!context) {
    return <p>Error: TranslatorContext not available.</p>;
  }

  const { language, setLanguage } = context;
  const t = (translations as Record<string, Translations>)[language] || {};

  if (!t) {
    return <div>Error: Translations not found for the selected language.</div>;
  }

  // Correctly type the event parameter
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => { // Type the event as React.FormEvent
    e.preventDefault();
    // Add your authentication logic here, and if successful:
    navigate('/dashboard'); // Navigate to the dashboard page upon successful login
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
            label={t["Email"]}
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label={t["Password"]}
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {t["Login"]}
        </Button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="body2">
          {t["Don't have an account?"]}{" "}
          <Link href="/signup">{t["Sign up"]}</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
