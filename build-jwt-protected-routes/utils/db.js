import path from "path";
import fs from "fs";


const DB_Path = path.join(import.meta.dirname, '../data/users.json');

export function readUsers() {
  try {
    const data = fs.readFileSync(DB_Path, 'utf-8').trim();
    if(!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users from database:', err);
    return [];
  }
}

export function writeUsers(users) {
  try {
    fs.writeFileSync(DB_Path, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users to database:', err);
  }
}       

export function findByEmail(email) {
  const users = readUsers();
  return users.find((user) => user.email === email) || null;
}

export function findById(id) {
  const users = readUsers();
  return users.find((user) => user.id === id) || null;
}

