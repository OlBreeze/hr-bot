// jobScraperService.js
// Сервис для получения реальных вакансий через API

import {API_ENDPOINTS} from "./constants";

class JobScraperService {
    constructor(apiKey = null) {
        this.apiKey = apiKey;
        this.sources = {
            adzuna: API_ENDPOINTS.ADZUNA,
            remotive: API_ENDPOINTS.REMOTIVE,
            reed: API_ENDPOINTS.REED,
            indeed: API_ENDPOINTS.INDEED,
            glassdoor: API_ENDPOINTS.GLASSDOOR,
            jsearch: API_ENDPOINTS.JSEARCH,
            linkedin: API_ENDPOINTS.LINKEDIN,
            jooble: API_ENDPOINTS.JOOBLE,
            // arbeitnow: API_ENDPOINTS.ARBEITNOW,
        };
    }

    // 1. Adzuna API (бесплатный с регистрацией)
    // Поддерживает: Israel, UK, US, и др.
    async searchAdzuna(params) {
        const {keywords, location, salary} = params;
        const appId = process.env.REACT_APP_ADZUNA_APP_ID;
        const appKey = process.env.REACT_APP_ADZUNA_API_KEY;

        if (!appId || !appKey) {
            console.error('Adzuna API credentials not found');
            return [];
        }

        try {
            const country = 'il'; // Israel
            const url = `${this.sources.adzuna}/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(keywords)}&where=${encodeURIComponent(location)}&salary_min=${salary || 0}&results_per_page=20`;
            // const url = `${this.sources.adzuna}/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(keywords)}&where=${encodeURIComponent(location)}&salary_min=${salary || 0}&results_per_page=20`;

            const response = await fetch(url);
            const data = await response.json();

            return data.results.map(job => ({
                id: job.id.toString(),
                title: job.title,
                company: job.company.display_name,
                salary: job.salary_max ? `$${Math.round(job.salary_min / 12)} - $${Math.round(job.salary_max / 12)}/month` : 'Not specified',
                location: job.location.display_name,
                experience: this.extractExperience(job.description),
                requirements: this.extractSkills(job.description),
                description: job.description.substring(0, 200) + '...',
                link: job.redirect_url,
                source: 'Adzuna'
            }));
        } catch (error) {
            console.error('Adzuna API error:', error);
            return [];
        }
    }

    // 2. Remotive API (полностью бесплатный, без ключа!)
    // Remote-only вакансии со всего мира
    async searchRemotive(params) {
        const {keywords} = params;

        try {
            const url = `${this.sources.remotive}?search=${encodeURIComponent(keywords)}&limit=20`;

            const response = await fetch(url);
            const data = await response.json();

            return data.jobs.map(job => ({
                id: job.id.toString(),
                title: job.title,
                company: job.company_name,
                salary: job.salary || 'Competitive',
                location: 'Remote',
                experience: this.extractExperience(job.description),
                requirements: this.extractSkills(job.description),
                description: job.description.substring(0, 200) + '...',
                link: job.url,
                source: 'Remotive'
            }));
        } catch (error) {
            console.error('Remotive API error:', error);
            return [];
        }
    }

    async searchIndeed(params) {
        const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
        if (!apiKey) return [];
        const url = `${this.sources.indeed}/search?query=${encodeURIComponent(params.keywords)}&location=${encodeURIComponent(params.location || '')}`;
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'indeed12.p.rapidapi.com'
            }
        });

        const data = await response.json();
        if (!data || !data.results) return [];

        return data.results.map(job => ({
            id: `indeed-${job.jobkey}`,
            title: job.jobtitle,
            company: job.company,
            location: job.formattedLocation || job.location,
            salary: job.salarySnippet || 'N/A',
            description: job.snippet || '',
            requirements: [],
            source: 'Indeed',
            link: job.url
        }));
    }

    // === GLASSDOOR (via RapidAPI) ===
    async searchGlassdoor(params) {
        const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
        if (!apiKey) return [];

        const url = `${this.sources.glassdoor}/search?keyword=${encodeURIComponent(params.keywords)}&location=${encodeURIComponent(params.location || '')}`;
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'glassdoor.p.rapidapi.com'
            }
        });

        const data = await response.json();
        if (!data || !data.jobs) return [];

        return data.jobs.map(job => ({
            id: `glassdoor-${job.id}`,
            title: job.title,
            company: job.employer?.name,
            location: job.location || '',
            salary: job.pay || 'N/A',
            description: job.descriptionSnippet || '',
            requirements: [],
            source: 'Glassdoor',
            link: job.url
        }));
    }
    async searchJSearch(params) {
        const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
        if (!apiKey) return [];

        const url = `${this.sources.jsearch}/search?query=${encodeURIComponent(params.keywords)}&country=${encodeURIComponent(params.location||'')}&page=1&&date_posted=all`; //&country=us
        const response = await fetch(url, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        });

        const data = await response.json();
        if (data.status !== 'OK' || !data.data) return [];

        return data.data.map(job => ({
            id: `jsearch-${job.job_id}`,
            title: job.job_title,
            company: job.employer_name,
            location: job.job_city
                ? `${job.job_city}, ${job.job_country}`
                : job.job_country || 'Unknown',
            salary: job.job_min_salary
                ? `$${job.job_min_salary} - $${job.job_max_salary || ''}`
                : job.job_salary_currency || 'N/A',
            description: job.job_description?.slice(0, 400) || '',
            requirements: job.job_required_skills || [],
            source: job.job_publisher || 'JSearch',
            link: job.job_apply_link,
            logo: job.employer_logo || null
        }));
    }

    // 3. Arbeitnow API (бесплатный, без ключа!)
    // EU + remote вакансии
    async searchArbeitnow(params) {
        const {keywords} = params;

        try {
            const url = `${this.sources.arbeitnow}`;

            const response = await fetch(url);
            const data = await response.json();

            // Фильтруем по ключевым словам
            const filtered = data.data.filter(job => {
                const searchText = `${job.title} ${job.description}`.toLowerCase();
                return keywords.toLowerCase().split(' ').some(keyword =>
                    searchText.includes(keyword.toLowerCase())
                );
            });

            return filtered.slice(0, 20).map(job => ({
                id: job.slug,
                title: job.title,
                company: job.company_name,
                salary: 'Not specified',
                location: job.location,
                experience: this.extractExperience(job.description),
                requirements: job.tags || [],
                description: job.description.substring(0, 200) + '...',
                link: job.url,
                source: 'Arbeitnow'
            }));
        } catch (error) {
            console.error('Arbeitnow API error:', error);
            return [];
        }
    }

    // 4. LinkedIn Jobs (через RapidAPI)
    // Требует RapidAPI ключ (бесплатный план - 100 запросов/месяц)
    async searchLinkedIn(params) {
        const {keywords, location} = params;
        const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY;
        // console.log("qqq + ")
        if (!rapidApiKey) {
            console.error('RapidAPI key not found');
            return [];
        }

        try {
            const url = `${this.sources.linkedin}?keywords=${encodeURIComponent(keywords)}&locationId=${encodeURIComponent(location)}&datePosted=anyTime&sort=mostRelevant`;
// 'https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=golang&locationId=101620260&datePosted=anyTime&titleIds=4&functionIds=it&industryIds=4%252C96&sort=mostRelevant\'
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': rapidApiKey,
                    'X-RapidAPI-Host': 'linkedin-data-api.p.rapidapi.com'
                }
            });

            const data = await response.json();
            console.log(data);
            return data.data.slice(0, 20).map(job => ({
                id: job.id,
                title: job.title,
                company: job.company,
                salary: job.salary || 'Not specified',
                location: job.location,
                experience: job.seniorityLevel || 'Not specified',
                requirements: job.skills || [],
                description: job.description?.substring(0, 200) + '...' || '',
                link: job.url,
                source: 'LinkedIn'
            }));
        } catch (error) {
            console.error('LinkedIn API error:', error);
            return [];
        }
    }

    // 5. Reed API (UK focused)
    async searchReed(params) {
        const {keywords, location} = params;
        const reedApiKey = process.env.REACT_APP_REED_API_KEY;

        if (!reedApiKey) {
            console.error('Reed API key not found');
            return [];
        }

        try {
            const url = `${this.sources.reed}/1.0/search?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}&resultsToTake=20`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Basic ${btoa(reedApiKey + ':')}`
                }
            });

            const data = await response.json();

            return data.results.map(job => ({
                id: job.jobId.toString(),
                title: job.jobTitle,
                company: job.employerName,
                salary: job.minimumSalary ? `£${job.minimumSalary} - £${job.maximumSalary}` : 'Not specified',
                location: job.locationName,
                experience: 'Not specified',
                requirements: this.extractSkills(job.jobDescription),
                description: job.jobDescription.substring(0, 200) + '...',
                link: job.jobUrl,
                source: 'Reed'
            }));
        } catch (error) {
            console.error('Reed API error:', error);
            return [];
        }
    }

    async searchJooble(params) {
        const {keywords, location} = params;
        const apiKey = process.env.REACT_APP_JOOBLE_API_KEY; // или твой ключ прямо в коде

        if (!apiKey) {
            console.error("Jooble API key not found");
            return [];
        }

        try {
            const url = `${this.sources.jooble}/${apiKey}`;

            const body = {
                keywords: keywords || '',
                location: location || '',
                page: 1
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!data.jobs || !Array.isArray(data.jobs)) {
                console.warn('Jooble API returned unexpected data:', data);
                return [];
            }
            console.log('Jobs found:', data.jobs.map(j => j.source));

            return data.jobs.slice(0, 20).map((job, index) => ({
                id: job.id?.toString() || `jooble-${index}`,
                title: job.title,
                company: job.company || 'Unknown',
                salary: job.salary || 'Not specified',
                location: job.location || location || 'Israel',
                experience: this.extractExperience(job.snippet || job.description || ''),
                requirements: this.extractSkills(job.snippet || job.description || ''),
                description: (job.snippet || job.description || '').substring(0, 200) + '...',
                link: job.link || job.redirect_url || '#',
                source: 'Jooble'
            }));

        } catch (error) {
            console.error('Jooble API error:', error);
            return [];
        }
    }

    // Главный метод - собирает вакансии из всех доступных источников
    async searchAllSources(params) {
        console.log('Searching jobs with params:', params);

        const results = await Promise.allSettled([
            this.searchJSearch(params),
            this.searchRemotive(params),      // Бесплатный, без ключа
            this.searchJooble(params) ,          // ключ

            // this.searchArbeitnow(params),     // Бесплатный, без ключа Германия
            // this.searchAdzuna(params),        // Нужна регистрация, не ищет в Израиле
            // this.searchLinkedIn(params),      // Нужен RapidAPI ключ
            // this.searchReed(params) ,          // Нужен Reed ключ
            // this.searchIndeed(params),     // пока не нашла нормальных апишек на рапиде
            // this.searchGlassdoor(params),  // пока не нашла нормальных апишек на рапиде
        ]);

        // Собираем все успешные результаты
        const allJobs = results
            .filter(result => result.status === 'fulfilled' && result.value.length > 0)
            .flatMap(result => result.value);

        // Удаляем дубликаты по названию и компании
        const uniqueJobs = this.removeDuplicates(allJobs);

        // Сортируем по релевантности
        return this.sortByRelevance(uniqueJobs, params.keywords);
    }

    // Вспомогательные методы
    extractExperience(description) {
        const text = description.toLowerCase();
        if (text.includes('senior') || text.includes('5+ years') || text.includes('5-7 years')) {
            return '5+ years';
        }
        if (text.includes('mid-level') || text.includes('3-5 years')) {
            return '3-5 years';
        }
        if (text.includes('junior') || text.includes('1-3 years')) {
            return '1-3 years';
        }
        return 'Not specified';
    }

    extractSkills(description) {
        const commonSkills = [
            'Java', 'Spring', 'Spring Boot', 'Python', 'Django', 'Flask', 'FastAPI',
            'JavaScript', 'TypeScript', 'React', 'Redux', 'Next.js', 'Node.js',
            'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
            'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
            'REST API', 'GraphQL', 'Microservices', 'CI/CD', 'Git'
        ];

        const text = description.toLowerCase();
        return commonSkills.filter(skill =>
            text.includes(skill.toLowerCase())
        ).slice(0, 8);
    }

    removeDuplicates(jobs) {
        const seen = new Set();
        return jobs.filter(job => {
            const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    sortByRelevance(jobs, keywords) {
        return jobs.sort((a, b) => {
            const keywordList = keywords.toLowerCase().split(' ');
            const scoreA = this.calculateRelevanceScore(a, keywordList);
            const scoreB = this.calculateRelevanceScore(b, keywordList);
            return scoreB - scoreA;
        });
    }

    calculateRelevanceScore(job, keywords) {
        let score = 0;
        const searchText = `${job.title} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();

        keywords.forEach(keyword => {
            if (searchText.includes(keyword)) {
                score += 1;
            }
        });

        return score;
    }
}

// Экспорт
export default JobScraperService;

// ИСПОЛЬЗОВАНИЕ:
/*
import JobScraperService from './jobScraperService';

const scraper = new JobScraperService();

const searchVacancies = async () => {
  setIsLoading(true);

  const params = {
    keywords: searchParams.keywords,
    location: searchParams.location,
    salary: searchParams.salary
  };

  const jobs = await scraper.searchAllSources(params);

  setVacancies(jobs);
  await saveVacancies(jobs);
  setIsLoading(false);
  setActiveTab('vacancies');
};
*/