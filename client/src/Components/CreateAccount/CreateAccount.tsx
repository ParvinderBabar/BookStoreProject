import React, { useContext } from 'react';
import { TranslatorContext } from '../../contexts/TranslatorContext';
import translations from './CreateAccountTranslations.json';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

// Define a type for translations object if needed
interface Translations {
  [key: string]: string;
}

function CreateAccount() {
  const context = useContext(TranslatorContext);

  if (!context) {
    return <p>Error: TranslatorContext not available.</p>;
  }

  const { language, setLanguage } = context;
  const t = (translations as Record<string, Translations>)[language] || {};

  // Updated type for the event parameter
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t["Create a New Account"]}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t["It’s quick and easy."]}
      </Typography>

      {/* Language Selector */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          {/* Add more languages as needed */}
        </Select>
      </FormControl>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t["First Name"]}
              variant="outlined"
              fullWidth
              margin="normal"
              id="firstName"
              name="firstName"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t["Last Name"]}
              variant="outlined"
              fullWidth
              margin="normal"
              id="lastName"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t["Email"]}
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              id="email"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t["Password"]}
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              id="password"
              name="password"
            />
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ marginY: 2 }}>
          <small>
            {
              t[
                "By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time."
              ]
            }
          </small>
        </Typography>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t["Sign Up"]}
        </Button>
      </form>
    </Box>
  );
}

export default CreateAccount;
