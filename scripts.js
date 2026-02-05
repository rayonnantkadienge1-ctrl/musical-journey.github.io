   // ===== LOADER =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // ===== TOGGLE THEME AVANCÉ =====
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        const mobileSunIcon = document.getElementById('mobileSunIcon');
        const mobileMoonIcon = document.getElementById('mobileMoonIcon');
        const body = document.body;

        // Vérifier la préférence système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

        // Appliquer le thème sauvegardé
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);

        function updateThemeIcons(theme) {
            if (theme === 'dark') {
                sunIcon.classList.remove('active');
                moonIcon.classList.add('active');
                mobileSunIcon.classList.remove('active');
                mobileMoonIcon.classList.add('active');
            } else {
                sunIcon.classList.add('active');
                moonIcon.classList.remove('active');
                mobileSunIcon.classList.add('active');
                mobileMoonIcon.classList.remove('active');
            }
        }

        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
            
            // Animation de transition
            body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 500);
        }

        themeToggle.addEventListener('click', toggleTheme);
        mobileThemeToggle.addEventListener('click', toggleTheme);

        // ===== MENU MOBILE AVANCÉ =====
        const mobileToggle = document.getElementById('mobileToggle');
        const closeMenu = document.getElementById('closeMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-nav a');

        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // ===== SCROLL EFFECTS =====
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        const progressScroll = document.getElementById('progressScroll');

        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Progress scroll
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressScroll.style.width = scrolled + '%';

            // Update active nav link
            updateActiveNavLink();
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ===== ANIMATE ON SCROLL =====
        const animateElements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // ===== PARTICLES ANIMATION =====
        function createParticles() {
            const particlesContainer = document.getElementById('heroParticles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'hero-bg-particle';
                
                // Position aléatoire
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Taille aléatoire
                const size = Math.random() * 3 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Opacité aléatoire
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                
                // Animation delay aléatoire
                particle.style.animationDelay = Math.random() * 20 + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // ===== ANIMATED COUNTERS =====
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const increment = Math.ceil(target / speed);
                    
                    if (count < target) {
                        counter.innerText = count + increment;
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
        }

        // Observer pour déclencher les compteurs
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }

        // ===== ACTIVE NAV LINK =====
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileLinks = document.querySelectorAll('.mobile-nav a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            mobileLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // ===== FORM SUBMISSION =====
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Animation de chargement
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simulation d'envoi
                setTimeout(() => {
                    // Notification de succès
                    showNotification('Demande envoyée avec succès ! Notre équipe vous contactera dans les 24h.', 'success');
                    
                    // Réinitialisation du formulaire
                    contactForm.reset();
                    
                    // Restauration du bouton
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }

        // ===== NOTIFICATION SYSTEM =====
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Afficher la notification
            setTimeout(() => notification.classList.add('show'), 10);
            
            // Supprimer après 5 secondes
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        }

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', () => {
            // Créer les particules
            createParticles();
            
            // Mettre à jour l'année
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Initialiser l'état du thème
            updateThemeIcons(body.getAttribute('data-theme'));
            
            // Mettre à jour le lien actif au chargement
            updateActiveNavLink();
            
            // Smooth scroll pour les ancres
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Galerie horizontale - Duplication pour effet infini
            const galerieTrack = document.querySelector('.galerie-track');
            if (galerieTrack) {
                // Cloner les éléments pour l'effet infini
                const items = galerieTrack.innerHTML;
                galerieTrack.innerHTML += items;
            }
        });

        // ===== PARALLAX EFFECT =====
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const heroImage = document.querySelector('.hero-visual');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        });

        // ===== HOVER EFFECTS =====
        document.querySelectorAll('.service-card, .tarif-card, .galerie-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });

        // ===== RESPONSIVE ADJUSTMENTS =====
        function handleResize() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        window.addEventListener('resize', handleResize);

        // ===== LAZY LOAD IMAGES =====
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Support natif
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }