document.addEventListener("DOMContentLoaded", function () {
    // Video play/pause toggle
    const video = document.getElementById("video");
    const playButton = document.getElementById("playButton");
  
    playButton.addEventListener("click", function () {
      if (video.paused) {
        video.play();
        playButton.style.display = "none";
      } else {
        video.pause();
        playButton.style.display = "block";
      }
    });
  
    // Testimonials slider
    const slides = document.querySelectorAll(".slide");
    let index = 0;
  
    function showSlide() {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    }
  
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide();
    }, 5000);
  
    showSlide();
  
    // Contact modal functionality
    const modal = document.getElementById("modal");
    const contactBtn = document.getElementById("contactBtn");
    const closeBtn = document.querySelector(".close");
  
    contactBtn.addEventListener("click", () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    // Google Maps initialization
    function initMap() {
      new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 }, // Example location (Delhi)
        zoom: 10,
      });
    }
  
    // Load Google Maps API
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
    script.async = true;
    document.body.appendChild(script);
  });
  