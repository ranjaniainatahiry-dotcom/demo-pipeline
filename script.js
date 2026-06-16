// ============================================
// 1. THEME TOGGLE (Clair/Sombre)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ============================================
// 2. ANIMATION DES STATS (Comptage)
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const isFloat = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = progress * target;

            if (isFloat) {
                stat.textContent = value.toFixed(1);
            } else {
                stat.textContent = Math.round(value);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (isFloat) {
                    stat.textContent = target.toFixed(1);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            }
        }
        requestAnimationFrame(update);
    });
}

// ============================================
// 3. PIPELINE ANIMATION
// ============================================
const steps = document.querySelectorAll('.pipeline-step');
const progressFill = document.querySelector('.progress-fill');
const progressLabel = document.querySelector('.progress-label');
const pipelineMessage = document.querySelector('.pipeline-message span');
const startBtn = document.getElementById('startPipeline');
let isRunning = false;

const stepLabels = ['Collecte', 'Transformation', 'Stockage', 'IA Analysis', 'Dashboard'];
const stepIcons = ['fa-spider', 'fa-cogs', 'fa-database', 'fa-brain', 'fa-chart-pie'];
const stepStatuses = document.querySelectorAll('.step-status');

function resetPipeline() {
    steps.forEach(step => step.classList.remove('active'));
    stepStatuses.forEach(status => {
        status.textContent = 'En attente';
        status.className = 'step-status';
    });
    progressFill.style.width = '0%';
    progressLabel.textContent = '0%';
    pipelineMessage.textContent = 'Pipeline prêt à démarrer';
    startBtn.disabled = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Démarrer';
    isRunning = false;
}

function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> En cours...';

    let currentStep = 0;
    const totalSteps = steps.length;

    function executeStep() {
        if (currentStep >= totalSteps) {
            // Pipeline terminé
            pipelineMessage.textContent = '✅ Pipeline terminé ! Toutes les données sont à jour. 🚀';
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-redo"></i> Rejouer';
            isRunning = false;

            // Marquer toutes les étapes comme terminées
            stepStatuses.forEach(status => {
                status.textContent = '✅ Terminé';
                status.className = 'step-status done';
            });
            return;
        }

        // Activer l'étape courante
        steps[currentStep].classList.add('active');
        stepStatuses[currentStep].textContent = '⏳ En cours';
        stepStatuses[currentStep].className = 'step-status active';

        // Mettre à jour la progression
        const progress = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = progress + '%';
        progressLabel.textContent = Math.round(progress) + '%';
        pipelineMessage.textContent = `⏳ Pipeline : ${stepLabels[currentStep]}...`;

        // Désactiver les étapes précédentes (optionnel)
        if (currentStep > 0) {
            stepStatuses[currentStep - 1].textContent = '✅ Terminé';
            stepStatuses[currentStep - 1].className = 'step-status done';
        }

        currentStep++;
        setTimeout(executeStep, 1200);
    }

    executeStep();
}

startBtn.addEventListener('click', () => {
    if (isRunning) return;
    // Reset si déjà terminé
    if (progressFill.style.width === '100%') {
        resetPipeline();
    }
    runPipeline();
});

// ============================================
// 4. CHART.JS – GRAPHIQUES
// ============================================
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
const textColor = isDark ? '#94a3b8' : '#475569';
const gridColor = isDark ? '#334155' : '#e2e8f0';

// Couleurs
const colors = {
    blue: '#2563eb',
    blueLight: '#3b82f6',
    purple: '#7c3aed',
    green: '#16a34a',
    red: '#ef4444',
    orange: '#d97706',
    yellow: '#fbbf24',
    pink: '#db2777',
};

// 4.1 – Tendances
const trendsCtx = document.getElementById('trendsChart').getContext('2d');
new Chart(trendsCtx, {
    type: 'line',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
        datasets: [
            {
                label: 'SoundMax Pro',
                data: [65, 72, 80, 85, 120, 145, 158, 170],
                borderColor: colors.blue,
                backgroundColor: isDark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: colors.blue,
            },
            {
                label: 'SmartHub X1',
                data: [40, 55, 60, 70, 75, 90, 95, 102],
                borderColor: colors.purple,
                backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: colors.purple,
            },
            {
                label: 'FitBand 5',
                data: [30, 35, 42, 48, 52, 58, 62, 68],
                borderColor: colors.green,
                backgroundColor: isDark ? 'rgba(22, 163, 74, 0.15)' : 'rgba(22, 163, 74, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: colors.green,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    font: { size: 10, family: 'Inter' },
                    boxWidth: 12,
                    padding: 8,
                }
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor, drawBorder: false }
            },
            y: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor, drawBorder: false }
            }
        }
    }
});

// 4.2 – Top produits
const productsCtx = document.getElementById('productsChart').getContext('2d');
new Chart(productsCtx, {
    type: 'bar',
    data: {
        labels: ['SoundMax Pro', 'SmartHub X1', 'FitBand 5', 'ChargeBoost', 'Lumina Light', 'EcoCook'],
        datasets: [{
            label: 'Ventes estimées (unités)',
            data: [1450, 1200, 980, 850, 720, 680],
            backgroundColor: [
                colors.blue, colors.purple, colors.green,
                colors.orange, colors.pink, colors.yellow
            ],
            borderRadius: 6,
            borderSkipped: false,
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return context.parsed.x + ' unités';
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { color: gridColor, drawBorder: false }
            },
            y: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { display: false }
            }
        }
    }
});

// 4.3 – Prix par catégorie
const pricesCtx = document.getElementById('pricesChart').getContext('2d');
new Chart(pricesCtx, {
    type: 'bar',
    data: {
        labels: ['Audio', 'Smart Home', 'Fitness', 'Accessoires', 'Lumière', 'Cuisine'],
        datasets: [{
            label: 'Prix moyen (€)',
            data: [89, 135, 55, 32, 48, 112],
            backgroundColor: [
                colors.blue, colors.purple, colors.green,
                colors.orange, colors.pink, colors.yellow
            ],
            borderRadius: 6,
            borderSkipped: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return '€' + context.parsed.y;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: textColor, font: { size: 10 } },
                grid: { display: false }
            },
            y: {
                ticks: { 
                    color: textColor, 
                    font: { size: 10 },
                    callback: function(value) {
                        return '€' + value;
                    }
                },
                grid: { color: gridColor, drawBorder: false }
            }
        }
    }
});

// 4.4 – Distribution des avis
const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
new Chart(ratingsCtx, {
    type: 'doughnut',
    data: {
        labels: ['⭐ 5 (45%)', '⭐ 4 (30%)', '⭐ 3 (15%)', '⭐ 2 (7%)', '⭐ 1 (3%)'],
        datasets: [{
            data: [45, 30, 15, 7, 3],
            backgroundColor: ['#22c55e', '#fbbf24', '#f59e0b', '#f97316', '#ef4444'],
            borderColor: isDark ? '#1e293b' : '#ffffff',
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: textColor,
                    font: { size: 10, family: 'Inter' },
                    boxWidth: 12,
                    padding: 8,
                    usePointStyle: true,
                }
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return context.parsed + '% des avis';
                    }
                }
            }
        }
    }
});

// ============================================
// 5. FILTRES DASHBOARD
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Simuler un changement de période
        const period = this.getAttribute('data-period');
        const message = document.createElement('div');
        message.style.cssText = `
            text-align: center;
            padding: 8px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-top: 12px;
            font-size: 0.85rem;
            color: var(--text-secondary);
        `;
        message.textContent = `📊 Données filtrées : ${period} jours`;

        const container = this.closest('.dashboard-filters');
        const existing = container.querySelector('.filter-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'filter-message';
        msg.style.cssText = `
            text-align: center;
            padding: 6px 12px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-top: 10px;
            font-size: 0.75rem;
            color: var(--text-muted);
        `;
        msg.textContent = `📊 Filtre : ${period} jours – données mises à jour`;

        // Supprimer l'ancien message s'il existe
        const oldMsg = container.parentElement.querySelector('.filter-message');
        if (oldMsg) oldMsg.remove();

        container.parentElement.appendChild(msg);
        setTimeout(() => {
            if (msg.parentElement) msg.remove();
        }, 3000);
    });
});

// ============================================
// 6. INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Démarrer les animations des stats
    setTimeout(animateStats, 300);

    // Démarrer le pipeline automatiquement après 1.5s
    setTimeout(() => {
        if (!isRunning && progressFill.style.width !== '100%') {
            runPipeline();
        }
    }, 1500);
});

// ============================================
// 7. DARK MODE – Mise à jour des graphiques
// ============================================
// Note: Chart.js ne supporte pas nativement le re-render dynamique.
// Pour simplifier, on pourrait re-créer les graphiques, mais ici
// on laisse la version initiale. Les graphiques restent lisibles.
// Pour une version parfaite, on pourrait utiliser un observer.

// ============================================
// 8. MODE DÉMO AUTOMATIQUE
// ============================================
const isDemoMode = new URLSearchParams(window.location.search).get('demo') === 'true';

if (isDemoMode) {
    console.log('🎬 Mode démo automatique activé');
    
    // Désactiver le scroll manuel
    document.body.style.overflow = 'hidden';
    
    const sections = [
        '#pipeline',
        '#dashboard', 
        '#insights',
        '#reporting',
        '#documentation'
    ];
    
    let currentSection = 0;
    let isScrolling = false;
    
    function autoScroll() {
        if (isScrolling) return;
        isScrolling = true;
        
        const target = document.querySelector(sections[currentSection]);
        if (!target) {
            isScrolling = false;
            return;
        }
        
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Mettre en évidence l'élément
        target.style.transition = 'box-shadow 0.5s ease';
        target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.3)';
        setTimeout(() => {
            target.style.boxShadow = 'none';
        }, 2000);
        
        currentSection = (currentSection + 1) % sections.length;
        
        setTimeout(() => {
            isScrolling = false;
            // Si on est à la fin, recommencer
            if (currentSection === 0) {
                setTimeout(autoScroll, 2000);
            } else {
                setTimeout(autoScroll, 3000);
            }
        }, 3000);
    }
    
    // Démarrer après 2 secondes
    setTimeout(() => {
        // Lancer le pipeline automatiquement
        if (typeof runPipeline === 'function') {
            runPipeline();
        }
        setTimeout(autoScroll, 3000);
    }, 2000);
    
    // Afficher un indicateur "Démo automatique"
    const demoBanner = document.createElement('div');
    demoBanner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(37, 99, 235, 0.95);
        color: white;
        padding: 10px 24px;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(10px);
        cursor: pointer;
    `;
    demoBanner.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s infinite;"></span>
            🎬 Démo automatique en cours
        </span>
        <span style="opacity: 0.6; font-weight: 400; font-size: 0.7rem;">
            (cliquez pour arrêter)
        </span>
    `;
    
    demoBanner.addEventListener('click', function() {
        // Arrêter la démo et supprimer la bannière
        window.location.href = window.location.pathname;
    });
    
    document.body.appendChild(demoBanner);
    
    // Ajouter le style pour le pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 9. MODE EMBED (?embed=true)
// ============================================
const isEmbedMode = new URLSearchParams(window.location.search).get('embed') === 'true';

if (isEmbedMode) {
    console.log('📦 Mode embed activé');
    
    // Cacher les éléments superflus
    const elementsToHide = [
        document.querySelector('nav.navbar'),
        document.querySelector('footer.footer'),
        document.querySelector('.hero'),
        document.querySelector('.pipeline-controls'),
    ];
    
    elementsToHide.forEach(el => {
        if (el) {
            el.style.display = 'none';
        }
    });
    
    // Réduire les marges
    document.querySelectorAll('section').forEach(section => {
        section.style.padding = '20px 0';
        section.style.minHeight = 'auto';
    });
    
    // Ajuster la hauteur pour l'embed
    document.body.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.background = 'var(--bg-primary)';
    
    // Ajouter un petit indicateur "Embed mode"
    const embedIndicator = document.createElement('div');
    embedIndicator.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(37, 99, 235, 0.1);
        backdrop-filter: blur(8px);
        color: var(--text-secondary);
        padding: 4px 12px;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 0.6rem;
        font-weight: 500;
        border: 1px solid var(--border-color);
        z-index: 999;
    `;
    embedIndicator.textContent = '📦 Mode embed';
    document.body.appendChild(embedIndicator);
}
