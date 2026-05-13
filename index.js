// Basic functionality for the ESUT Computer Science Platform

// Page navigation
let currentPage = 'home';

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation items - Page switching
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the page to navigate to
            const targetPage = this.getAttribute('data-page');
            
            if (targetPage) {
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all pages
                const allPages = document.querySelectorAll('.page-content');
                allPages.forEach(page => page.classList.remove('active'));
                
                // Show the target page
                const targetPageElement = document.getElementById(targetPage + '-page');
                if (targetPageElement) {
                    targetPageElement.classList.add('active');
                    currentPage = targetPage;
                }
            }
        });
    });
    
    // Level filter buttons (for home page)
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            levelButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected level
            const selectedLevel = this.getAttribute('data-level');
            
            // Filter posts (only on home page)
            if (currentPage === 'home') {
                filterPosts(selectedLevel);
            }
        });
    });
    
    // Post composer auto-resize
    const composerInputs = document.querySelectorAll('.composer-input');
    
    composerInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Submit buttons
    const submitBtns = document.querySelectorAll('.submit-btn');
    
    submitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const composer = this.closest('.post-composer');
            const input = composer.querySelector('.composer-input');
            const content = input.value.trim();
            
            if (content) {
                // Determine which page we're on
                let postType = 'announcement';
                if (currentPage === 'marketing') {
                    postType = 'marketing post';
                } else if (currentPage === 'textbooks') {
                    postType = 'textbook post';
                }
                
                console.log(`Posting ${postType}:`, content);
                alert(`${postType.charAt(0).toUpperCase() + postType.slice(1)} functionality will be implemented in the next phase!`);
                input.value = '';
                input.style.height = 'auto';
            }
        });
    });
    
    // Lecturer login button
    const lecturerLoginBtn = document.querySelector('.lecturer-login-btn');
    
    if (lecturerLoginBtn) {
        lecturerLoginBtn.addEventListener('click', function() {
            alert('Lecturer login functionality will be implemented in the next phase!');
        });
    }
    
    // View Decision Room button
    const viewAllBtn = document.querySelector('.view-all-btn');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            alert('Decision Room will be implemented in the next phase!');
        });
    }
    
    // Post announcement button (left sidebar)
    const postBtn = document.querySelector('.post-btn');
    
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            // Navigate to home page if not already there
            if (currentPage !== 'home') {
                const homeNav = document.querySelector('.nav-item[data-page="home"]');
                if (homeNav) {
                    homeNav.click();
                }
            }
            
            // Focus on composer
            setTimeout(() => {
                const composer = document.querySelector('#home-page .composer-input');
                if (composer) {
                    composer.focus();
                    composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
    }
    
    // Results filter functionality
    const semesterFilter = document.getElementById('semesterFilter');
    const levelFilterDropdown = document.getElementById('levelFilter');
    
    if (semesterFilter) {
        semesterFilter.addEventListener('change', function() {
            filterResults();
        });
    }
    
    if (levelFilterDropdown) {
        levelFilterDropdown.addEventListener('change', function() {
            filterResults();
        });
    }
    
});

// Filter posts by level (for home page)
function filterPosts(level) {
    const posts = document.querySelectorAll('#home-page .post');
    
    posts.forEach(post => {
        const postMeta = post.querySelector('.post-meta');
        
        if (!postMeta) return;
        
        const levelTag = postMeta.textContent;
        
        if (level === 'all') {
            post.style.display = 'flex';
        } else {
            // Check if post includes the selected level
            const levelMatch = levelTag.toLowerCase().includes(level);
            const allLevels = levelTag.toLowerCase().includes('all levels');
            
            if (levelMatch || allLevels) {
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        }
    });
    
    console.log(`Filtering by: ${level}`);
}

// Filter results by semester and level
function filterResults() {
    const semesterFilter = document.getElementById('semesterFilter');
    const levelFilter = document.getElementById('levelFilter');
    
    const selectedSemester = semesterFilter ? semesterFilter.value : '';
    const selectedLevel = levelFilter ? levelFilter.value : '';
    
    const resultPosts = document.querySelectorAll('#results-page .post');
    
    resultPosts.forEach(post => {
        let showPost = true;
        
        // For now, just log the filters (actual filtering will be implemented with backend)
        // In a real implementation, posts would have data attributes for semester and level
        
        post.style.display = 'flex'; // Show all for now
    });
    
    console.log(`Filtering results - Semester: ${selectedSemester}, Level: ${selectedLevel}`);
    
    if (selectedSemester || selectedLevel) {
        alert('Results filtering will be fully functional once backend is connected!');
    }
}

// Utility function for future use - format date/time
function formatTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // difference in seconds
    
    if (diff < 60) {
        return 'Just now';
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes}m`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours}h`;
    } else {
        const days = Math.floor(diff / 86400);
        return `${days}d`;
    }
}

// Console message
console.log('ESUT Computer Science Department Platform - v2.0');
console.log('Technology for Service');
console.log('New Features: Results, Marketing Forum, Textbook Exchange');
