// src/components/Login/Login.jsx
import React, { useContext } from "react";
import { TranslatorContext } from "../../contexts/TranslatorContext";
import translations from "../Login/LoginTranslations.json";
import { TextField, Button, Typography } from "@mui/material";
// Define a type for translations object if needed
interface translations {
  [key: string]: string;
}

function Login() {
  const context = useContext(TranslatorContext);

  if (!context) {
    return <p>Error: TranslatorContext not available.</p>;
  }

  const { language, setLanguage } = context;
const t = (translations as Record<string, translations>)[language] || {};
  if (!t) {
    return <div>Error: Translations not found for the selected language.</div>;
  }

  return (
    <div>
      <Typography variant="h4">{t["Login"]}</Typography>
      <form>
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
    </div>
  );
}

export default Login;
