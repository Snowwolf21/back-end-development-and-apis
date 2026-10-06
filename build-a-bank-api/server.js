import express from 'express';
import {getAccounts, saveAccounts} from './db.js'
const app = express();
const PORT = 9000;
app.use(express.json());
app.set("json spaces", 2);

app.get('/', (req, res) => {
  res.send("Tiny Bank API (Express 5) running...");
});
app.get('/accounts', async (req, res, next) => {
 
    const accounts = await getAccounts();
    res.json(accounts);
   
})

app.get('/accounts/:id', async (req, res) => {
  const id = req.params.id;

    const accounts = await getAccounts();
    const account = accounts.find(acc => acc.id === parseInt(id));
    if (!account) {
      const err = new Error('Account not found');
      err.status = 404;
      throw err;
    } 
    res.json(account);
}); 

app.post('/transfer', async (req, res, next) => {
  const { fromId, toId, amount } = req.body;

    const accounts = await getAccounts();
    const sender = accounts.find(acc => acc.id === parseInt(fromId));
    const recipient = accounts.find(acc => acc.id === parseInt(toId));

    if (!fromId || !toId || !amount) {
      const err = new Error('400 Bad Request');
      err.status = 400;
      throw err;
    }

    if (amount <= 0) {
      const err = new Error('Transfer amount must be positive');
      err.status = 400;
      throw err;
    }

    if (!sender) {
      const err = new Error('Sender account not found');
      err.status = 404;
      throw err;
    }

    if (!recipient) {
      const err = new Error('Recipient account not found');
      err.status = 404;
      throw err;
    }

    if (sender.balance < amount) {
      const err = new Error('Insufficient funds');
      err.status = 409;
      throw err;
    }
    sender.balance -= amount;
    recipient.balance += amount;

    await saveAccounts(accounts);
    res.json({ message: 'Transfer successful' });
  
});
// app.get('/broken', (req, res, next) => {
//   const err = new Error('This is a broken route');
 
//   next(err);
// });
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage(),
  });
});
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  } });  
});
const server = app.listen(PORT, () => {
  console.log(`Tiny Bank API is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});