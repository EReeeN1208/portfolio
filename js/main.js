document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    nav.classList.toggle("hidden");
  });

  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.add("hidden");
    });
  });

  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("underline", link.getAttribute("href") === "#" + id);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
