const movies = [
	{
		title: "Edward Scissorhands",
		year: 2022,
		director: "Tim Burton",
		rating: "PG-13",
		description:
			"A gentle artificial man, who was left unfinished and has scissors for hands, leads a solitary life until a kind suburban lady discovers him.",
		poster: "https://f8n-production-collection-assets.imgix.net//0x325d4da80571d948BbE7fD7724Cb5e9919633cEc/3/nft.png?auto=format%2Ccompress&q=70&cs=srgb&h=1200&w=1200&fnd_key=v1"
	},
	{
		title: "Halloween",
		year: 2022,
		director: "John Carpenter",
		rating: "R",
		description:
			"Fifteen years after murdering his sister, Michael Myers escapes from a mental hospital and returns to the small town to kill again.",
		poster: "https://f8n-production-collection-assets.imgix.net/0x325d4da80571d948BbE7fD7724Cb5e9919633cEc/1/nft.png?auto=format%2Ccompress&q=70&cs=srgb&h=1200&w=1200&fnd_key=v1"
	},
    {
		title: "Corpse Bride",
		year: 2022,
		director: "Tim Burton",
		rating: "PG",
		description:
			"When a shy groom practices his wedding vows in the inadvertent presence of a deceased young woman, she rises from the grave assuming he has married her.",
		poster: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-6/421467508_405187595278676_5099232664984260487_n.jpg?stp=dst-jpg_p720x720&_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=a0rIiCDRmkIQ7kNvgHX7pM8&_nc_zt=23&_nc_ht=scontent.fykz1-1.fna&_nc_gid=AKqxSYks4yCWofSgnGtIgmS&oh=00_AYCARVQLhUrELZ0AMv7wQsPnHNJHATvPac01ZBC5rbPivw&oe=671F7A2A"
	},
	{
		title: "Casper",
		year: 2023,
		director: "Brad Silberling",
		rating: "PG",
		description:
			"A paranormal expert and his daughter bunk in an abandoned house populated by three mischievous ghosts and one friendly one.",
		poster:
			"https://f8n-production-collection-assets.imgix.net/0x5d022Ac89eE4cc874CC526C5486e1ff9FBe8ff22/1/nft.png?auto=format%2Ccompress&q=70&cs=srgb&h=1200&w=1200&fnd_key=v1"
	},

	{
		title: "The Shining",
		year: 2023,
		director: "Stanley Kubrick",
		rating: "R",
		description:
			"A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings.",
		poster:
			"././assets/imgs/figma.png",
        link:"https://www.figma.com/design/W3Q1ryf0QVhqH3Z4Kh7HZm/Commission-Site-(client)?node-id=0-1&t=WlH0U8kejURBdzMr-1"
	},
    {
		title: "The Shining",
		year: 1980,
		director: "Stanley Kubrick",
		rating: "R",
		description:
			"A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings.",
		poster:
			"././assets/imgs/1-mon.jpg",
        link:"https://f8n-production-collection-assets.imgix.net/0xd2219680A158a68e35Fd0cF056205Fa640A9B2ef/6/nft.png?auto=format%2Ccompress&q=70&cs=srgb&h=1200&w=1200&fnd_key=v1"
	},
    {
		title: "The Shining",
		year: 2023,
		director: "Stanley Kubrick",
		rating: "R",
		description:
			"A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings.",
		poster:
			"././assets/imgs/1-lying.png",
        link:"././assets/imgs/1-lying.png"
	},

];

class MovieCarousel {
	constructor() {
		this.currentIndex = Math.floor(movies.length / 2);
		this.isPlaying = false;
		this.autoplayInterval = null;
		this.carousel = document.getElementById("movieCarousel");
		this.movieInfo = document.getElementById("movieInfo");
		this.touchStartX = 0;
		this.touchEndX = 0;

		this.initializeCarousel();
		this.setupEventListeners();
		this.setupParticles();
		this.update();
	}

	initializeCarousel() {
		movies.forEach((movie, index) => {
			const card = this.createMovieCard(movie, index);
			this.carousel.appendChild(card);
		});
	}

	createMovieCard(movie, index) {
		const card = document.createElement("div");
		card.className = "movie-card";
		card.innerHTML = `
            <div class="movie-card-inner">
                <img class="movie-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-content">

                    <p class="movie-year">${movie.year}</p>
                </div>
                <div class="movie-rating">${movie.rating}</div>
            </div>
        `;

		card.addEventListener("click", () => {
			this.currentIndex = index;
			this.stopAutoplay();
			this.update();
		});

		return card;
	}

	setupEventListeners() {
		// Control buttons
		document.getElementById("prevBtn").addEventListener("click", () => {
			this.prev();
			this.stopAutoplay();
		});

		document.getElementById("nextBtn").addEventListener("click", () => {
			this.next();
			this.stopAutoplay();
		});

		document.getElementById("playBtn").addEventListener("click", () => {
			this.toggleAutoplay();
		});

		// Keyboard navigation
		document.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "ArrowLeft":
					this.prev();
					this.stopAutoplay();
					break;
				case "ArrowRight":
					this.next();
					this.stopAutoplay();
					break;
				case " ":
					e.preventDefault();
					this.toggleAutoplay();
					break;
			}
		});

		// Touch events
		document.addEventListener("touchstart", (e) => {
			this.touchStartX = e.changedTouches[0].screenX;
		});

		document.addEventListener("touchend", (e) => {
			this.touchEndX = e.changedTouches[0].screenX;
			this.handleSwipe();
		});

		// Custom cursor
		const cursor = document.querySelector(".custom-cursor");
		document.addEventListener("mousemove", (e) => {
			cursor.style.left = e.clientX + "px";
			cursor.style.top = e.clientY + "px";

			const target = e.target;
			if (target.closest(".control-btn") || target.closest(".movie-card")) {
				cursor.style.transform = "scale(2)";
				cursor.style.borderColor = "var(--accent)";
			} else {
				cursor.style.transform = "scale(1)";
				cursor.style.borderColor = "var(--primary)";
			}
		});

		// Parallax effect
		document.addEventListener("mousemove", (e) => {
			const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
			const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
			const bg = document.querySelector(".ambient-bg");

			bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
		});

		// Responsive handling
		window.addEventListener("resize", () => {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(() => this.update(), 100);
		});
	}

	handleSwipe() {
		const swipeThreshold = 50;
		const swipeDistance = this.touchEndX - this.touchStartX;

		if (Math.abs(swipeDistance) > swipeThreshold) {
			if (swipeDistance > 0) {
				this.prev();
			} else {
				this.next();
			}
			this.stopAutoplay();
		}
	}

	setupParticles() {
		const particlesContainer = document.querySelector(".particles-container");

		const createParticle = () => {
			const particle = document.createElement("div");
			const size = Math.random() * 4 + 2;
			const duration = Math.random() * 10 + 5;

			particle.className = "particle";
			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;
			particle.style.left = `${Math.random() * window.innerWidth}px`;
			particle.style.opacity = Math.random() * 0.5;
			particle.style.animation = `float ${duration}s linear infinite`;

			particlesContainer.appendChild(particle);

			setTimeout(() => particle.remove(), duration * 1000);
		};

		setInterval(createParticle, 1000);
	}

	prev() {
		this.currentIndex = (this.currentIndex - 1 + movies.length) % movies.length;
		this.update();
	}

	next() {
		this.currentIndex = (this.currentIndex + 1) % movies.length;
		this.update();
	}

	toggleAutoplay() {
		if (this.isPlaying) {
			this.stopAutoplay();
		} else {
			this.startAutoplay();
		}
	}

	startAutoplay() {
		this.isPlaying = true;
		document.getElementById("playBtn").innerHTML = `
        <img src = "https://stickershop.line-scdn.net/stickershop/v1/product/24014/LINEStorePC/main.png?v=1"/>
        `;
		this.autoplayInterval = setInterval(() => this.next(), 3000);
	}

	stopAutoplay() {
		this.isPlaying = false;
		document.getElementById("playBtn").innerHTML = `
            
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 3l14 9-14 9V3z"/>
          </svg>
        `;
		clearInterval(this.autoplayInterval);
	}


	update() {
		const cards = this.carousel.children;
		const cardWidth = cards[0].offsetWidth;
		const centerOffset = window.innerWidth / 2 - cardWidth / 2;

		for (let i = 0; i < cards.length; i++) {
			const offset = i - this.currentIndex;
			const card = cards[i];

			// Calculate transform values
			const translateX = centerOffset + offset * 180;
			const translateZ = Math.abs(offset) * -100;
			const rotateY = offset * -15;
			const scale = Math.max(0.8, 1 - Math.abs(offset) * 0.2);
			const opacity = Math.max(0.5, 1 - Math.abs(offset) * 0.3);

			// Apply transforms
			card.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
			card.style.opacity = opacity;
			card.style.zIndex = 100 - Math.abs(offset);
		}

		// Update movie info
		const currentMovie = movies[this.currentIndex];
		this.movieInfo.classList.remove("active");

		// Force reflow
		void this.movieInfo.offsetWidth;

		// this.movieInfo.innerHTML = `
        //     <div class="info-content">
        //         <h2>${currentMovie.title}</h2>
        //         <p class="year">${currentMovie.year}</p>
        //         <p class="director">Directed by ${currentMovie.director}</p>
        //         <p class="description">${currentMovie.description}</p>
        //         <div class="rating">${currentMovie.rating}</div>
        //     </div>
        //     <div class="info-background"></div>
        // `;

		this.movieInfo.classList.add("active");
	}
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new MovieCarousel();
});
