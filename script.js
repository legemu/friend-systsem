// =================================================================
// FLOW 1: PAGE NAVIGATION HANDLER
// This script makes your menu links navigate between the HTML files.
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ALL NAVIGATION LINKS
    // This selects all the <a> tags with the class 'nav-link' from the primary menu
    const navLinks = document.querySelectorAll('.primary-nav-links .nav-link');
    
    // This selects the 'BACK' button link(s) on the bottom of the pages
    const backButtons = document.querySelectorAll('.back-link');

    // 2. FUNCTION TO HANDLE NAVIGATION
    function handleNavigation(event) {
        // Prevent the default browser action (a sudden, quick refresh)
        event.preventDefault(); 
        
        // Get the destination URL from the 'href' attribute of the clicked link
        const targetPage = event.currentTarget.getAttribute('href');
        
        // If a valid link is found, change the page location
        if (targetPage && targetPage !== '#') {
            // OPTIONAL: Add a slight delay for a visual transition effect
            setTimeout(() => {
                window.location.href = targetPage;
            }, 50); // Small 50ms delay
        }
    }

    // 3. ATTACH EVENT LISTENERS TO MENU LINKS
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // 4. ATTACH EVENT LISTENERS TO BACK BUTTONS
    backButtons.forEach(button => {
        button.addEventListener('click', handleNavigation);
    });

    console.log("Navigation handlers initialized.");
});

// To test this, ensure you have index.html, recents.html, and player-search.html 
// saved correctly in the same folder!