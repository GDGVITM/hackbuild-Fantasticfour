CREATE TABLE branch (
    branch_id INT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL
);

CREATE TABLE subject (
    subject_id INT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    branch_id INT,
    sem INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

CREATE TABLE quiz (
    quiz_id INT PRIMARY KEY,
    quiz_data JSON NOT NULL
);

CREATE TABLE user_subject (
    uid INT,
    subject_id INT,
    PRIMARY KEY (uid, subject_id),
    FOREIGN KEY (uid) REFERENCES login(uid),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE student_subject (
    student_id UUID,
    subject_id INT,
    attendance DECIMAL(5,2) DEFAULT 0.00,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES login(uid),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);
