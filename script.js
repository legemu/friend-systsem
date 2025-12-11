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

// --- FLOW 2: PLAYER SEARCH FILTER ---

// 1. DATA SOURCE: A list of players (This simulates fetching data from a database/CMS)
const allPlayers = [
    { name: "Mugheadd", status: "Online", action: "Message", online: true },
    { name: "jonantcat", status: "Offline", action: "Send Request", online: false },
    { name: "CrimsonCannon", status: "In Game", action: "Spectate", online: true },
    { name: "TankerTom", status: "Online", action: "Invite", online: true },
    { name: "SilentSniper", status: "Offline", action: "Request Sent", online: false },
    { name: "AlphaStrike", status: "Online", action: "Message", online: true },
    // Add more players here to test the filter effectively
];

// 2. TEMPLATE FUNCTION: Creates the HTML row for a single player result
function createPlayerRow(player) {
    // Determine status class and action button label based on data
    const statusClass = player.online ? 'status-online' : 'status-offline';
    const statusText = player.status;
    const actionText = player.action;
    
    // Uses the result-row structure defined in your player-search.html
    return `
        <div class="result-row">
            <div class="player-info-result">
                <img src="placeholder-online-avatar.png" alt="Player Avatar" class="result-avatar">
                <span class="player-name-result">${player.name}</span> 
            </div>
            <span class="player-status-result ${statusClass}">${statusText}</span>
            <button class="action-button send-request-btn">${actionText}</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing Navigation code is here) ...

    // --- Search Filter Logic ---
    const searchInput = document.getElementById('player-search-input');
    const resultsContainer = document.getElementById('search-results-container');
    const initialMessage = document.getElementById('initial-search-message');

    // Make sure we are on the player-search page before initializing the filter
    if (searchInput && resultsContainer) {
        // Hides the initial message if it exists
        if (initialMessage) {
            initialMessage.style.display = 'block'; 
        }

        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();
            
            // Hide initial message once typing starts
            if (initialMessage) {
                initialMessage.style.display = 'none';
            }

            // Clear previous results
            resultsContainer.innerHTML = ''; 

            if (searchTerm.length === 0) {
                // Show the initial message if the search field is empty
                if (initialMessage) {
                    resultsContainer.appendChild(initialMessage);
                }
                return;
            }

            // Filter the data source
            const filteredPlayers = allPlayers.filter(player => {
                return player.name.toLowerCase().includes(searchTerm);
            });

            // Generate and inject the new HTML rows
            if (filteredPlayers.length > 0) {
                filteredPlayers.forEach(player => {
                    const playerHtml = createPlayerRow(player);
                    resultsContainer.insertAdjacentHTML('beforeend', playerHtml);
                });
            } else {
                // No results found message
                resultsContainer.innerHTML = '<p class="initial-message">No players found matching your search.</p>';
            }
        });
    }
});