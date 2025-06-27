document.addEventListener('DOMContentLoaded', () => {
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeButton = document.querySelector('.lightbox-close');
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  let currentGallery = [];
  let currentIndex = 0;

  // Función para abrir el lightbox
  function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    updateImage();
    lightboxOverlay.style.display = 'flex';
    document.addEventListener('keydown', handleKeyPress);
  }
  
  // Función para cerrar el lightbox
  function closeLightbox() {
    lightboxOverlay.style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
  }

  // Función para actualizar la imagen mostrada
  function updateImage() {
    lightboxImage.src = currentGallery[currentIndex];
  }

  // Función para ir a la imagen siguiente
  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateImage();
  }

  // Función para ir a la imagen anterior
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateImage();
  }
  
  // Función para manejar la navegación con el teclado
  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  }

  // Añadir un listener a cada imagen de la galería
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      const galleryName = img.dataset.gallery;
      // Crear un array con las URLs de las imágenes de la misma galería
      const relatedImages = Array.from(document.querySelectorAll(`.gallery-img[data-gallery="${galleryName}"]`))
                                 .map(i => i.src);
      // Encontrar el índice de la imagen clicada
      const clickedIndex = relatedImages.findIndex(src => src === img.src);
      
      openLightbox(relatedImages, clickedIndex);
    });
  });

  // Listeners para los controles del lightbox
  closeButton.addEventListener('click', closeLightbox);
  nextButton.addEventListener('click', showNext);
  prevButton.addEventListener('click', showPrev);
  
  // Cerrar el lightbox al hacer clic en el fondo oscuro
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });
});