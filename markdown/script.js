document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');

    // Set up marked.js options
    marked.setOptions({
        breaks: true,        
        
    });

    // Load any saved content when the page loads
    // If there's nothing saved, we'll use an empty string
    const savedContent = localStorage.getItem('markdownContent') || '';
    editor.value = savedContent;

    function updatePreview() {
        const markdownText = editor.value;
        const htmlContent = marked.parse(markdownText);
        preview.innerHTML = htmlContent;

        // Save to localStorage whenever content changes
        // This creates a key called 'markdownContent' that persists between sessions
        localStorage.setItem('markdownContent', markdownText);
    }

    // Add a debounce function to prevent too many localStorage saves
    // This will only save after the user stops typing for 500ms
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }

    const debouncedUpdate = debounce(updatePreview, 500);
    editor.addEventListener('input', debouncedUpdate);

    // Run initial preview with any saved content
    updatePreview();
}); 