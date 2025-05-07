// Sample data for carousels
const popularContent = [
    {
        icon: "fa-magnifying-glass-chart",
        title: "SEO Strategy",
        description: "Comprehensive search engine optimization to improve visibility and drive qualified traffic."
    },
    {
        icon: "fa-chart-pie",
        title: "Business Intelligence",
        description: "Data analytics and insights to inform strategic business decisions."
    },
    {
        icon: "fa-bullhorn",
        title: "Content Marketing",
        description: "Engaging, SEO-optimized content that connects with your target audience."
    },
    {
        icon: "fa-comments-dollar",
        title: "Paid Advertising",
        description: "Strategic PPC campaigns to maximize ROI and accelerate growth."
    },
    {
        icon: "fa-code",
        title: "Technical SEO",
        description: "Website optimization for search engines and improved user experience."
    },
    {
        icon: "fa-link",
        title: "Link Building",
        description: "Ethical backlink strategies to boost authority and rankings."
    }
];

const trendingContent = [
    {
        icon: "fa-building",
        title: "LA Real Estate Firm",
        description: "140% increase in organic traffic within 6 months through local SEO strategy."
    },
    {
        icon: "fa-utensils",
        title: "Restaurant Chain",
        description: "Doubled online reservations through targeted local search campaigns."
    },
    {
        icon: "fa-laptop",
        title: "Tech Startup",
        description: "Achieved first page rankings for competitive keywords, increasing leads by 85%."
    },
    {
        icon: "fa-shirt",
        title: "Fashion Retailer",
        description: "Ecommerce conversion rate increased by 65% through data-driven UX improvements."
    }
];

const newContent = [
    {
        icon: "fa-user-tie",
        title: "John D., CEO",
        description: "\"Holistic Growth transformed our digital presence. Their SEO expertise has been invaluable to our business growth.\""
    },
    {
        icon: "fa-user-tie",
        title: "Sarah M., Marketing Director",
        description: "\"The BI insights we've gained have completely changed our marketing strategy for the better.\""
    },
    {
        icon: "fa-user-tie",
        title: "Michael K., Founder",
        description: "\"Working with Holistic Growth has been the best marketing decision we've made for our startup.\""
    }
];

// Function to populate carousels
function populateCarousel(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    items.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        const icon = document.createElement('i');
        icon.className = `fas ${item.icon}`;
        
        const title = document.createElement('h3');
        title.textContent = item.title;
        
        const description = document.createElement('p');
        description.textContent = item.description;
        
        carouselItem.appendChild(icon);
        carouselItem.appendChild(title);
        carouselItem.appendChild(description);
        container.appendChild(carouselItem);
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation function
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Dashboard initialization
function initDashboard() {
    // Tab switching
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Set active tab
            document.querySelector('.dashboard-tab.active').classList.remove('active');
            tab.classList.add('active');
            
            // Show corresponding panel
            const panelId = `${tab.dataset.tab}-panel`;
            document.querySelector('.dashboard-panel.active').classList.remove('active');
            document.getElementById(panelId).classList.add('active');
            
            // Redraw charts for the active panel
            createCharts(tab.dataset.tab);
        });
    });
    
    // Initialize charts for the initial active tab
    createCharts('acquisition');
    
    // Time range selector
    document.getElementById('time-range').addEventListener('change', () => {
        const activeTab = document.querySelector('.dashboard-tab.active').dataset.tab;
        createCharts(activeTab);
    });
    
    // Add animations to dashboard metrics
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metrics = entry.target.querySelectorAll('.metric-card');
                metrics.forEach((metric, index) => {
                    setTimeout(() => {
                        metric.style.opacity = '1';
                        metric.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.dashboard-metrics').forEach(metricSection => {
        const metrics = metricSection.querySelectorAll('.metric-card');
        metrics.forEach(metric => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(20px)';
            metric.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        observer.observe(metricSection);
    });
    
    // Show the dashboard image for the active panel
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Add active class with delay to trigger animation
            setTimeout(() => {
                document.getElementById(`${tab.dataset.tab}-panel`).classList.add('active');
            }, 50);
        });
    });
}

// Chart creation function
function createCharts(tabName) {
    // Clear existing charts
    const chartContainers = document.querySelectorAll(`#${tabName}-panel .chart`);
    chartContainers.forEach(container => {
        container.innerHTML = '';
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
    });
    
    switch(tabName) {
        case 'acquisition':
            createAcquisitionCharts();
            break;
        case 'engagement':
            createEngagementCharts();
            break;
        case 'conversion':
            createConversionCharts();
            break;
        case 'retention':
            createRetentionCharts();
            break;
    }
}

// Acquisition charts creation
function createAcquisitionCharts() {
    // Traffic Sources Chart
    const trafficSourcesCtx = document.querySelector('#traffic-sources-chart canvas').getContext('2d');
    new Chart(trafficSourcesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Organic Search', 'Direct', 'Referral', 'Social', 'Paid Search', 'Email'],
            datasets: [{
                data: [45, 20, 12, 10, 8, 5],
                backgroundColor: [
                    '#1e88e5', '#43a047', '#ffa000', '#e53935', '#5e35b1', '#00acc1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Keyword Performance Chart
    const keywordCtx = document.querySelector('#keyword-performance-chart canvas').getContext('2d');
    const timeRange = parseInt(document.getElementById('time-range').value);
    const labels = Array.from({length: timeRange}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (timeRange - i - 1));
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    });
    
    new Chart(keywordCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Top 3 Positions',
                data: generateRandomData(timeRange, 30, 45),
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Positions 4-10',
                data: generateRandomData(timeRange, 60, 80),
                borderColor: '#43a047',
                backgroundColor: 'rgba(67, 160, 71, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Keywords'
                    }
                }
            }
        }
    });
}

// Engagement charts creation
function createEngagementCharts() {
    // Content Engagement Chart
    const contentCtx = document.querySelector('#content-engagement-chart canvas').getContext('2d');
    new Chart(contentCtx, {
        type: 'bar',
        data: {
            labels: ['Blog Posts', 'Service Pages', 'Case Studies', 'Resources', 'Landing Pages'],
            datasets: [{
                label: 'Avg. Time on Page (seconds)',
                data: [185, 143, 210, 162, 128],
                backgroundColor: '#1e88e5'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y'
        }
    });
    
    // User Flow Chart
    const flowCtx = document.querySelector('#user-flow-chart canvas').getContext('2d');
    new Chart(flowCtx, {
        type: 'bar',
        data: {
            labels: ['Homepage', 'Blog', 'Services', 'About', 'Case Studies', 'Contact'],
            datasets: [{
                label: 'Entry Page',
                data: [45, 25, 15, 5, 8, 2],
                backgroundColor: '#1e88e5'
            }, {
                label: 'Exit Page',
                data: [20, 15, 10, 5, 5, 45],
                backgroundColor: '#e53935'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

// Conversion charts creation
function createConversionCharts() {
    // Conversion Funnel Chart
    const funnelCtx = document.querySelector('#conversion-funnel-chart canvas').getContext('2d');
    new Chart(funnelCtx, {
        type: 'bar',
        data: {
            labels: ['Visitors', 'Product Views', 'Add to Cart', 'Checkout', 'Purchase'],
            datasets: [{
                label: 'Conversion Funnel',
                data: [100, 45, 25, 15, 10],
                backgroundColor: [
                    '#1e88e5', '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentage'
                    }
                }
            }
        }
    });
    
    // Revenue by Channel Chart
    const revenueCtx = document.querySelector('#revenue-by-channel-chart canvas').getContext('2d');
    const timeRange = parseInt(document.getElementById('time-range').value);
    const labels = Array.from({length: timeRange}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (timeRange - i - 1));
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    });
    
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Organic',
                data: generateRandomData(timeRange, 1000, 5000),
                borderColor: '#1e88e5',
                tension: 0.4
            }, {
                label: 'Paid',
                data: generateRandomData(timeRange, 800, 3000),
                borderColor: '#43a047',
                tension: 0.4
            }, {
                label: 'Direct',
                data: generateRandomData(timeRange, 500, 2000),
                borderColor: '#ffa000',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue ($)'
                    }
                }
            }
        }
    });
}

// Retention charts creation
function createRetentionCharts() {
    // Customer Retention Chart
    const retentionCtx = document.querySelector('#customer-retention-chart canvas').getContext('2d');
    const timeRange = parseInt(document.getElementById('time-range').value);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const labels = Array.from({length: 6}, (_, i) => {
        const monthIndex = (currentMonth - 5 + i) % 12;
        return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
    });
    
    new Chart(retentionCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Retention Rate',
                data: [62, 64, 67, 65, 70, 73],
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Retention Rate (%)'
                    }
                }
            }
        }
    });
    
    // Customer Segments Chart
    const segmentsCtx = document.querySelector('#customer-segments-chart canvas').getContext('2d');
    new Chart(segmentsCtx, {
        type: 'radar',
        data: {
            labels: ['New', 'Occasional', 'Regular', 'Loyal', 'VIP'],
            datasets: [{
                label: 'Revenue Contribution',
                data: [10, 15, 25, 30, 20],
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                borderColor: '#1e88e5',
                pointBackgroundColor: '#1e88e5'
            }, {
                label: 'Customer Count',
                data: [35, 25, 20, 15, 5],
                backgroundColor: 'rgba(67, 160, 71, 0.2)',
                borderColor: '#43a047',
                pointBackgroundColor: '#43a047'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 40
                }
            }
        }
    });
}

// Generate random data for charts
function generateRandomData(length, min, max) {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCarousel('popular-content', popularContent);
    populateCarousel('trending-content', trendingContent);
    populateCarousel('new-content', newContent);
    
    // Sticky header effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Dashboard functionality
    initDashboard();
    
    // Add event listener for subscribe button
    document.querySelector('.subscribe-btn').addEventListener('click', function() {
        alert('Thank you for your interest! A team member will contact you shortly with subscription details.');
    });
    
    // Trial form submission
    document.getElementById('trial-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formElements = this.elements;
        
        // Enhanced form validation
        let isValid = true;
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                isValid = false;
                formElements[i].classList.add('error');
                
                // Shake the invalid input for feedback
                formElements[i].style.animation = 'none';
                setTimeout(() => {
                    formElements[i].style.animation = 'shake 0.5s ease-in-out';
                }, 10);
            } else if (formElements[i].type === 'email' && formElements[i].value && !validateEmail(formElements[i].value)) {
                isValid = false;
                formElements[i].classList.add('error');
            } else if (formElements[i].type === 'tel' && formElements[i].value && !validatePhone(formElements[i].value)) {
                isValid = false;
                formElements[i].classList.add('error');
            } else {
                formElements[i].classList.remove('error');
            }
        }
        
        if (isValid) {
            // Show thank you message with animation
            this.innerHTML = `
                <div class="thank-you">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3>Thank You!</h3>
                    <p>We'll contact you within 24 hours to schedule your setup call.</p>
                    <div class="countdown" style="margin-top: 15px; font-size: 0.9rem; color: var(--light-text);">
                        Redirecting to your dashboard preview in <span id="countdown-timer">5</span>
                    </div>
                </div>
            `;
            
            // Add countdown effect
            let count = 5;
            const countdownTimer = setInterval(() => {
                count--;
                document.getElementById('countdown-timer').textContent = count;
                
                if (count <= 0) {
                    clearInterval(countdownTimer);
                    // Scroll to dashboard section
                    const dashboardSection = document.querySelector('.dashboard');
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight the dashboard with a pulse effect
                    setTimeout(() => {
                        document.querySelector('.dashboard-container').style.animation = 'pulse 1s ease-in-out';
                    }, 500);
                }
            }, 1000);
        }
    });
});
