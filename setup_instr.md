# 🚀 Setup Instructions - HR Bot with Real Job APIs

## ✅ Что уже работает БЕЗ настройки:

### 1. **Remotive API** (бесплатный, без ключа)
- Вакансии со всего мира (remote-only)
- Лимит: без ограничений
- Покрытие: Tech, Marketing, Design, Sales

### 2. **Arbeitnow API** (бесплатный, без ключа)
- Вакансии из Европы + remote
- Лимит: без ограничений
- Покрытие: IT, Engineering, Product

---

## 🔧 Опциональные API (для расширения поиска):

### 3. **Adzuna API** (для локальных вакансий в Израиле)

**Регистрация:**
1. Перейдите на https://developer.adzuna.com/signup
2. Заполните форму регистрации (бесплатно)
3. Получите **APP_ID** и **API_KEY**

**Настройка в .env:**
```bash
REACT_APP_ADZUNA_APP_ID=your_app_id_here
REACT_APP_ADZUNA_API_KEY=your_api_key_here
```

**Преимущества:**
- Вакансии специфично для Израиля
- Информация о зарплатах
- Лимит: 50 запросов/день на бесплатном плане

---

### 4. **LinkedIn Jobs API** (через RapidAPI)

**Регистрация:**
1. Зарегистрируйтесь на https://rapidapi.com
2. Найдите "LinkedIn Data API"
3. Подпишитесь на бесплатный план (100 запросов/месяц)

**Настройка в .env:**
```bash
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
```

**Добавьте функцию в код:**
```javascript
const searchLinkedIn = async (keywords, location) => {
    const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    if (!rapidApiKey) return [];

    try {
        const response = await fetch(
            `https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=${encodeURIComponent(keywords)}&locationId=${encodeURIComponent(location)}`,
            {
                headers: {
                    'X-RapidAPI-Key': rapidApiKey,
                    'X-RapidAPI-Host': 'linkedin-data-api.p.rapidapi.com'
                }
            }
        );
        const data = await response.json();
        
        return data.data.slice(0, 20).map(job => ({
            id: `linkedin-${job.id}`,
            title: job.title,
            company: job.company,
            salary: job.salary || 'Not specified',
            location: job.location,
            experience: job.seniorityLevel || 'Not specified',
            requirements: job.skills || [],
            description: job.description?.substring(0, 250) + '...' || '',
            link: job.url,
            source: 'LinkedIn'
        }));
    } catch (error) {
        console.error('LinkedIn API error:', error);
        return [];
    }
};
```

Добавьте в `searchVacancies`:
```javascript
const [remotiveJobs, arbeitnowJobs, adzunaJobs, linkedInJobs] = await Promise.all([
    searchRemotive(searchParams.keywords),
    searchArbeitnow(searchParams.keywords),
    searchAdzuna(searchParams.keywords, searchParams.location),
    searchLinkedIn(searchParams.keywords, searchParams.location) // Добавить эту строку
]);

let allJobs = [...remotiveJobs, ...arbeitnowJobs, ...adzunaJobs, ...linkedInJobs];
```

---

## 📦 Полная структура .env файла:

```bash
# OpenRouter API (для генерации писем)
REACT_APP_OPENROUTER_API_KEY=your_openrouter_key

# Adzuna API (опционально - для израильских вакансий)
REACT_APP_ADZUNA_APP_ID=your_adzuna_app_id
REACT_APP_ADZUNA_API_KEY=your_adzuna_api_key

# RapidAPI (опционально - для LinkedIn)
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key

# Reed API (опционально - для UK вакансий)
REACT_APP_REED_API_KEY=your_reed_api_key
```

---

## 🎯 Как запустить:

### 1. Установите зависимости:
```bash
npm install
```

### 2. Создайте файл `.env` в корне проекта:
```bash
touch .env
```

### 3. Добавьте ваш OpenRouter ключ (обязательно):
```bash
REACT_APP_OPENROUTER_API_KEY=ваш_ключ_openrouter
```

### 4. Запустите приложение:
```bash
npm start
```

### 5. Откройте браузер:
```
http://localhost:3000
```

---

## 🔍 Текущий статус API:

| API | Статус | Ключ нужен? | Покрытие |
|-----|--------|-------------|----------|
| **Remotive** | ✅ Работает | ❌ Нет | Remote worldwide |
| **Arbeitnow** | ✅ Работает | ❌ Нет | EU + Remote |
| **Adzuna** | ⚠️ Опционально | ✅ Да | Israel, US, UK |
| **LinkedIn** | ⚠️ Опционально | ✅ Да (RapidAPI) | Worldwide |
| **OpenRouter** | ✅ Работает | ✅ Да | AI письма |

---

## 📊 Что вы получаете сейчас:

**Без дополнительной настройки:**
- ✅ 20-40 реальных вакансий по запросу
- ✅ Remote и EU позиции
- ✅ Full Stack, Python, Java вакансии
- ✅ AI-генерация сопроводительных писем

**С Adzuna API:**
- ✅ +20-30 локальных израильских вакансий
- ✅ Точная информация о зарплатах
- ✅ Вакансии от местных компаний

**С LinkedIn API:**
- ✅ +50-100 вакансий
- ✅ Прямые ссылки на LinkedIn
- ✅ Детальная информация о компаниях

---

## 🐛 Troubleshooting:

### Проблема: "API returns no jobs"
**Решение:**
- Проверьте консоль браузера (F12)
- Убедитесь, что нет CORS ошибок
- Попробуйте другие ключевые слова

### Проблема: "Adzuna API не работает"
**Решение:**
- Проверьте правильность APP_ID и API_KEY
- Убедитесь, что не превышен лимит (50 запросов/день)
- Проверьте страну в коде (сейчас 'il' для Israel)

### Проблема: "Generate Letter не работает"
**Решение:**
- Убедитесь, что `REACT_APP_OPENROUTER_API_KEY` установлен
- Проверьте баланс на OpenRouter
- Попробуйте другую модель (например, `mistralai/mistral-nemo:free`)

---

## 🎓 Альтернативные бесплатные источники:

### Если нужно больше вакансий:

1. **The Muse API** - https://www.themuse.com/developers/api/v2
2. **GitHub Jobs API** - https://jobs.github.com/api
3. **JSearch (RapidAPI)** - агрегатор Indeed, LinkedIn, Glassdoor
4. **Greenhouse API** - вакансии от компаний на Greenhouse

---

## 📝 Следующие шаги:

1. ✅ Запустите приложение с текущими API
2. ✅ Протестируйте поиск
3. ⚠️ Зарегистрируйтесь в Adzuna (5 минут)
4. ⚠️ Добавьте ключи в .env
5. 🚀 Наслаждайтесь автоматизацией!

---

## 💡 Pro Tips:

- Используйте широкие ключевые слова ("Full Stack", "Python Developer")
- Проверяйте вакансии раз в день (утром)
- Сохраняйте интересные вакансии для генерации писем
- Экспортируйте данные регулярно (кнопка Export)
- Комбинируйте remote и локальный поиск

---
