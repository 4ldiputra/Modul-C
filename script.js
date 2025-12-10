let currentProgress = 0;
const totalSections = 12;

// Mapping section ID ke file HTML
const sectionFiles = {
    'intro': 'sections/intro.html',
    'basics': 'sections/basics.html',
    'operators': 'sections/operators.html',
    'control': 'sections/control.html',
    'loops': 'sections/loops.html',
    'arrays': 'sections/arrays.html',
    'functions': 'sections/functions.html',
    'structures': 'sections/structures.html',
    'memory': 'sections/memory.html',
    'files': 'sections/files.html',
    'sorting': 'sections/sorting.html',
    'searching': 'sections/searching.html',
    'advanced': 'sections/advanced.html'
};

function showSection(sectionId) {
    // Hide navigation
    document.getElementById('navigation').style.display = 'none';
    
    // Load section content
    loadSectionContent(sectionId);
    
    // Update progress
    updateProgress(sectionId);
    
    // Smooth scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function loadSectionContent(sectionId) {
    const contentContainer = document.getElementById('content-container');
    
    fetch(sectionFiles[sectionId])
        .then(response => response.text())
        .then(html => {
            contentContainer.innerHTML = html;
            contentContainer.querySelector('.content-section').classList.add('active');
        })
        .catch(error => {
            console.error('Error loading section:', error);
            contentContainer.innerHTML = '<div class="content-section active"><p>Error loading content.</p></div>';
        });
}

function showNavigation() {
    // Clear content
    document.getElementById('content-container').innerHTML = '';
    
    // Show navigation
    document.getElementById('navigation').style.display = 'block';
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
    
    // Smooth scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function updateProgress(sectionId) {
    const sectionIds = ['intro', 'basics', 'operators', 'control', 'loops', 'arrays', 'functions', 'structures', 'memory', 'files', 'sorting', 'advanced'];
    const currentIndex = sectionIds.indexOf(sectionId);
    const progressPercent = ((currentIndex + 1) / totalSections) * 100;
    
    document.getElementById('progressFill').style.width = progressPercent + '%';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add interactivity features
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            showNavigation();
        }
    });

    // Double-click to copy code (delegated event)
    document.addEventListener('dblclick', function(e) {
        if (e.target.closest('.code-block')) {
            const block = e.target.closest('.code-block');
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(block);
            selection.removeAllRanges();
            selection.addRange(range);
            
            try {
                document.execCommand('copy');
                block.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    block.style.backgroundColor = '#f8f9fa';
                }, 500);
            } catch (err) {
                console.log('Copy failed');
            }
            
            selection.removeAllRanges();
        }
    });
});