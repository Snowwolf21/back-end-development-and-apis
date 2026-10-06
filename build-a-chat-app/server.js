import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
	const isClientScript = req.url === '/script.js';
	const filePath = isClientScript ? './public/script.js' : './public/index.html';
	const contentType = isClientScript ? 'text/javascript' : 'text/html';

	fs.readFile(filePath, (error, content) => {
		if (error) {
			res.writeHead(500);
			res.end('Unable to load chat app');
			return;
		}

		res.writeHead(200, { 'Content-Type': contentType });
		res.end(content);
	});
});

const wss = new WebSocketServer({ server });

function broadcast(payload) {
	wss.clients.forEach((client) => {
		if (client.readyState === 1) {
			client.send(JSON.stringify(payload));
		}
	});
}

wss.on('connection', (socket, req) => {
	const username = new URL(req.url, 'http://localhost').searchParams.get('username');
	broadcast({ type: 'system', text: `${username} joined` });

	socket.on('message', (data) => {
		const message = data.toString();
		console.log(message);
		const { username: sender, text } = JSON.parse(message);
		broadcast({ type: 'chat', username: sender, text });
	});

	socket.on('close', () => {
		broadcast({ type: 'system', text: `${username} left` });
	});
});

server.listen(PORT, () => {
	console.log(`Chat server running at http://localhost:${PORT}`);
});
