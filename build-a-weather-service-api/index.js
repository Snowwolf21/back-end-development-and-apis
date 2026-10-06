import express from 'express';
import weatherRouter from './weather.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use('/api/weather', weatherRouter);

app.get('/api/info', (req, res) => {
  // Simulated weather data for demonstration purposes
 
  res.status(200).json({
    name: 'Weather Service API',
    version: '1.0.0',
    description: 'A simple weather service API that provides current weather information.',
    endpoints: [
  '/api/weather/:city',
   '/api/greet/:name', 
   '/api/data' 
    ]
    
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/api/status', (req, res) => {
  res.status(200).json({status: "ok"});
});

app.get('/docs', (req, res) => {
    res.redirect('/api/info');
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.status(200).json({ message: `Hello, ${name}! Welcome to the Weather Service API.`, 
   name: name});
});

app.route('/api/data').get((req, res) => {
  res.status(200).json({ message: 'This is a GET request to /api/data.' });
}).post((req, res) => {
  res.status(201).json({ message: 'This is a POST request to /api/data.' });
});

app.listen(PORT, () => {
  console.log(`Weather Service API is running on http://localhost:${PORT}`);
});