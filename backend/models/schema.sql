
// backend/models/schema.sql

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user', -- 'admin' or 'user',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    price REAL,
    category TEXT,
    description TEXT,
    stock_quantity INTEGER DEFAULT 0
);

CREATE TABLE stock_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  user_id INTEGER,
  change INTEGER, -- + for added, - for shipped
  note TEXT,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  user_id INTEGER,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE event_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  method TEXT,
  url TEXT,
  status_code INTEGER,
  user_id INTEGER,
  ip_address TEXT,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


