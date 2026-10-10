import './config/database';
import app from './app';

const port = Number(process.env.PORT) || 8000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Octofit API listening on port ${port}`);
});