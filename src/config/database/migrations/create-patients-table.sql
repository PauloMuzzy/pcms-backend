CREATE TABLE patients (
    uuid CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    gender_id INT NOT NULL,
    profession_id INT NOT NULL,
    phone CHAR(11) NOT NULL,
    emergency_contact_name VARCHAR(100) NOT NULL,
    emergency_contact_phone CHAR(11) NOT NULL,
    emergency_contact_relationship_id INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_cpf (cpf),
    INDEX idx_email (email),
    FOREIGN KEY (gender_id) REFERENCES genders(id),
    FOREIGN KEY (profession_id) REFERENCES professions(id),
    FOREIGN KEY (emergency_contact_relationship_id) REFERENCES relationships(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;