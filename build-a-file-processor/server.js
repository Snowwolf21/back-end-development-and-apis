// Starter file — add your code here
const http = require('http');
const fs = require('fs');
const fsPromises = require('fs/promises');  
const path = require('path');
console.log(fs);

const data = fs.readFile('assets/poem.txt', {
    encoding: 'utf8',
}, (err, data) => {
    console.log(data);
});

async function main () {
    const data = await fsPromises.readFile('assets/poem.txt', {
        encoding: 'utf8',
    });
    console.log(data);
} 

main();

const writeFile = fs.writeFileSync('assets/output.txt', "Hello, freeCodeCamp!");
console.log(writeFile);

const appendFile = fs.appendFileSync('assets/output.txt', "\nHello, freeCodeCamp!");
console.log(appendFile);

const exists = fs.existsSync('assets/output.txt');
console.log(exists);

const readdirSync = fs.readdirSync('assets');
console.log(readdirSync);

const unlink = fs.unlinkSync('assets/output.txt');
console.log(unlink);

const buf = Buffer.from('Hello, Node!');
console.log(buf);
const hexString = buf.toString('hex');
const base64String = buf.toString('base64');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));
const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2);

const decoded = Buffer.from('ZnJlZUNvZGVDYW1w', 'base64').toString('utf8');
console.log(decoded);

const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('freeCodeCamp!').digest('hex');
console.log(hash);

const randomByte = crypto.randomBytes(16).toString('hex');
console.log(randomByte);
const uuid = crypto.randomUUID();
console.log(uuid);

const os = require('os');
console.log(os.platform());
console.log(os.arch());
console.log(os.hostname());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());
console.log(os.cpus().length);


const filePath = path.join(__dirname, 'assets', 'poem.txt');
console.log(filePath);
console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.join('assets', '..', 'server.js'));
console.log(path.resolve('assets', '..', 'server.js'));
console.log(path.parse(filePath));

console.log(process.version);
console.log(process.platform);
console.log(process.env);
console.log(process.env.NODE_ENV)

console.log(process.argv);
const stdOut = process.stdout.write('Hello from stdout\n');
const stdErr = process.stderr.write('Hello from stderr\n');

console.log(stdOut);
console.log(stdErr);

const readAble = fs.createReadStream('assets/poem.txt', {
    encoding: 'utf8'
});

readAble.on('data', (chunk) => {
    console.log(chunk);
})
readAble.on('end', () => {
    console.log('Done reading');
});

const writeAble = fs.createWriteStream('assets/stream-output.txt');
console.log(writeAble.write("First chunk\n"));
console.log(writeAble.write("Second chunk\n"));
console.log(writeAble.end());

const readAble2 = fs.createReadStream('assets/poem.txt');
const writeAble2 = fs.createWriteStream('assets/stream-output.txt');

readAble2.pipe(writeAble2);