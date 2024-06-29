import express, { json, urlencoded } from 'express';
import routes from './routes.js';

const app = express();

app.use(json())
app.use(urlencoded({ extended: false }))

app.use(routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})