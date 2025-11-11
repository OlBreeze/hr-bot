// src/App.js

import React, {useState, useEffect} from 'react';
import {
    FileText,
    Database,
    CheckCircle,
    Send,
    Search,
} from 'lucide-react';


import JobScraperService from './utils/jobScraperService';
import StorageService from "./utils/storageService";
import {
    ITEMS_PER_PAGE,
    STORAGE_KEYS,
    DEFAULT_RESUME,
    API_ENDPOINTS
} from "./utils/constants";

import ApiStatusBar from "./components/ApiStatusBar";
import SearchForm from "./components/SearchForm";
import LettersTab from "./components/LettersTab";
import SelectedTab from "./components/SelectedTab";
import ResumeTab from "./components/ResumeTab";
import VacanciesTab from "./components/VacanciesTab";
import Header from "./components/Header";
import TabsNavigation from "./components/TabsNavigation";
import CoverLetterService from "./utils/coverLetterService";

const tabsConfig = [
    {id: 'search', label: 'Search', icon: Search, component: SearchForm},
    {id: 'resume', label: 'Resume', icon: FileText, component: ResumeTab},
    {id: 'vacancies', label: 'New Jobs', icon: Database, component: VacanciesTab},
    {id: 'selected', label: 'Selected', icon: CheckCircle, component: SelectedTab},
    {id: 'letters', label: 'Letters', icon: Send, component: LettersTab},
];

// Main Component
const HRBot = () => {
    const [activeTab, setActiveTab] = useState('search');
    const [resume, setResume] = useState(DEFAULT_RESUME);
    const [searchParams, setSearchParams] = useState({
        keywords: 'python, java, developer',
        location: 'Israel'
    });
    const [allVacancies, setAllVacancies] = useState([]);
    const [selectedVacancies, setSelectedVacancies] = useState(new Set());
    const [viewedVacancies, setViewedVacancies] = useState(new Set());
    const [generatedLetters, setGeneratedLetters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState({
        remotive: 'unknown',
        jooble: 'unknown',
        jsearch: 'unknown',
    });
    const [currentPage, setCurrentPage] = useState(1);

    const scraper = new JobScraperService();

    useEffect(() => {
        loadData();
        checkApiStatus();
    }, []);

    const loadData = async () => {
        const resumeData = await StorageService.get(STORAGE_KEYS.RESUME);
        if (resumeData) setResume(resumeData);

        const vacanciesData = await StorageService.get(STORAGE_KEYS.VACANCIES);
        if (vacanciesData) setAllVacancies(JSON.parse(vacanciesData));

        const selectedData = await StorageService.get(STORAGE_KEYS.SELECTED);
        if (selectedData) setSelectedVacancies(new Set(JSON.parse(selectedData)));

        const viewedData = await StorageService.get(STORAGE_KEYS.VIEWED);
        if (viewedData) setViewedVacancies(new Set(JSON.parse(viewedData)));

        const lettersData = await StorageService.get(STORAGE_KEYS.LETTERS);
        if (lettersData) setGeneratedLetters(JSON.parse(lettersData));
    };

    const checkApiStatus = async () => {

        // проверка не строгая, оставлю для красоты
        try {
            const remotiveTest = await fetch(API_ENDPOINTS.REMOTIVE + '?limit=1');
            setApiStatus(prev => ({...prev, remotive: remotiveTest.ok ? 'active' : 'error'}));
        } catch {
            setApiStatus(prev => ({...prev, remotive: 'error'}));
        }

        // Jooble проверка сложнее (требует POST), ставим active если ключ есть
        if (process.env.REACT_APP_JOOBLE_API_KEY) {
            setApiStatus(prev => ({...prev, jooble: 'active'}));
        }

        // jsearch проверка сложнее (требует POST), ставим active если ключ есть
        if (process.env.REACT_APP_RAPIDAPI_KEY) { // тоже ведь с рапида
            setApiStatus(prev => ({...prev, jsearch: 'active'}));
        }
    };

    const searchVacancies = async () => {
        setIsLoading(true);
        try {
            const jobs = await scraper.searchAllSources(searchParams);
            setAllVacancies(jobs);
            await StorageService.set(STORAGE_KEYS.VACANCIES, JSON.stringify(jobs));
            setCurrentPage(1);
            setActiveTab('vacancies');
        } catch (error) {
            alert('Search error: ' + error.message);
        }
        setIsLoading(false);
    };

    const saveResume = async () => {
        await StorageService.set(STORAGE_KEYS.RESUME, resume);
        alert('Resume saved!');
    };

    const toggleVacancy = async (id) => {
        const newSelected = new Set(selectedVacancies);
        const newViewed = new Set(viewedVacancies);

        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
            newViewed.add(id);
        }

        setSelectedVacancies(newSelected);
        setViewedVacancies(newViewed);
        await StorageService.set(STORAGE_KEYS.SELECTED, JSON.stringify([...newSelected]));
        await StorageService.set(STORAGE_KEYS.VIEWED, JSON.stringify([...newViewed]));
    };

    const generateCoverLetter = async (vacancy) => {
        if (!resume) {
            alert('Please add your resume first');
            return;
        }

        setIsLoading(true);
        try {
            const letter = await CoverLetterService.generate(vacancy, resume);
            const newLetters = {...generatedLetters, [vacancy.id]: letter};
            setGeneratedLetters(newLetters);
            await StorageService.set(STORAGE_KEYS.LETTERS, JSON.stringify(newLetters));
        } catch (error) {
            alert(error.message);
        }
        setIsLoading(false);
    };

    // Фильтрация вакансий
    const unseenVacancies = allVacancies.filter(v => !viewedVacancies.has(v.id));
    const selectedVacancyList = allVacancies.filter(v => selectedVacancies.has(v.id));

    // Пагинация
    const totalPages = Math.ceil(unseenVacancies.length / ITEMS_PER_PAGE);
    const paginatedVacancies = unseenVacancies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <Header/>

                    <ApiStatusBar status={apiStatus}/>

                    {/* Tabs Navigation */}
                    <TabsNavigation
                        tabsConfig={tabsConfig}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        unseenVacancies={unseenVacancies}
                        selectedVacancies={selectedVacancies}
                    />


                    {/* Content Area */}
                    <div className="p-6">

                        {/* SEARCH TAB */}
                        <SearchForm
                            params={searchParams}
                            onChange={setSearchParams}
                            onSearch={searchVacancies}
                            isLoading={isLoading}
                            activeTab={activeTab}
                        />

                        {/* RESUME TAB */}
                        <ResumeTab {...{activeTab, resume, setResume, saveResume}} />

                        {/* VACANCIES TAB */}
                        <VacanciesTab {...{
                            activeTab, unseenVacancies, paginatedVacancies, selectedVacancies, viewedVacancies,
                            toggleVacancy, currentPage, totalPages, setCurrentPage,
                        }} />

                        {/* SELECTED TAB */}
                        <SelectedTab {...{activeTab, selectedVacancyList, toggleVacancy}} />

                        {/* LETTERS TAB */}
                        <LettersTab  {...{
                            activeTab,
                            selectedVacancyList,
                            generatedLetters,
                            generateCoverLetter,
                            isLoading
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRBot;