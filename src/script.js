const servicesData = [
  {
    image: "src/imagens/acompanhamento_24horas1.png",
    title: "Acompanhamento 24 Horas",
    description: "Equipe especializada disponível 24h para garantir segurança, conforto e atendimento imediato a todas as necessidades das residentes. Programa executada, interação, compra e autonomia."
  },
  {
    image: "src/imagens/atividade_estimulação.png",
    title: "Atividades de Estimulação",
    description: "Programa diversificado com exercícios físicos, jogos cognitivos e interações sociais para estimular corpo e mente, promovendo autonomia."
  },
  {
    image: "src/imagens/Oficina_Artes.png",
    title: "Oficinas de Artes",
    description: "Atendimento geriátrico regular, monitoramento de saúde e suporte de enfermagem especializado para garantir o bem-estar integral."
  },
  {
    image: "src/imagens/alimentação.jpg",
    title: "Alimentação Equilibrada",
    description: "Cardápio nutritivo elaborado por nutricionista, com refeições balanceadas que respeitam preferências e necessidades específicas."
  },
  {
    image: "src/imagens/convivencia_familiar.png",
    title: "Ambiente Familiar",
    description: "Estrutura acolhedora que prioriza o conforto e aconchego, criando um lar onde todas se sentem em família."
  },
  {
    image: "src/imagens/convivencia_social.jpg",
    title: "Atividades Diárias e Convivência Social",
    description: "Rotina com passeios, eventos e atividades em grupo que fortalecem vínculos e promovem uma vida social ativa e alegre."
  }
];

let servicesCurrentIndex = 0, servicesAutoSlideInterval, touchStartX = 0, touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
  initServicesCarousel();
  initNavigation();
  initGalleryCarousel();
});

// --- Carousel de Serviços ---
function initServicesCarousel() {
  const carouselInner = document.querySelector('.services-carousel-inner');
  const paginationDots = document.querySelector('.services-pagination-dots');
  if (!carouselInner || !paginationDots) return;

  carouselInner.innerHTML = '';
  paginationDots.innerHTML = '';

  servicesData.forEach((service, i) => {
    // Item do carousel
    const item = document.createElement('div');
    item.className = 'services-carousel-item';
    item.dataset.index = i;
    item.innerHTML = `
      <div class="service-carousel-card">
        <div class="service-img"><img src="${service.image}" alt="${service.title}" loading="lazy"></div>
        <div class="service-content"><h3>${service.title}</h3><p>${service.description}</p></div>
      </div>
    `;
    carouselInner.appendChild(item);

    // Dot
    const dot = document.createElement('div');
    dot.className = 'services-dot';
    dot.dataset.index = i;
    dot.onclick = () => goToServicesSlide(i);
    paginationDots.appendChild(dot);
  });

  updateServicesItems();

  // Navegação
  ['prev', 'next'].forEach(dir => {
    const btn = document.querySelector(`.services-carousel-control.${dir}`);
    if (btn) btn.onclick = dir === 'prev' ? prevServicesSlide : nextServicesSlide;
  });

  const carousel = document.querySelector('.services-carousel');
  if (carousel) {
    carousel.onmouseenter = () => clearInterval(servicesAutoSlideInterval);
    carousel.onmouseleave = startServicesAutoSlide;
    carousel.ontouchstart = e => { touchStartX = e.changedTouches[0].screenX; clearInterval(servicesAutoSlideInterval); };
    carousel.ontouchend = e => { touchEndX = e.changedTouches[0].screenX; handleServicesSwipe(); startServicesAutoSlide(); };
  }

  startServicesAutoSlide();
}

function updateServicesItems() {
  document.querySelectorAll('.services-carousel-item').forEach((item, i) => {
    item.className = 'services-carousel-item';
    if (i === servicesCurrentIndex) item.classList.add('active');
    else if (i === (servicesCurrentIndex - 1 + servicesData.length) % servicesData.length) item.classList.add('prev');
    else if (i === (servicesCurrentIndex + 1) % servicesData.length) item.classList.add('next');
  });
  document.querySelectorAll('.services-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === servicesCurrentIndex);
  });
}
function goToServicesSlide(i) {
  if (i < 0 || i >= servicesData.length) return;
  servicesCurrentIndex = i;
  updateServicesItems();
}
function nextServicesSlide() {
  servicesCurrentIndex = (servicesCurrentIndex + 1) % servicesData.length;
  updateServicesItems();
}
function prevServicesSlide() {
  servicesCurrentIndex = (servicesCurrentIndex - 1 + servicesData.length) % servicesData.length;
  updateServicesItems();
}
function startServicesAutoSlide() {
  clearInterval(servicesAutoSlideInterval);
  servicesAutoSlideInterval = setInterval(nextServicesSlide, 5000);
}
function handleServicesSwipe() {
  const minSwipe = 50;
  if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipe) nextServicesSlide();
  if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipe) prevServicesSlide();
}

// --- Navegação com scroll e destaque ---
function initNavigation() {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav ul li a:not(.btn-contato)");
  const sections = document.querySelectorAll("section");
  if (!header || !navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link =>
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`)
          );
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach(section => observer.observe(section));

  navLinks.forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      window.scrollTo({ top: target.offsetTop - header.offsetHeight, behavior: "smooth" });
    };
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// --- Carousel da Galeria de Imagens ---
function initGalleryCarousel() {
  const images = [
    { src: "src/imagens/frente_casa.png", alt: "Fachada frontal da Casa do Afeto" },
    { src: "src/imagens/mesa_entrada.jpg", alt: "Mesa de entrada decorada" },
    { src: "src/imagens/sala_janela2.jpg", alt: "Sala de estar iluminada" },
    { src: "src/imagens/sala_janela.jpg", alt: "Janela com luz natural" },
    { src: "src/imagens/quarto1.jpg", alt: "Quarto individual aconchegante" },
    { src: "src/imagens/seguranca_banheiro.jpg", alt: "Banheiro adaptado para segurança" },
    { src: "src/imagens/quarto_janela.jpg", alt: "Quarto com iluminação natural" },
    { src: "src/imagens/sala_entrada.jpg", alt: "Área de refeições" },
  ];

  const DOM = {
    inner: document.querySelector(".carousel-inner"),
    thumbnailsContainer: document.querySelector(".thumbnails-container"),
    paginationDots: document.querySelector(".pagination-dots"),
    prevBtn: document.querySelector(".main-carousel .prev"),
    nextBtn: document.querySelector(".main-carousel .next"),
    mainCarousel: document.querySelector(".main-carousel"),
  };
  if (!DOM.inner || !DOM.thumbnailsContainer || !DOM.paginationDots) return;

  let currentIndex = 0, autoplay = null, itemsPerPage = 4, totalPages = 2, currentPage = 0;

  function updateItemsPerPage() {
    itemsPerPage = window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 4;
    totalPages = Math.ceil(images.length / itemsPerPage);
    createThumbnails();
    createPagination();
    updateCarousel();
  }

  function createMainSlides() {
    DOM.inner.innerHTML = images.map(
      (img, i) => `<div class="carousel-item${i === 0 ? " active" : ""}"><img src="${img.src}" alt="${img.alt}"></div>`
    ).join("");
  }

  function createThumbnails() {
    DOM.thumbnailsContainer.innerHTML = "";
    images.forEach((img, i) => {
      const pageIndex = Math.floor(i / itemsPerPage);
      let page = DOM.thumbnailsContainer.querySelector(`.thumbnail-page[data-page="${pageIndex}"]`);
      if (!page) {
        page = document.createElement("div");
        page.className = "thumbnail-page";
        page.dataset.page = pageIndex;
        DOM.thumbnailsContainer.appendChild(page);
      }
      const thumb = document.createElement("div");
      thumb.className = `thumbnail${i === 0 ? " active" : ""}`;
      thumb.dataset.index = i;
      thumb.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      thumb.onclick = () => goToSlide(i);
      page.appendChild(thumb);
    });
  }

  function createPagination() {
    DOM.paginationDots.innerHTML = Array.from(
      { length: totalPages },
      (_, i) => `<div class="dot${i === currentPage ? " active" : ""}" data-page="${i}"></div>`
    ).join("");
    DOM.paginationDots.querySelectorAll(".dot").forEach(dot =>
      dot.onclick = () => goToPage(parseInt(dot.dataset.page))
    );
  }

  function updateCarousel() {
    DOM.inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    DOM.thumbnailsContainer.querySelectorAll(".thumbnail").forEach((thumb, i) =>
      thumb.classList.toggle("active", i === currentIndex)
    );
    const newPage = Math.floor(currentIndex / itemsPerPage);
    if (newPage !== currentPage) {
      currentPage = newPage;
      updatePagination();
    }
  }

  function updatePagination() {
    DOM.thumbnailsContainer.style.transform = `translateX(-${currentPage * 100}%)`;
    DOM.paginationDots.querySelectorAll(".dot").forEach((dot, i) =>
      dot.classList.toggle("active", i === currentPage)
    );
  }

  function goToSlide(i) {
    if (i < 0 || i >= images.length) return;
    currentIndex = i;
    updateCarousel();
  }
  function goToPage(page) {
    if (page < 0 || page >= totalPages) return;
    currentPage = page;
    updatePagination();
  }
  function nextSlide() { goToSlide((currentIndex + 1) % images.length); }
  function prevSlide() { goToSlide((currentIndex - 1 + images.length) % images.length); }

  function setupAutoplay() {
    autoplay = setInterval(nextSlide, 5000);
    DOM.mainCarousel.onmouseenter = () => clearInterval(autoplay);
    DOM.mainCarousel.onmouseleave = () => { autoplay = setInterval(nextSlide, 5000); };
  }

  function addEvents() {
    if (DOM.nextBtn) DOM.nextBtn.onclick = nextSlide;
    if (DOM.prevBtn) DOM.prevBtn.onclick = prevSlide;
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });
    window.addEventListener("resize", updateItemsPerPage);
  }

  createMainSlides();
  updateItemsPerPage();
  setupAutoplay();
  addEvents();
}