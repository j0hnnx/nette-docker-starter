CREATE TABLE todos (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       text VARCHAR(255) NOT NULL,
                       done TINYINT(1) DEFAULT 0,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);