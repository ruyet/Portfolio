document.querySelectorAll('.tooltip').forEach((tooltip) => {
    tooltip.addEventListener('click', () => {
        // Get the text to copy from the "data-copy" attribute
        const textToCopy = tooltip.getAttribute('data-copy');

        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Temporarily change tooltip text to "Copied!"
            const originalText = tooltip.textContent;
            tooltip.textContent = 'Copied!';
            setTimeout(() => {
                tooltip.textContent = originalText;
            }, 1500); // Reset after 1.5 seconds
        });
    });
});