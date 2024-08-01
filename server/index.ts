/**
 * The server is for the Book Store project
 * @author AlbanyCanCode
 */
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\nYour server is running on http://localhost:${PORT}/`);
  console.log(`\nPress ctrl+c to stop\n`);
});
