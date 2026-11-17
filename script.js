
/* =========================================
   PEERNEX - COMPLETE SCRIPT.JS
   Developed by SYNORA
========================================= */

/* ========== THEME MANAGEMENT ========== */

const THEME_KEY = "peernexTheme";

// Apply saved theme when the page loads
function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    updateThemeButton();
}

// Switch between light mode and dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const currentTheme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem(THEME_KEY, currentTheme);

    updateThemeButton();
}

// Update theme button text, if available
function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");

    const themeButtons = document.querySelectorAll(
        "#themeToggle, .theme-toggle, [data-theme-toggle]"
    );

    themeButtons.forEach(button => {
        button.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        button.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    });
}

// Connect theme buttons automatically
document.addEventListener("DOMContentLoaded", function () {
    applySavedTheme();

    const themeButtons = document.querySelectorAll(
        "#themeToggle, .theme-toggle, [data-theme-toggle]"
    );

    themeButtons.forEach(button => {
        button.addEventListener("click", toggleDarkMode);
    });
});


/* ========== HOME PAGE FUNCTIONS ========== */

// Welcome message
function showMessage() {
    alert("Welcome to PeerNex! 🚀");
}

// Find a skill
function findSkill() {
    window.location.href = "request.html";
}

// Offer a skill
function offerSkill() {
    window.location.href = "offer.html";
}


/* ========== GENERAL MESSAGE ========== */

function showNotification(message) {
    alert(message);
}


/* ========== PEERNEX INITIALIZATION ========== */

console.log("PeerNex is ready! 🚀");
console.log("Developed by SYNORA");

// Register PeerNex Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js")
            .then(function (registration) {
                console.log(
                    "PeerNex PWA activated!",
                    registration.scope
                );
            })
            .catch(function (error) {
                console.error(
                    "PWA registration failed:",
                    error
                );
            });
    });
}
