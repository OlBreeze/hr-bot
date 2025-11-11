export const DEFAULT_RESUME = `Full Stack Developer specializing in Python, Java, Spring (Boot, Security) and frontend technologies Next.js, React, Redux. Full-cycle development experience, covering both backend and frontend components. Experience in working with relational and NoSQL databases.

SKILLS SUMMARY
Programming Languages: Python, Java, JavaScript, TypeScript, React, Redux, SQL, PL/SQL
Web: JavaScript, TypeScript, jQuery, Node.js
Frameworks: Django, Flask, Spring, Spring Boot, Next.js, Maven, Hibernate, Lombok, Rest API, JUnit
IDEs/Tools: Eclipse, IntelliJ IDEA, WebStorm, VS Code, GitHub, Postman
Databases: Oracle, MySQL, PostgreSQL, MongoDB, Firebase
Additional: PowerDesigner, Jira, Photoshop, Figma

PROFESSIONAL EXPERIENCE

Full Stack Developer, Optisor LTD (Rehovot, Israel) | 2022-present
• Farm Products & Inventory (Java, Spring, React): Designed and developed a web platform providing a database of local Belgian farmers. Built registration and authorization using Spring Security and JWT, created responsive UI components with React, and managed data via PostgreSQL. Implemented logging, testing, and ETL processes.
• Farm Delivery & Logistics (Python, Django REST, Docker): Backend for local farmers delivery platform - manage customer orders, track delivery status, optimize routes, and handle user accounts with role-based JWT authentication. Docker containerization and comprehensive API documentation via Swagger.
• File Monitoring System (Python, FastAPI, JWT): Built a microservice system to monitor local directories, extract file metadata, and securely transmit data between services using JWT-authenticated REST communication.

Full Stack Developer, INTERTOOL | 2019-2022
• Maintained existing functionality and developed new data exchange services between distributed ERP modules (Java, PHP)
• Built full-stack feature for processing external parking data: backend services handled data ingestion and analytics, frontend displayed insights
• Integrated with external Bitrix system, created analytical reports and summaries
Tools: Java, Spring, JavaScript, TS, React, Redux, Next.js, GitHub, JUnit, MySQL, MongoDB

Software Developer 1C, IT-LANCE (Kiev, Ukraine) | 2016-2019
• Developed and optimized 1C accounting program for 15+ companies
• Created accounting and logistics reports, optimized database queries
• Prepared technical specifications and work plans, communicated with clients
Tools: 1C, MySQL, PowerDesigner, VS Code, GitHub, Bitrix24, Postman

ORACLE DBA, Kharkiv Regional Energy Administration (Ukraine) | 2006-2016
• Administered enterprise Oracle database systems (8i/9i/11g) managing terabyte-scale data with 500+ concurrent users
• Implemented comprehensive backup and recovery strategies including RMAN configurations
• Optimized database performance through query tuning, achieving 30-40% improvement in response times
• Automated critical business processes eliminating manual errors

EDUCATION
MSc in Computerized Aircraft Systems | 2000
National Aerospace University, Ukraine`;

export const ITEMS_PER_PAGE = 10;

export const STORAGE_KEYS = {
    RESUME: 'hr-bot-resume',
    VACANCIES: 'hr-bot-vacancies',
    SELECTED: 'hr-bot-selected',
    LETTERS: 'hr-bot-letters',
    VIEWED: 'hr-bot-viewed'
};

export const API_ENDPOINTS = {
    ANTHROPIC: 'https://api.anthropic.com/v1/messages',
    OPENROUTER: 'https://openrouter.ai/api/v1/chat/completions',

    JSEARCH: 'https://jsearch.p.rapidapi.com',
    REMOTIVE: 'https://remotive.com/api/remote-jobs',
    JOOBLE: 'https://jooble.org/api',

    ARBEITNOW: 'https://www.arbeitnow.com/api/job-board-api',
    REED: 'https://www.reed.co.uk/api',
    ADZUNA: 'https://api.adzuna.com/v1/api/jobs',
    INDEED: 'https://indeed12.p.rapidapi.com/jobs',
    GLASSDOOR: 'https://glassdoor.p.rapidapi.com/jobs',
    LINKEDIN: 'https://linkedin-data-api.p.rapidapi.com/search-jobs',
};

export const DEFAULT_RESUME2 = `John Doe
Full Stack Developer

EXPERIENCE:
- 5+ years in web development
- React, Node.js, Python, Java
- Cloud platforms: AWS, Azure
- Agile/Scrum methodologies

SKILLS:
JavaScript, TypeScript, React, Node.js, Python, Java, SQL, MongoDB, Docker, Kubernetes

EDUCATION:
B.Sc. Computer Science`;