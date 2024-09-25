-- Drop the tables if they already exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS mentors;

-- Create the mentors table
CREATE TABLE IF NOT EXISTS mentors (
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    linkedin VARCHAR(255),
    about_me VARCHAR(500),
    photo VARCHAR(255) 
);

-- Create the languages table (connected to mentors by email, representing programming languages)
CREATE TABLE IF NOT EXISTS languages (
    email VARCHAR(255),
    programming_language VARCHAR(100),
    PRIMARY KEY (email, programming_language),
    FOREIGN KEY (email) REFERENCES mentors(email) ON DELETE CASCADE
);

-- Create the user table
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    userType VARCHAR(50) NOT NULL
);

-- Create the messages table
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender VARCHAR(255),
    recipient VARCHAR(255),
    message VARCHAR(500),
    FOREIGN KEY (sender) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (recipient) REFERENCES users(email) ON DELETE CASCADE
);

-- Insert data into the user table for the 20 female mentors - Passwords are identical 'password123' hashed using bcrypt
INSERT INTO users (email, password, userType) VALUES
('sara.smith@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),  
('emma.johnson@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'), 
('olivia.brown@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('ava.jones@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('isabella.garcia@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('mia.martinez@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('amelia.rodriguez@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('harper.hernandez@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('evelyn.lopez@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('abigail.moore@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('sofia.gonzalez@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('avery.hill@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('ella.scott@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('lily.green@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('chloe.adams@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('nora.baker@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('scarlett.nelson@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('aria.carter@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('hannah.mitchell@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('zoe.perry@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentor'),
('lucy.wilson@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentee'),
('grace.thomas@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentee'),
('ella.clark@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentee'),
('sophie.turner@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentee'),
('ruby.evans@example.com', '$2b$10$1uikHH/2gB66adnCHtbLge2OYyO8ot8KhDgx6qwQogg2RxLMgaFf2', 'mentee');

-- Insert 20 female mentors
INSERT INTO mentors (email, first_name, last_name, phone_number, linkedin, about_me, photo) VALUES
('sara.smith@example.com', 'Sara', 'Smith', '555-1234', 'https://linkedin.com/in/sara-smith', 'I am passionate about mentoring women in tech. I have over 10 years of experience in software development.', 'person1.svg'),
('emma.johnson@example.com', 'Emma', 'Johnson', '555-5678', 'https://linkedin.com/in/emma-johnson', 'I am a software engineer with expertise in Java. I enjoy helping others navigate the tech industry.', 'person2.svg'),
('olivia.brown@example.com', 'Olivia', 'Brown', '555-9101', 'https://linkedin.com/in/olivia-brown', 'I specialize in front-end development and have a passion for UI/UX design.', 'person3.svg'),
('ava.jones@example.com', 'Ava', 'Jones', '555-2345', 'https://linkedin.com/in/ava-jones', 'I am a Ruby developer with a focus on clean code and agile methodologies.', 'person4.svg'),
('isabella.garcia@example.com', 'Isabella', 'Garcia', '555-6789', 'https://linkedin.com/in/isabella-garcia', 'I love working with Python and machine learning. Excited to mentor the next generation of women in tech.', 'person5.svg'),
('mia.martinez@example.com', 'Mia', 'Martinez', '555-1122', 'https://linkedin.com/in/mia-martinez', 'I am a C++ developer with a deep interest in system-level programming.', 'person6.svg'),
('amelia.rodriguez@example.com', 'Amelia', 'Rodriguez', '555-3344', 'https://linkedin.com/in/amelia-rodriguez', 'I am passionate about full-stack development and love to explore new technologies.', 'person7.svg'),
('harper.hernandez@example.com', 'Harper', 'Hernandez', '555-5566', 'https://linkedin.com/in/harper-hernandez', 'I have experience in C# and enjoy solving complex programming challenges.', 'person1.svg'),
('evelyn.lopez@example.com', 'Evelyn', 'Lopez', '555-7788', 'https://linkedin.com/in/evelyn-lopez', 'I am a PHP developer with a passion for backend systems and API development.', 'person2.svg'),
('abigail.moore@example.com', 'Abigail', 'Moore', '555-9911', 'https://linkedin.com/in/abigail-moore', 'I love Python and data science. Excited to mentor women aspiring to break into the data field.', 'person3.svg'),
('sofia.gonzalez@example.com', 'Sofia', 'Gonzalez', '555-2233', 'https://linkedin.com/in/sofia-gonzalez', 'I am a Kotlin developer with a focus on mobile app development.', 'person4.svg'),
('avery.hill@example.com', 'Avery', 'Hill', '555-4455', 'https://linkedin.com/in/avery-hill', 'I specialize in Java development and enjoy mentoring others in the field.', 'person5.svg'),
('ella.scott@example.com', 'Ella', 'Scott', '555-6677', 'https://linkedin.com/in/ella-scott', 'I have experience in Go and love building scalable backend systems.', 'person6.svg'),
('lily.green@example.com', 'Lily', 'Green', '555-8899', 'https://linkedin.com/in/lily-green', 'I am a Rust developer with a deep passion for performance and safe systems.', 'person7.svg'),
('chloe.adams@example.com', 'Chloe', 'Adams', '555-1010', 'https://linkedin.com/in/chloe-adams', 'I am a JavaScript developer passionate about building interactive web applications.', 'person1.svg'),
('nora.baker@example.com', 'Nora', 'Baker', '555-1212', 'https://linkedin.com/in/nora-baker', 'I have a deep interest in Python and love working on open-source projects.', 'person2.svg'),
('scarlett.nelson@example.com', 'Scarlett', 'Nelson', '555-1313', 'https://linkedin.com/in/scarlett-nelson', 'I am a Swift developer with a focus on iOS development.', 'person3.svg'),
('aria.carter@example.com', 'Aria', 'Carter', '555-1414', 'https://linkedin.com/in/aria-carter', 'I enjoy working with TypeScript and building scalable frontend architectures.', 'person4.svg'),
('hannah.mitchell@example.com', 'Hannah', 'Mitchell', '555-1515', 'https://linkedin.com/in/hannah-mitchell', 'I am a C++ developer interested in performance optimization and real-time systems.', 'person5.svg'),
('zoe.perry@example.com', 'Zoe', 'Perry', '555-1616', 'https://linkedin.com/in/zoe-perry', 'I have experience with Scala and enjoy building large-scale distributed systems.', 'person6.svg');

-- Insert associated programming languages for each mentor
INSERT INTO languages (email, programming_language) VALUES
('sara.smith@example.com', 'Python'),
('sara.smith@example.com', 'Java'),
('emma.johnson@example.com', 'Java'),
('olivia.brown@example.com', 'JavaScript'),
('ava.jones@example.com', 'Ruby'),
('isabella.garcia@example.com', 'Python'),
('mia.martinez@example.com', 'C++'),
('amelia.rodriguez@example.com', 'JavaScript'),
('harper.hernandez@example.com', 'C#'),
('evelyn.lopez@example.com', 'PHP'),
('abigail.moore@example.com', 'Python'),
('sofia.gonzalez@example.com', 'Kotlin'),
('avery.hill@example.com', 'Java'),
('ella.scott@example.com', 'Go'),
('lily.green@example.com', 'Rust'),
('chloe.adams@example.com', 'JavaScript'),
('nora.baker@example.com', 'Python'),
('scarlett.nelson@example.com', 'Swift'),
('aria.carter@example.com', 'TypeScript'),
('hannah.mitchell@example.com', 'C++'),
('zoe.perry@example.com', 'Scala');


-- Insert messages from mentees to mentors
INSERT INTO messages (sender, recipient, message) VALUES
('lucy.wilson@example.com', 'sara.smith@example.com', 'Hi Sara, I am new to Python and was hoping you could help me get started with some basic concepts.'),
('grace.thomas@example.com', 'emma.johnson@example.com', 'Hi Emma, I’m struggling with some Java concepts. Could you explain how inheritance works in Java?'),
('ella.clark@example.com', 'olivia.brown@example.com', 'Hi Olivia, I love frontend development but need advice on improving my JavaScript skills. Any tips?'),
('sophie.turner@example.com', 'ava.jones@example.com', 'Hi Ava, I am working on a Ruby project and would love your input on how to structure my code better.'),
('ruby.evans@example.com', 'isabella.garcia@example.com', 'Hi Isabella, I am interested in machine learning and would love to learn more about how Python can be used for that. Can we chat?'),
('lucy.wilson@example.com', 'mia.martinez@example.com', 'Hi Mia, I am new to C++ and could really use some help understanding pointers. Can you guide me?'),
('grace.thomas@example.com', 'amelia.rodriguez@example.com', 'Hi Amelia, I am building a web application in JavaScript, and I need some advice on using frameworks. Which framework do you recommend for beginners?'),
('ella.clark@example.com', 'harper.hernandez@example.com', 'Hi Harper, I’m learning C# and would appreciate it if you could share some best practices for writing clean code.'),
('sophie.turner@example.com', 'evelyn.lopez@example.com', 'Hi Evelyn, I am struggling with PHP and would love some advice on how to optimize performance for a backend API.'),
('ruby.evans@example.com', 'abigail.moore@example.com', 'Hi Abigail, I’m interested in data science and would love to hear your advice on how to get started with Python for data analysis.');
