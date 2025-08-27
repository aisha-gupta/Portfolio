 // Basic helpers
      const $ = (sel, root = document) => root.querySelector(sel);
      const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

      // Year in footer
      $("#year").textContent = new Date().getFullYear();

      // Mobile menu
      $("#hamburger")?.addEventListener("click", () => {
        const nav = $("#navLinks");
        if (!nav) return;
        const shown = getComputedStyle(nav).display !== "none";
        nav.style.display = shown ? "none" : "flex";
      });

      // Typing effect (simple, no library)
      const phrases = [
        "Clean Code & Logic",
        "React & JavaScript",
        "User-Focused UI",
      ];
      let pi = 0,
        ci = 0,
        dir = 1;
      function typeLoop() {
        const target = $("#typed");
        const text = phrases[pi];
        ci += dir;
        target.textContent = text.slice(0, ci);
        if (ci === text.length + 8) dir = -1; // pause before deleting
        if (ci === 0) {
          dir = 1;
          pi = (pi + 1) % phrases.length;
        }
        setTimeout(typeLoop, dir > 0 ? 80 : 40);
      }
      typeLoop();

      // Tab switching functionality
      function showSection(section) {
        // Handle tab highlighting
        let tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
          tab.classList.remove("active");
          if (tab.dataset.section === section) {
            tab.classList.add("active");
          }
        });

        // Show/hide sections
        document.getElementById("projects-section").classList.remove("active");
        document
          .getElementById("certificates-section")
          .classList.remove("active");
        document.getElementById("tech-section").classList.remove("active");
        document.getElementById(section + "-section").classList.add("active");

        // Animate with GSAP
        gsap.from("." + section + "-card, .tech-card", {
          duration: 0.9,
          y: 36,
          opacity: 0,
          stagger: 0.08,
          ease: "power2.out",
        });
      }

      // Add event listeners to tabs
      $$(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          showSection(tab.dataset.section);
        });
      });

      // GSAP + ScrollTrigger animations
      gsap.registerPlugin(ScrollTrigger);

      // Nav reveal
      gsap.from(".nav__inner", {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Hero
      gsap.from(".hero__title", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.2,
      });
      gsap.from(".hero__subtitle, .muted, .tags", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.15,
      });
      gsap.from(".cta .btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.12,
      });
      gsap.from(".hero__art img", {
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      // idle float
      gsap.to(".hero__art img", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: "sine.inOut",
      });

      // About reveal
      gsap.from(".about .section-title", {
        scrollTrigger: { trigger: ".about", start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(".about .hello, .about .quote, .about .cta", {
        scrollTrigger: { trigger: ".about", start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
      gsap.from(".about .muted", {
        scrollTrigger: { trigger: ".muted", start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
      gsap.from(".about__img", {
        scrollTrigger: { trigger: ".about", start: "top 75%" },
        scale: 0.75,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
      });

      // Stats cards + counters
      const countUp = (el) => {
        const end = parseInt(el.dataset.target || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 1.4,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val);
          },
        });
      };
      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        onComplete: () => $$(".stat-number").forEach(countUp),
      });

      // Projects
      gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
      });

      // Contact
      gsap.from(".contact__card", {
        scrollTrigger: { trigger: ".contact", start: "top 80%" },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Initialize animations on page load
      document.addEventListener("DOMContentLoaded", () => {
        gsap.from("header", {
          duration: 1.1,
          y: -60,
          opacity: 0,
          ease: "power3.out",
        });
        gsap.from(".card", {
          duration: 1,
          y: 50,
          opacity: 0,
          stagger: 0.18,
          ease: "power2.out",
        });
      });