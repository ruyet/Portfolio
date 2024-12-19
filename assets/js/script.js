document.querySelectorAll('.tooltip').forEach((tooltip) => {
    tooltip.addEventListener('click', (event) => {
        // Prevent the click from propagating to the parent <a> tag
        event.preventDefault();
        event.stopPropagation();

        // Get the text to copy from the "data-copy" attribute
        const textToCopy = tooltip.getAttribute('data-copy');

        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Temporarily change tooltip text to "Copied!"
            const originalText = tooltip.textContent.trim(); // Trim to avoid extra whitespace
            tooltip.textContent = 'Copied!';
            setTimeout(() => {
                tooltip.textContent = originalText;
            }, 1500); // Reset after 1.5 seconds
        });
    });
});

// Save scroll position before navigating away
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position when returning
window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo({ top: parseInt(scrollPosition), behavior: 'smooth' });
    }
});

function goBack(event) {
    event.preventDefault();
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const fadeInColumns = document.querySelectorAll(".fade-in-column");

    // Check if the viewport width is <= 900px (mobile)
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (isMobile) {
        // For mobile: Add the `visible` class on load
        fadeInColumns.forEach((column, index) => {
            setTimeout(() => {
                column.classList.add("visible");
            }, index * 200); // Optional delay for cascading effect
        });
    } else {
        // For desktop: Trigger the fade-in effect on scroll
        const handleScroll = () => {
            fadeInColumns.forEach((column) => {
                const rect = column.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    column.classList.add("visible");
                }
            });
        };

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Trigger on initial load in case some elements are already in view
    }
});