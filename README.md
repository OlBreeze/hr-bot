# HR Job Search Bot - Automated Job Application Assistant (11-11-2025)

Developed an intelligent job search automation platform that aggregates vacancies from multiple APIs, filters relevant opportunities, and generates personalized cover letters using AI. The system streamlines the entire job application workflow from discovery to submission.

```
🔍 Multi-source job aggregation (Remotive, Jooble, with extensible API support)
🤖 AI-powered cover letter generation using LLM (OpenRouter/Claude)
📊 Smart vacancy management with view tracking and selection system
💾 Persistent storage for resumes, applications, and generated letters
🎯 Intelligent filtering and relevance-based sorting
📑 Pagination and batch processing for high-volume job searches
🔄 Real-time API status monitoring and fallback handling
✅ Full-cycle job application workflow (Search → Review → Select → Apply)
📤 Export/Import functionality for data portability
🎨 Modern responsive UI with real-time vacancy updates
```

**Tech Stack:**
- **Frontend:** React, Lucide Icons, TailwindCSS
- **APIs:** Remotive API, Jooble API, OpenRouter/Anthropic Claude API
- **Storage:** Browser Storage API with localStorage fallback
- **Architecture:** Modular service-based design (JobScraperService, StorageService)

**Key Features:**
- Aggregates 20-50+ job listings per search from multiple platforms
- Deduplicates and ranks vacancies by relevance score
- Generates unique, context-aware cover letters for each position
- Tracks application status (new/viewed/selected)
- Stores complete application history with full-text search capability

https://github.com/OlBreeze/hr-bot

**Capabilities:**
- ### search parameters:

![](https://github.com/user-attachments/assets/a647c505-d4da-4152-92d7-8f4c54d67f51)

- ### Resume to generate a relevant cover letter with OpenRouter:

![](https://github.com/user-attachments/assets/8d6b6b15-5621-497f-8db2-3b2a3021796e)

- ### found vacancies with pagination:

![](https://github.com/user-attachments/assets/25a7b2a5-759e-44a7-a650-fa17b85b579c)

- ### selected vacancies:

![](https://github.com/user-attachments/assets/185b3878-ee54-4b5a-baa9-81ad06896cff)

- ### generated letter for selected vacancies:

![](https://github.com/user-attachments/assets/5af33ace-c001-4b46-b091-24cd9a82a271)

```python

```
---


