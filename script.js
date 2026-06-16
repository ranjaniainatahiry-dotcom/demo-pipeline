// ============================================
// 1. PIPELINE ANIMATION
// ============================================
const steps = document.querySelectorAll('.step');
const progressFill = document.querySelector('.progress-fill');
const statusText = document.querySelector('.status-text');

let currentStep = 0;
const totalSteps = steps.length;

function runPipeline() {
    if (currentStep < totalSteps) {
        // Activer l'étape courante
        steps[currentStep].classList.add('active');
        
        // Mettre à jour la barre de progression
        const progress = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = progress + '%';
        
        // Mettre à jour le texte
        const labels = ['Scraping', 'Transformation', 'Stockage', 'AI Analysis', 'Dashboard'];
        statusText.textContent = `⏳ Pipeline en cours : ${labels[currentStep]}...`;
        
        currentStep++;
        setTimeout(runPipeline, 1200);
    } else {
        statusText.textContent = '✅ Pipeline terminé ! Toutes les données sont à jour. 🚀';
        progressFill.style.width = '100%';
    }
}

// Démarrer après 1 seconde
setTimeout(runPipeline, 1000);

// ============================================
// 2. CHARTS (Chart.js)
// ============================================

// Couleurs
const colors = {
    yellow: '#fbbf24',
    yellowDark: '#f59e0b',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#34d399',
    red: '#ef4444',
    gray: '#6b7280'
};

// 2.1 - Tendances (ligne)
const trendsCtx = document.getElementById('trendsChart').getContext('2d');
new Chart(trendsCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'SoundMax Pro',
                data: [65, 72, 80, 85, 120, 145],
                borderColor: colors.yellow,
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'SmartHome Hub',
                data: [40, 55, 60, 70, 75, 90],
                borderColor: colors.blue,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: '#a0a0b0', font: { size: 12 } }
            }
        },
        scales: {
            x: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } },
            y: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } }
        }
    }
});

// 2.2 - Top produits (barres horizontales)
const productsCtx = document.getElementById('productsChart').getContext('2d');
new Chart(productsCtx, {
    type: 'bar',
    data: {
        labels: ['SoundMax Pro', 'SmartHub X1', 'FitBand 5', 'ChargeBoost', 'Lumina Light'],
        datasets: [{
            label: 'Ventes estimées (unités)',
            data: [1450, 1200, 980, 850, 720],
            backgroundColor: ['#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6', '#34d399'],
            borderRadius: 6
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } },
            y: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } }
        }
    }
});

// 2.3 - Prix par catégorie (barres)
const pricesCtx = document.getElementById('pricesChart').getContext('2d');
new Chart(pricesCtx, {
    type: 'bar',
    data: {
        labels: ['Audio', 'Smart Home', 'Fitness', 'Accessoires', 'Lumière'],
        datasets: [{
            label: 'Prix moyen ($)',
            data: [89, 135, 55, 32, 48],
            backgroundColor: ['#fbbf24', '#3b82f6', '#34d399', '#8b5cf6', '#f59e0b'],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } },
            y: { ticks: { color: '#a0a0b0' }, grid: { color: '#1a1a2e' } }
        }
    }
});

// 2.4 - Distribution des avis (donut)
const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
new Chart(ratingsCtx, {
    type: 'doughnut',
    data: {
        labels: ['⭐ 5', '⭐ 4', '⭐ 3', '⭐ 2', '⭐ 1'],
        datasets: [{
            data: [45, 30, 15, 7, 3],
            backgroundColor: ['#34d399', '#fbbf24', '#f59e0b', '#f97316', '#ef4444'],
            borderColor: '#14141e',
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: { color: '#a0a0b0', font: { size: 12 } }
            }
        },
        cutout: '65%'
    }
});

// ============================================
// 3. INTERACTIVITÉ - Clic sur les étapes
// ============================================
steps.forEach((step, index) => {
    step.addEventListener('click', function() {
        steps.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        const labels = ['Scraping', 'Transformation', 'Stockage', 'AI Analysis', 'Dashboard'];
        statusText.textContent = `🔍 Détail : ${labels[index]}`;
        
        // Réinitialiser la barre
        const progress = ((index + 1) / totalSteps) * 100;
        progressFill.style.width = progress + '%';
    });
});
