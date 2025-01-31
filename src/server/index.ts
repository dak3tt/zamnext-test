import 'dotenv/config';
import createApp from './app';

const PORT: number = parseInt(process.env.PORT || '5000', 10);
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});