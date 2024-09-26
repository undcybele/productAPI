import express, {Router} from 'express';
import cors from 'cors';

const app = express();
const port = 4040;

app.use(cors()); // Enable CORS

app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});