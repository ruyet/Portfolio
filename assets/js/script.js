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
    const columns = document.querySelectorAll(".fade-in-column");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the element is visible
        }
    );

    columns.forEach((column) => {
        observer.observe(column);
    });
});
