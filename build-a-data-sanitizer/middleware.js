import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const publicDirectory = fileURLToPath(new URL('./public', import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export function inputCleaner(req, res, next) {
  if (typeof req.body?.username === 'string') {
    req.body.username = req.body.username.toLowerCase();
  }
  if (typeof req.body?.comment === 'string') {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, '');
  }
  next();
}

export function inputValidator(req, res, next) {
  if (typeof req.body?.username === 'string' && req.body.username.length >= 3) {
    return next();
  }
  return res.redirect(
    '/form?error=Username%20must%20be%20at%20least%203%20characters.',
  );
}

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  res.sendFile('index.html', { root: publicDirectory });
});

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.status(200).json({
    username: req.body.username,
    comment: req.body.comment
  });
});


 if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
 
