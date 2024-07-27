CREATE TABLE users (
    uuid CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    access_type_id INT NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active TINYINT(1) NOT NULL DEFAULT 1,
    INDEX idx_name (name),
    INDEX idx_cpf (cpf),
    INDEX idx_email (email),
    FOREIGN KEY (access_type_id) REFERENCES access_types(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;