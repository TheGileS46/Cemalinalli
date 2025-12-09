
        // Variables globales
        let musicPlaying = false;
        let musicInitialized = false;
        const christmasMusic = document.getElementById('christmasMusic');
        const musicControl = document.getElementById('musicControl');
        const orderListItems = document.querySelectorAll('#orderList li');
        
        // Función para crear copos de nieve
        function createSnowflakes() {
            const snowflakeCount = 50;
            
            for (let i = 0; i < snowflakeCount; i++) {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                
                // Tamaño aleatorio
                const size = Math.random() * 10 + 5;
                snowflake.style.width = `${size}px`;
                snowflake.style.height = `${size}px`;
                
                // Posición inicial aleatoria
                snowflake.style.left = `${Math.random() * 100}vw`;
                snowflake.style.top = `${Math.random() * -100}px`;
                
                // Opacidad aleatoria
                snowflake.style.opacity = Math.random() * 0.5 + 0.3;
                
                // Velocidad de caída aleatoria
                const fallSpeed = Math.random() * 5 + 3;
                
                // Añadir animación
                snowflake.style.animation = `fall ${fallSpeed}s linear infinite`;
                
                // Añadir al body
                document.body.appendChild(snowflake);
                
                // Eliminar el copo cuando salga de la pantalla
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.remove();
                    }
                }, fallSpeed * 1000);
            }
            
            // Crear nuevos copos periódicamente
            setTimeout(createSnowflakes, 500);
        }
        
        // Función para crear luces navideñas
        function createChristmasLights() {
            const lightsContainer = document.getElementById('lightsContainer');
            const lightCount = 20;
            const colors = ['#C62828', '#2E7D32', '#FFD700', '#1565C0', '#FFFFFF'];
            
            for (let i = 0; i < lightCount; i++) {
                const light = document.createElement('div');
                light.classList.add('christmas-light');
                
                // Posición
                const position = (i / lightCount) * 100;
                light.style.left = `${position}%`;
                
                // Color aleatorio
                const color = colors[Math.floor(Math.random() * colors.length)];
                light.style.backgroundColor = color;
                
                // Tiempo de animación aleatorio
                const animationDelay = Math.random() * 2;
                light.style.animationDelay = `${animationDelay}s`;
                
                lightsContainer.appendChild(light);
            }
        }
        
        // Función para crear confeti
        function createConfetti() {
            const confettiCount = 100;
            const colors = ['#C62828', '#2E7D32', '#FFD700', '#1565C0', '#FFFFFF', '#EF6C00'];
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Color aleatorio
                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = color;
                
                // Forma aleatoria (cuadrada o redonda)
                const isCircle = Math.random() > 0.5;
                confetti.style.borderRadius = isCircle ? '50%' : '0';
                
                // Tamaño aleatorio
                const size = Math.random() * 15 + 5;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                
                // Posición inicial aleatoria en la parte superior
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.top = `-20px`;
                
                // Animación de caída
                const animationDuration = Math.random() * 3 + 2;
                const animationDelay = Math.random() * 2;
                
                confetti.style.animation = `confettiFall ${animationDuration}s ease-in ${animationDelay}s forwards`;
                
                document.body.appendChild(confetti);
                
                // Eliminar confeti después de la animación
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, (animationDuration + animationDelay) * 1000);
            }
        }
        
        // Función para el contador regresivo - MEJORADA
        function updateCountdown() {
            // Asegurarnos de que el año sea el actual o próximo
            const now = new Date();
            const currentYear = now.getFullYear();
            
            // Crear la fecha del evento (12 de diciembre del año actual)
            let eventDate = new Date(currentYear, 11, 12, 17, 0, 0); // Mes 11 = Diciembre
            
            // Si ya pasó la fecha este año, usar el próximo año
            if (now > eventDate) {
                eventDate = new Date(currentYear + 1, 11, 12, 17, 0, 0);
            }
            
            const timeLeft = eventDate - now;
            
            // Calcular días, horas, minutos y segundos
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Actualizar los elementos del DOM
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Si es el día del evento, mostrar confeti
            if (days === 0 && hours < 24) {
                // Crear confeti ocasionalmente
                if (Math.random() > 0.8) {
                    createConfetti();
                }
            }
        }
        
        // Función para controlar la música - SOLUCIÓN MEJORADA
        function toggleMusic() {
            if (musicPlaying) {
                christmasMusic.pause();
                musicControl.innerHTML = '<i class="fas fa-play"></i>';
                musicPlaying = false;
            } else {
                // Intentar reproducir
                const playPromise = christmasMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Reproducción exitosa
                        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                        musicPlaying = true;
                        musicInitialized = true;
                    }).catch(error => {
                        // Error al reproducir
                        console.log("Error al reproducir:", error);
                        musicControl.innerHTML = '<i class="fas fa-play"></i>';
                        musicControl.title = "Error al reproducir música. Haz clic para intentar de nuevo.";
                    });
                }
            }
        }
        
        // Función para crear notas musicales flotantes
        function createMusicNotes() {
            if (!musicPlaying) return;
            
            const noteCount = 3;
            const notes = ['♪', '♫', '♬', '🎵', '🎶'];
            
            for (let i = 0; i < noteCount; i++) {
                const note = document.createElement('div');
                note.classList.add('music-note');
                note.textContent = notes[Math.floor(Math.random() * notes.length)];
                
                // Posición aleatoria
                const left = Math.random() * 90 + 5;
                note.style.left = `${left}vw`;
                note.style.bottom = '20px';
                
                // Animación aleatoria
                const duration = Math.random() * 2 + 2;
                const delay = Math.random() * 2;
                note.style.animationDuration = `${duration}s`;
                note.style.animationDelay = `${delay}s`;
                
                document.body.appendChild(note);
                
                // Eliminar después de la animación
                setTimeout(() => {
                    if (note.parentNode) {
                        note.remove();
                    }
                }, (duration + delay) * 1000);
            }
            
            // Crear más notas periódicamente
            if (musicPlaying) {
                setTimeout(createMusicNotes, 1000);
            }
        }
        
        // Función para agregar interactividad a la lista de orden
        function addOrderListInteractivity() {
            orderListItems.forEach((item, index) => {
                // Añadir tooltip con número de orden
                item.title = `Presentación #${index + 1}`;
                
                // Añadir efecto al hacer clic
                item.addEventListener('click', function() {
                    // Crear efecto de resaltado
                    this.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
                    this.style.transform = 'scale(1.05)';
                    
                    // Crear confeti pequeño
                    for (let i = 0; i < 10; i++) {
                        setTimeout(() => {
                            createConfetti();
                        }, i * 50);
                    }
                    
                    // Revertir después de un tiempo
                    setTimeout(() => {
                        this.style.backgroundColor = '';
                        this.style.transform = '';
                    }, 500);
                });
            });
        }
        
        // Función para inicializar música automáticamente - SOLUCIÓN MEJORADA
        function initMusic() {
            // Esperar un momento antes de intentar reproducir
            setTimeout(() => {
                // Cargar la música primero
                christmasMusic.load();
                
                // Esperar a que se cargue
                christmasMusic.addEventListener('canplaythrough', function() {
                    // Intentar reproducir automáticamente después de la carga
                    const playPromise = christmasMusic.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Éxito
                            musicPlaying = true;
                            musicInitialized = true;
                            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                            console.log("Música reproducida automáticamente");
                            
                            // Iniciar notas musicales
                            createMusicNotes();
                        }).catch(error => {
                            // Falló el autoplay, esperar interacción del usuario
                            console.log("Autoplay bloqueado. Esperando interacción del usuario.");
                            musicControl.innerHTML = '<i class="fas fa-play"></i>';
                            musicControl.title = "Haz clic para reproducir música navideña";
                            musicPlaying = false;
                            
                            // Intentar reproducir cuando el usuario haga clic en cualquier parte
                            const playOnInteraction = () => {
                                christmasMusic.play().then(() => {
                                    musicPlaying = true;
                                    musicInitialized = true;
                                    musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                                    createMusicNotes();
                                    
                                    // Remover event listeners
                                    document.removeEventListener('click', playOnInteraction);
                                    document.removeEventListener('touchstart', playOnInteraction);
                                }).catch(e => {
                                    console.log("Error después de interacción:", e);
                                });
                            };
                            
                            // Agregar event listeners para interacción del usuario
                            document.addEventListener('click', playOnInteraction);
                            document.addEventListener('touchstart', playOnInteraction);
                        });
                    }
                }, { once: true });
                
                // Si hay error al cargar el archivo local, usar el fallback
                christmasMusic.addEventListener('error', function() {
                    console.log("Error al cargar song.mp3. Usando música de respaldo.");
                    
                    // Cambiar a la fuente de respaldo
                    const fallbackSource = document.getElementById('fallbackMusic');
                    if (fallbackSource) {
                        christmasMusic.src = fallbackSource.src;
                        christmasMusic.load();
                        
                        // Intentar reproducir de nuevo
                        setTimeout(initMusic, 500);
                    }
                });
            }, 500);
        }
        
        // Inicializar cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function() {
            // Crear efectos visuales
            createSnowflakes();
            createChristmasLights();
            
            // Configurar contador regresivo
            updateCountdown();
            setInterval(updateCountdown, 1000);
            
            // Configurar control de música
            musicControl.addEventListener('click', toggleMusic);
            
            // Inicializar música automáticamente
            initMusic();
            
            // Añadir interactividad a la lista de orden
            addOrderListInteractivity();
            
            // Efecto de aparición para los elementos principales
            const mainElements = document.querySelectorAll('.event-details, .program-section');
            mainElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s, transform 0.8s';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 300);
            });
            
            // Añadir keyframes para animaciones si no existen
            if (!document.querySelector('#animations-keyframes')) {
                const keyframes = `
                    @keyframes fall {
                        0% {
                            transform: translateY(0) rotate(0deg);
                        }
                        100% {
                            transform: translateY(100vh) rotate(360deg);
                        }
                    }
                    
                    @keyframes confettiFall {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `;
                
                const style = document.createElement('style');
                style.id = 'animations-keyframes';
                style.textContent = keyframes;
                document.head.appendChild(style);
            }
            
            // Añadir confeti aleatorio de vez en cuando
            setInterval(() => {
                if (Math.random() > 0.85) {
                    createConfetti();
                }
            }, 15000);
        });
        
        // Detectar cuando la música se reproduce correctamente
        christmasMusic.addEventListener('playing', function() {
            console.log("La música se está reproduciendo");
            musicPlaying = true;
            musicInitialized = true;
            createMusicNotes();
        });
        
        // Detectar cuando la música se pausa
        christmasMusic.addEventListener('pause', function() {
            musicPlaying = false;
        });
