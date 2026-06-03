/**
 * Price Estimator Wizard - Frontend Integration
 * 
 * This application integrates with a backend API to provide AI-powered cost estimation.
 * 
 * API Flow:
 * 1. POST /api/questions - Generates clarifying questions
 *    - Requires: reCAPTCHA token for security verification
 *    - Returns: questions array + estimate_token (for step 2)
 * 
 * 2. POST /api/estimate - Generates cost estimate
 *    - Requires: Bearer token (estimate_token from step 1)
 *    - Returns: cost breakdown, insights, and recommendations
 * 
 * Security:
 * - Google reCAPTCHA v3 validates all question requests
 * - Token-based authentication for estimate requests
 * - Tokens expire after 10 minutes and are single-use
 * 
 * State Management:
 * - Session storage persists state across page refreshes
 * - Supports file uploads (PDF, MD, TXT) up to 5MB
 * - Auto-saves user input and form progress
 */

// API Configuration
const API_BASE_URL = 'https://3t6owtcb63.execute-api.us-east-2.amazonaws.com';
const RECAPTCHA_SITE_KEY = '6Lc3njYsAAAAAEgGUTwSZlLBxs3OI7MLK7IPv5Jx';

// ── Debug / Simulation Mode ──
// Activate via: ?debug in the URL  OR  window.ESTIMATOR_DEBUG = true in console
// Configurable delay: ?debug=5000 sets a 5-second simulated delay (default 3000ms)
window.ESTIMATOR_DEBUG = true;
window.ESTIMATOR_DEBUG_DELAY = 5000;
(function initDebugMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('debug')) {
        window.ESTIMATOR_DEBUG = true;
        const delayParam = parseInt(params.get('debug'), 10);
        window.ESTIMATOR_DEBUG_DELAY = (delayParam > 0) ? delayParam : 3000;
    }
    if (window.ESTIMATOR_DEBUG) {
        window.ESTIMATOR_DEBUG_DELAY = window.ESTIMATOR_DEBUG_DELAY || 3000;
        console.log(
            '%c🛠 ESTIMATOR DEBUG MODE ACTIVE %c Delay: ' + window.ESTIMATOR_DEBUG_DELAY + 'ms | No real API calls will be made.',
            'background: #C850C0; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
            'color: #FFCC70; font-weight: bold;'
        );
    }
})();

function _debugDelay() {
return new Promise(resolve => setTimeout(resolve, window.ESTIsMATOR_DEBUG_DELAY || 3000));
}

function _mockQuestionsResponse() {
    return {
        questions: [
            'What is the expected number of concurrent users at launch?',
            'Do you need real-time features such as notifications, chat, or live updates?',
            'Are there any third-party integrations required (payment gateways, CRMs, analytics)?',
            'What level of accessibility compliance is required (WCAG AA, AAA)?',
            'Is multi-language / i18n support needed from day one?'
        ],
        estimate_token: 'debug-token-' + Date.now()
    };
}

function _mockEstimateResponse() {
    return {
        total_cost: 24500,
        total_hours: 320,
        currency: 'USD',
        cost_breakdown: [
            { item: 'UI/UX Design & Prototyping', hours: 60, unit_price: 75, total: 4500, description: 'Wireframes, high-fidelity mockups, and interactive prototype.' },
            { item: 'Frontend Development', hours: 100, unit_price: 80, total: 8000, description: 'Responsive SPA with component library and state management.' },
            { item: 'Backend API & Database', hours: 80, unit_price: 80, total: 6400, description: 'RESTful API, authentication, database schema and migrations.' },
            { item: 'Testing & QA', hours: 40, unit_price: 70, total: 2800, description: 'Unit tests, integration tests, E2E testing, and bug fixes.' },
            { item: 'DevOps & Deployment', hours: 20, unit_price: 75, total: 1500, description: 'CI/CD pipeline, cloud infrastructure, monitoring setup.' },
            { item: 'Project Management', hours: 20, unit_price: 65, total: 1300, description: 'Sprint planning, stakeholder communication, documentation.' }
        ],
        summary: 'This project involves building a **full-stack web application** with a modern frontend, secure backend API, and cloud deployment. The estimate includes comprehensive testing and project management overhead. Timeline is approximately **8-10 weeks** with a team of 2-3 developers.',
        key_insights: [
            'The real-time features add ~15% to the overall cost due to WebSocket infrastructure.',
            'Multi-language support is best implemented as a foundation layer early on to avoid costly retrofitting.',
            'Consider a phased rollout — MVP first, then iterate based on user feedback.'
        ],
        action_items: [
            'Finalize the feature priority list for MVP scope.',
            'Provide brand guidelines and design assets.',
            'Set up cloud accounts (AWS/GCP) for deployment.',
            'Schedule a kickoff meeting to align on sprint cadence.'
        ]
    };
}

// State Management with Session Storage
let state = {
    currentStep: 1,
    prompt: '',
    files: [], // Array of { name, file_type, text/content, size }
    questions: [],
    answers: {},
    estimate: null,
    estimateToken: null, // Token from /api/questions for /api/estimate
    userName: '',
    userEmail: '',
    userCompany: ''
};

// Load state from session storage
function loadState() {
    try {
        const savedState = sessionStorage.getItem('wizardState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            state = { ...state, ...parsed };
            console.log('✓ Restored previous session');
            return true;
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
    return false;
}

// Save state to session storage
function saveState() {
    try {
        sessionStorage.setItem('wizardState', JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Clear state
function clearState() {
    sessionStorage.removeItem('wizardState');
    state = {
        currentStep: 1,
        prompt: '',
        files: [],
        questions: [],
        answers: {},
        estimate: null,
        estimateToken: null,
        userName: '',
        userEmail: '',
        userCompany: ''
    };
}

/**
 * Get reCAPTCHA token from Google
 * @param {string} action - The action name for this reCAPTCHA execution
 * @returns {Promise<string>} The reCAPTCHA token
 */
function getRecaptchaToken(action = 'submit') {
    return new Promise((resolve, reject) => {
        if (!window.grecaptcha) {
            reject(new Error('reCAPTCHA not loaded. Please refresh the page.'));
            return;
        }

        const isThenable = (value) => value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';

        const readyFn = (grecaptcha.enterprise && typeof grecaptcha.enterprise.ready === 'function')
            ? grecaptcha.enterprise.ready
            : grecaptcha.ready;

        readyFn(() => {
            try {
                const hasEnterprise = !!(grecaptcha.enterprise && typeof grecaptcha.enterprise.execute === 'function');
                const executor = hasEnterprise ? grecaptcha.enterprise.execute : grecaptcha.execute;
                const executorThis = hasEnterprise ? grecaptcha.enterprise : grecaptcha;

                if (typeof executor !== 'function') {
                    reject(new Error('reCAPTCHA execute() is unavailable.'));
                    return;
                }

                const result = executor.call(executorThis, RECAPTCHA_SITE_KEY, { action });
                if (!isThenable(result)) {
                    reject(new Error('reCAPTCHA did not return a promise.'));
                    return;
                }

                result
                    .then((token) => {
                        if (!token || typeof token !== 'string' || token.trim().length === 0) {
                            reject(new Error('reCAPTCHA returned an empty token.'));
                            return;
                        }
                        resolve(token);
                    })
                    .catch((err) => reject(new Error('reCAPTCHA verification failed: ' + (err && err.message ? err.message : String(err)))));
            } catch (err) {
                reject(new Error('reCAPTCHA verification failed: ' + (err && err.message ? err.message : String(err))));
            }
        });
    });
}

// Initialize
function init() {
    console.log('Initializing Estimator Wizard...');
    setupEventListeners();

    // Restore previous session if available
    // if (loadState()) {
    //     restoreSession();
    // } else {
    //     updateFileListUI();
    // }

    // Initialize background particles
    if (typeof tsParticles !== 'undefined') {
        window.tsparticles = tsParticles.load('tsparticles', {
            background: {
                color: { value: 'transparent' }
            },
            particles: {
                color: { value: '#ffffff' },
                links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1 },
                number: { value: 60, density: { enable: true, area: 800 } },
                opacity: { value: 0.3 },
                size: { value: { min: 1, max: 3 } }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: 'grab' }
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.5 } }
                }
            }
        });
    }

    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        gsap.from('.header', { duration: 1, y: -30, opacity: 0, ease: 'power3.out' });
        gsap.from('.wizard-card', { duration: 1, y: 30, opacity: 0, ease: 'power3.out', delay: 0.2 });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function setupEventListeners() {
    // File upload
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');

    if (fileUpload && fileInput) {
        // Keyboard accessibility (label already uses `for`, but this ensures Enter/Space works consistently)
        fileUpload.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInput.click();
            }
        });

        // Handle click to open file dialog
        fileUpload.addEventListener('click', (e) => {
            // Prevent infinite loop if clicking the input itself bubbles up
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', handleFileSelect);

        // Prevent default behaviors for drag events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop zone
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUpload.addEventListener(eventName, () => {
                fileUpload.classList.add('drag-over');
            }, false);
        });

        // Remove highlight
        ['dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, () => {
                fileUpload.classList.remove('drag-over');
            }, false);
        });

        // Handle dropped files
        fileUpload.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleFiles(files);
            }
        });
    }

    // Text input auto-save
    const textInput = document.getElementById('textInput');
    if (textInput) {
        let saveTimeout;
        textInput.addEventListener('input', (e) => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                state.prompt = e.target.value;
                saveState();
            }, 500);
        });
    }

    // User info auto-save
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userCompanyInput = document.getElementById('userCompany');

    if (userNameInput) {
        let nameTimeout;
        userNameInput.addEventListener('input', (e) => {
            clearTimeout(nameTimeout);
            nameTimeout = setTimeout(() => {
                state.userName = e.target.value;
                saveState();
            }, 500);
        });
    }

    if (userEmailInput) {
        let emailTimeout;
        userEmailInput.addEventListener('input', (e) => {
            clearTimeout(emailTimeout);
            emailTimeout = setTimeout(() => {
                state.userEmail = e.target.value;
                saveState();
            }, 500);
        });
    }

    if (userCompanyInput) {
        let companyTimeout;
        userCompanyInput.addEventListener('input', (e) => {
            clearTimeout(companyTimeout);
            companyTimeout = setTimeout(() => {
                state.userCompany = e.target.value;
                saveState();
            }, 500);
        });
    }

    // Buttons
    const btnGenerateQuestions = document.getElementById('generateQuestionsBtn');
    if (btnGenerateQuestions) btnGenerateQuestions.addEventListener('click', handleGenerateQuestions);

    const btnBackToUpload = document.getElementById('backToUploadBtn');
    if (btnBackToUpload) btnBackToUpload.addEventListener('click', () => goToStep(1));

    const btnGenerateEstimate = document.getElementById('generateEstimateBtn');
    if (btnGenerateEstimate) btnGenerateEstimate.addEventListener('click', handleGenerateEstimate);

    const btnStartOver = document.getElementById('startOverBtn');
    if (btnStartOver) btnStartOver.addEventListener('click', handleStartOver);

    const btnExport = document.getElementById('exportBtn');
    if (btnExport) btnExport.addEventListener('click', handleExport);
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
    // Reset input so same files can be selected again if needed
    e.target.value = '';
}

async function handleFiles(fileList) {
    const newFiles = Array.from(fileList);
    const maxSizeMB = 5;
    let processedCount = 0;

    for (const file of newFiles) {
        // Validate file size (max 5MB as recommended)
        if (file.size > maxSizeMB * 1024 * 1024) {
            showNotification(`File ${file.name} is too large. Maximum size is ${maxSizeMB}MB.`, 'error');
            continue;
        }

        // Determine file type
        const ext = file.name.split('.').pop().toLowerCase();
        if (!['txt', 'md', 'pdf'].includes(ext)) {
            showNotification(`File ${file.name} has unsupported type. Please use .txt, .md, or .pdf files.`, 'error');
            continue;
        }

        // Check for duplicates
        if (state.files.some(f => f.name === file.name && f.size === file.size)) {
            showNotification(`File ${file.name} is already added.`, 'warning');
            continue;
        }

        try {
            const fileData = await readFile(file, ext);
            state.files.push(fileData);
            processedCount++;
        } catch (err) {
            console.error(err);
            showNotification(`Failed to read ${file.name}`, 'error');
        }
    }

    if (processedCount > 0) {
        saveState();
        updateFileListUI();
        showNotification(`Added ${processedCount} file${processedCount > 1 ? 's' : ''} successfully!`, 'success');
    }
}

function readFile(file, ext) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Use WASM PDF extraction if available
        if (ext === 'pdf' && window.wasmLoaded) {
            console.log(`Attempting WASM extraction for ${file.name}...`);
            reader.onload = (e) => {
                try {
                    const uint8Array = new Uint8Array(e.target.result);

                    // Preferred path per assets/wasm/loader.js - pass the wasmResult
                    if (typeof window.extractPDFText === 'function') {
                        window.extractPDFText(uint8Array, window.wasmResult)
                            .then((extractedText) => {
                                if (!extractedText || extractedText.trim().length === 0) {
                                    console.warn('WASM extracted empty text, falling back to PDF upload');
                                    fallbackToPDF(file, resolve, reject);
                                    return;
                                }

                                console.log(`Successfully extracted ${extractedText.length} characters from ${file.name} using WASM`);
                                resolve({
                                    name: file.name,
                                    file_type: 'text',
                                    size: file.size,
                                    text: extractedText
                                });
                            })
                            .catch((err) => {
                                console.error('WASM Error during extraction:', err);
                                fallbackToPDF(file, resolve, reject);
                            });
                        return;
                    }

                    // Secondary path if extractor is exposed directly (WASM_INTEGRATION.md style)
                    if (typeof window.extractPDF === 'function') {
                        const result = window.extractPDF(uint8Array);
                        if (result && !result.error && typeof result.text === 'string' && result.text.trim().length > 0) {
                            console.log(`Successfully extracted ${result.text.length} characters from ${file.name} using WASM`);
                            resolve({
                                name: file.name,
                                file_type: 'text',
                                size: file.size,
                                text: result.text
                            });
                            return;
                        }

                        console.warn('WASM extraction returned error/empty result, falling back to PDF upload');
                        fallbackToPDF(file, resolve, reject);
                        return;
                    }

                    console.warn('WASM extractor API not found (extractPDFText/extractPDF), falling back to PDF upload');
                    fallbackToPDF(file, resolve, reject);
                } catch (err) {
                    console.error("WASM Error during extraction:", err);
                    fallbackToPDF(file, resolve, reject);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
            return;
        }

        reader.onload = (e) => {
            const fileObj = {
                name: file.name,
                file_type: ext === 'md' ? 'md' : ext === 'pdf' ? 'pdf' : 'text',
                size: file.size
            };

            if (ext === 'pdf') {
                // For PDF, we store the base64 content (fallback)
                fileObj.content = e.target.result.split(',')[1];
            } else {
                fileObj.text = e.target.result;
            }
            resolve(fileObj);
        };
        reader.onerror = () => reject(reader.error);

        if (ext === 'pdf') {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    });
}

/**
 * Fallback helper to read PDF as DataURL when WASM extraction fails or is unavailable
 */
function fallbackToPDF(file, resolve, reject) {
    const base64Reader = new FileReader();
    base64Reader.onload = (be) => {
        resolve({
            name: file.name,
            file_type: 'pdf',
            size: file.size,
            content: be.target.result.split(',')[1]
        });
    };
    base64Reader.onerror = () => reject(base64Reader.error);
    base64Reader.readAsDataURL(file);
}

function updateFileListUI() {
    const fileListEl = document.getElementById('fileList');
    if (!fileListEl) return;

    fileListEl.innerHTML = '';

    if (!state.files || state.files.length === 0) {
        fileListEl.style.display = 'none';
        return;
    }

    fileListEl.style.display = 'flex';

    state.files.forEach((file, index) => {
        const chip = document.createElement('div');
        chip.className = 'file-chip';

        const icon = document.createElement('span');
        icon.textContent = file.file_type === 'pdf' ? '📕' : '📝';

        const name = document.createElement('span');
        name.className = 'file-chip-name';
        name.textContent = file.name;
        name.title = file.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-chip-remove';
        removeBtn.type = 'button';
        removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFile(index);
        });

        chip.appendChild(icon);
        chip.appendChild(name);
        chip.appendChild(removeBtn);

        fileListEl.appendChild(chip);
    });
}

function removeFile(index) {
    state.files.splice(index, 1);
    saveState();
    updateFileListUI();
}

async function handleGenerateQuestions() {
    // Skip validation in debug mode
    if (!window.ESTIMATOR_DEBUG) {
        if (state.files.length === 0 && !state.prompt.trim()) {
            showNotification('Please upload at least one file or provide instructions.', 'error');
            return;
        }

        // Validate user information
        if (!state.userName.trim()) {
            showNotification('Please enter your name.', 'error');
            return;
        }

        if (!state.userEmail.trim()) {
            showNotification('Please enter your email address.', 'error');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.userEmail.trim())) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
    }

    saveState();

    const button = document.getElementById('generateQuestionsBtn');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '⟳ Generating Questions...';

    // Move to step 2
    goToStep(2, true);

    // Show global loading overlay
    if (window.showGlobalLoader) {
        window.showGlobalLoader(
            'Analyzing your project',
            'Our AI is reading your documents and crafting the right questions to understand your vision.'
        );
    }

    try {
        let data;

        // ── Debug mode: skip real API, simulate delay ──
        if (window.ESTIMATOR_DEBUG) {
            console.log('[DEBUG] Simulating /api/questions ...');
            await _debugDelay();
            data = _mockQuestionsResponse();
            console.log('[DEBUG] Mock questions response:', data);
        } else {
            // Get reCAPTCHA token
            const recaptchaToken = await getRecaptchaToken('questions');

            // Defensive: never call the API without a token (backend treats missing/empty as absent)
            if (!recaptchaToken || typeof recaptchaToken !== 'string' || recaptchaToken.trim().length === 0) {
                throw new Error('reCAPTCHA returned an empty token. Please refresh and try again.');
            }

            const payload = {
                prompt: state.prompt,
                files: state.files.map(f => ({
                    name: f.name,
                    file_type: f.file_type,
                    text: f.text,
                    content: f.content
                })),
                recaptcha_token: recaptchaToken,
                client_name: state.userName,
                client_email: state.userEmail,
                client_company: state.userCompany
            };

            console.log("Sending request to /api/questions with payload:", {
                prompt: payload.prompt,
                files: payload.files.map(f => ({ name: f.name, type: f.file_type, textLength: f.text ? f.text.length : 0, contentSize: f.content ? f.content.length : 0 })),
                hasToken: !!recaptchaToken
            });

            // Call API to generate questions
            const response = await fetch(`${API_BASE_URL}/api/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errorData.error || `API Error (${response.status})`);
            }

            data = await response.json();
        }

        state.questions = data.questions || [];
        state.estimateToken = data.estimate_token; // Save the token for the estimate call
        saveState();

        if (state.questions.length === 0) {
            showNotification('No clarifying questions needed! Document is comprehensive.', 'success');
        } else {
            showNotification(`Generated ${state.questions.length} question${state.questions.length > 1 ? 's' : ''}`, 'success');
        }

        // Hide loader & show step 2 with the questions
        if (window.hideGlobalLoader) window.hideGlobalLoader();
        displayQuestions();
    } catch (error) {
        console.error('Error generating questions:', error);

        // Handle specific error cases
        let errorMessage = error.message;
        if (error.message.includes('reCAPTCHA')) {
            errorMessage = 'Security verification failed. Please refresh the page and try again.';
        }

        // Go back to step 1 on error so the user can retry
        if (window.hideGlobalLoader) window.hideGlobalLoader();
        goToStep(1);

        showError('Failed to generate questions: ' + errorMessage + '. Your progress has been saved - you can try again.');
        showNotification('Error generating questions. ' + errorMessage, 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function displayQuestions() {
    const container = document.getElementById('questionsContainer');
    const buttonsContainer = document.getElementById('questionsButtons');

    if (state.questions.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                <strong>✓ No clarifying questions needed!</strong>
                <p>Your document is comprehensive and clear. We can proceed directly to cost estimation.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <h2>Clarifying Questions</h2>
            <p style="color: #acacac; margin-bottom: 25px;">
                Our AI has identified ${state.questions.length} question${state.questions.length > 1 ? 's' : ''} to help provide a more accurate cost estimate.
                <span style="color: var(--color-light-green, #36C6F0); font-weight: 500;">Your answers are auto-saved.</span>
            </p>
            <div class="questions-list" id="questionsList"></div>
        `;

        const questionsList = document.getElementById('questionsList');
        state.questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <label>Question ${index + 1}</label>
                <div style="color: #fff; margin-bottom: 10px;">${escapeHtml(question)}</div>
                <textarea
                    id="answer-${index}"
                    class="glass-input"
                    placeholder="Enter your answer here..."
                    data-question="${escapeHtml(question)}"
                >${escapeHtml(state.answers[question] || '')}</textarea>
            `;
            questionsList.appendChild(questionItem);

            // Add auto-save for answers
            const textarea = document.getElementById(`answer-${index}`);
            let answerTimeout;
            textarea.addEventListener('input', (e) => {
                clearTimeout(answerTimeout);
                answerTimeout = setTimeout(() => {
                    const answer = e.target.value.trim();
                    if (answer) {
                        state.answers[question] = answer;
                    } else {
                        delete state.answers[question];
                    }
                    saveState();
                }, 500);
            });
        });
    }

    buttonsContainer.style.display = 'flex';
}

async function handleGenerateEstimate() {
    // Collect answers
    state.answers = {};
    state.questions.forEach((question, index) => {
        const answerInput = document.getElementById(`answer-${index}`);
        if (answerInput) {
            const answer = answerInput.value.trim();
            if (answer) {
                state.answers[question] = answer;
            }
        }
    });
    saveState();

    // Validate that we have an estimate token (skip in debug mode)
    if (!window.ESTIMATOR_DEBUG && !state.estimateToken) {
        showNotification('Session expired. Please upload documents again.', 'error');
        goToStep(1);
        return;
    }

    const button = document.getElementById('generateEstimateBtn');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '⟳ Generating Estimate...';

    // Move to step 3
    goToStep(3, true);

    // Show global loading overlay
    if (window.showGlobalLoader) {
        window.showGlobalLoader(
            'Crunching the numbers',
            'Calculating costs, timelines, and recommendations based on your requirements.'
        );
    }

    try {
        let data;

        // ── Debug mode: skip real API, simulate delay ──
        if (window.ESTIMATOR_DEBUG) {
            console.log('[DEBUG] Simulating /api/estimate ...');
            await _debugDelay();
            data = _mockEstimateResponse();
            console.log('[DEBUG] Mock estimate response:', data);
        } else {
            const payload = {
                prompt: state.prompt,
                answers: state.answers,
                files: state.files.map(f => ({
                    name: f.name,
                    file_type: f.file_type,
                    text: f.text,
                    content: f.content
                })),
                client_name: state.userName,
                client_email: state.userEmail,
                client_company: state.userCompany
            };

            // Call API to generate estimate with Bearer token
            const response = await fetch(`${API_BASE_URL}/api/estimate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.estimateToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));

                // Handle 401 specifically
                if (response.status === 401) {
                    throw new Error('Session expired. Please upload documents again.');
                }

                throw new Error(errorData.error || `API Error (${response.status})`);
            }

            data = await response.json();
        }

        state.estimate = data;
        saveState();

        // Hide loader & reveal results
        if (window.hideGlobalLoader) window.hideGlobalLoader();

        showNotification('Estimate generated successfully!', 'success');
        displayResults(data);
    } catch (error) {
        console.error('Error generating estimate:', error);

        // Handle specific error cases
        let errorMessage = error.message;
        if (error.message.includes('Session expired')) {
            // Clear the token and go back to step 1
            state.estimateToken = null;
            saveState();
            if (window.hideGlobalLoader) window.hideGlobalLoader();
            setTimeout(() => goToStep(1), 2000);
        } else {
            // Go back to step 2 on other errors so the user can retry
            if (window.hideGlobalLoader) window.hideGlobalLoader();
            goToStep(2);
        }

        showError('Failed to generate estimate: ' + errorMessage + '. Your answers have been saved - you can try again.');
        showNotification('Error generating estimate. ' + errorMessage, 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function displayResults(data) {
    const container = document.getElementById('resultsContainer');
    const buttonsContainer = document.getElementById('resultsButtons');

    // Format cost breakdown
    let costBreakdownHTML = '';
    if (data.cost_breakdown && Array.isArray(data.cost_breakdown) && data.cost_breakdown.length > 0) {
        costBreakdownHTML = data.cost_breakdown.map((item, index) => `
            <div class="cost-item">
                <div>
                    <div class="cost-item-title">${index + 1}. ${escapeHtml(item.item)}</div>
                    <div style="font-size: 0.9rem; font-weight: 400; color: var(--text-muted); margin-top: 5px;">${item.hours || 0} hours @ ${item.unit_price || 0} ${escapeHtml(data.currency || '')}/hr</div>
                    ${item.description ? `<div style="font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-top: 10px;">${marked.parseInline(item.description || '')}</div>` : ''}
                </div>
                <div class="cost-item-value">${Number(item.total || 0).toLocaleString()} ${escapeHtml(data.currency || '')}</div>
            </div>
        `).join('');
    }

    // Format key insights
    let insightsHTML = '';
    if (data.key_insights && Array.isArray(data.key_insights) && data.key_insights.length > 0) {
        insightsHTML = data.key_insights.map(insight => `<li>${marked.parseInline(insight || '')}</li>`).join('');
    }

    // Format action items
    let actionsHTML = '';
    if (data.action_items && Array.isArray(data.action_items) && data.action_items.length > 0) {
        actionsHTML = data.action_items.map(action => `<li>${marked.parseInline(action || '')}</li>`).join('');
    }

    container.innerHTML = `
        <div class="results-dashboard">
            <h2 style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 0;">Estimated Investment</h2>
            <div class="price-display cost-total" id="costTotalAnim">${Number(data.total_cost || 0).toLocaleString()} ${escapeHtml(data.currency || '')}</div>
            <p style="font-size: 1.2rem; color: var(--aurora-1);">Based on ${escapeHtml(String(data.total_hours || 0))} estimated hours.</p>
            
            <div class="cost-breakdown">${costBreakdownHTML}</div>

            <div style="margin-top: 40px; text-align: left; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                <h4 style="color: var(--aurora-2); margin-bottom: 15px; font-size: 1.2rem;">📝 Executive Summary</h4>
                <div style="line-height: 1.6; color: rgba(255,255,255,0.8);">${marked.parse(data.summary || 'Summary not available.')}</div>
            </div>

            ${insightsHTML ? `
            <div style="margin-top: 20px; text-align: left; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                <h4 style="color: var(--aurora-3); margin-bottom: 15px; font-size: 1.2rem;">💡 Key Insights</h4>
                <ul style="color: rgba(255,255,255,0.7); line-height: 1.6; padding-left: 20px;">${insightsHTML}</ul>
            </div>` : ''}

            ${actionsHTML ? `
            <div style="margin-top: 20px; text-align: left; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                <h4 style="color: var(--aurora-1); margin-bottom: 15px; font-size: 1.2rem;">✅ Action Items</h4>
                <ul style="color: rgba(255,255,255,0.7); line-height: 1.6; padding-left: 20px;">${actionsHTML}</ul>
            </div>` : ''}
        </div>
    `;

    buttonsContainer.style.display = 'flex';

    // Hook in GSAP safely for Dashboard result
    if (typeof gsap !== 'undefined') {
        const totalNumber = document.getElementById('costTotalAnim');
        if (totalNumber && data.total_cost) {
            const costObj = { val: 0 };
            gsap.to(costObj, {
                val: Number(data.total_cost || 0),
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                    totalNumber.innerHTML = Math.round(costObj.val).toLocaleString() + ' ' + escapeHtml(data.currency || '');
                }
            });
        }
        gsap.from('.cost-item', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
    }
}

function showError(message) {
    const container = document.querySelector('.step-content.active > div:first-child');
    if (container) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-warning';
        errorDiv.style.marginBottom = '20px';
        errorDiv.innerHTML = `
            <strong>⚠️ Error</strong>
            <p>${escapeHtml(message)}</p>
            <p style="margin-top: 10px; font-size: 0.9em;">
                Make sure the Go server is running:
                <code style="background: rgba(255, 255, 255, 0.1); padding: 5px 10px; border-radius: 4px; display: inline-block; margin-top: 5px;">
                    cd cmd/server && go run .
                </code>
            </p>
        `;
        container.insertBefore(errorDiv, container.firstChild);
    }
}

function goToStep(step, skipAnimation) {
    state.currentStep = step;
    saveState();

    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.stepIndicator);
        stepEl.classList.remove('active', 'completed');

        if (stepNum === step) {
            stepEl.classList.add('active');
        } else if (stepNum < step) {
            stepEl.classList.add('completed');
        }
    });

    // Update content
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
        // Clear any leftover GSAP inline styles so CSS classes take effect
        if (typeof gsap !== 'undefined') {
            gsap.set(content, { clearProps: 'all' });
        }
    });
    const targetContent = document.querySelector(`.step-content[data-step="${step}"]`);
    if (targetContent) {
        targetContent.classList.add('active');
        if (!skipAnimation && typeof gsap !== 'undefined') {
            gsap.fromTo(targetContent, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
        }
    }
}

function handleStartOver() {
    if (confirm('Are you sure you want to start over? All saved data will be cleared.')) {
        clearState();

        // Clear inputs
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.value = '';
        }
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';

        const userNameInput = document.getElementById('userName');
        if (userNameInput) userNameInput.value = '';
        const userEmailInput = document.getElementById('userEmail');
        if (userEmailInput) userEmailInput.value = '';
        const userCompanyInput = document.getElementById('userCompany');
        if (userCompanyInput) userCompanyInput.value = '';

        updateFileListUI();

        // Clear displayed content
        const questionsContainer = document.getElementById('questionsContainer');
        if (questionsContainer) questionsContainer.innerHTML = '';
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) resultsContainer.innerHTML = '';

        // Go back to step 1
        goToStep(1);

        showNotification('Started fresh! Your previous session has been cleared.', 'success');
    }
}

function handleExport(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;

    const resultsHTML = resultsContainer.innerHTML;

    if (!resultsHTML || !resultsHTML.trim()) {
        showNotification('No estimate found to print yet.', 'warning');
        return;
    }

    const printMarkup = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Cost Estimation Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
                .cost-summary { background: #f0f0f0; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
                .cost-total { font-size: 2rem; color: #28a745; font-weight: bold; }
                .cost-hours { font-size: 1.2rem; color: #666; margin-top: 5px; }
                .section { margin-bottom: 30px; }
                h3, h4 { color: #667eea; }
                .cost-item, .insight-item, .action-item {
                    border: 1px solid #e0e0e0;
                    padding: 15px;
                    margin-bottom: 10px;
                    border-radius: 6px;
                    break-inside: avoid;
                }
                .cost-item-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
                .cost-item-details {
                    color: #666;
                    font-size: 0.9em;
                }
                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>
        <body>
            <h1 style="color: #667eea;">Cost Estimation Report</h1>
            <p style="color: #666; margin-bottom: 30px;">Generated on ${new Date().toLocaleString()}</p>
            ${resultsHTML}
        </body>
        </html>
    `;

    // Print through a hidden iframe to avoid opening a visible popup window.
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.position = 'fixed';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.right = '-9999px';
    iframe.style.bottom = '-9999px';

    const cleanup = () => {
        if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    };

    iframe.onload = () => {
        const frameWindow = iframe.contentWindow;
        if (!frameWindow) {
            cleanup();
            showNotification('Unable to open print preview.', 'error');
            return;
        }

        let cleanedUp = false;
        const cleanupOnce = () => {
            if (cleanedUp) return;
            cleanedUp = true;
            cleanup();
        };

        frameWindow.onafterprint = cleanupOnce;
        setTimeout(() => {
            try {
                frameWindow.focus();
                frameWindow.print();
            } catch (err) {
                console.error('Print failed:', err);
                showNotification('Printing failed. Please try again.', 'error');
                cleanupOnce();
                return;
            }

            // Fallback cleanup for browsers that do not fire onafterprint reliably.
            setTimeout(cleanupOnce, 1000);
        }, 100);
    };

    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
    if (!iframeDoc) {
        cleanup();
        showNotification('Unable to prepare print document.', 'error');
        return;
    }

    iframeDoc.open();
    iframeDoc.write(printMarkup);
    iframeDoc.close();
}

// Restore session state
function restoreSession() {
    // Restore text input
    const textInput = document.getElementById('textInput');
    if (textInput && state.prompt) {
        textInput.value = state.prompt;
    }

    // Restore user info
    const userNameInput = document.getElementById('userName');
    if (userNameInput && state.userName) {
        userNameInput.value = state.userName;
    }
    const userEmailInput = document.getElementById('userEmail');
    if (userEmailInput && state.userEmail) {
        userEmailInput.value = state.userEmail;
    }
    const userCompanyInput = document.getElementById('userCompany');
    if (userCompanyInput && state.userCompany) {
        userCompanyInput.value = state.userCompany;
    }

    // Restore file list
    if (state.files.length > 0) {
        updateFileListUI();
    }

    // Restore questions if on step 2 or later
    if (state.currentStep >= 2 && state.questions.length > 0) {
        displayQuestions();
    }

    // Restore estimate if on step 3
    if (state.currentStep === 3 && state.estimate) {
        displayResults(state.estimate);
    }

    // Go to the saved step
    goToStep(state.currentStep);

    showNotification('Previous session restored! You can continue where you left off.', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        font-size: 0.95rem;
        line-height: 1.5;
    `;
    notification.textContent = message;

    // Add animation styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Utility function to escape HTML
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
