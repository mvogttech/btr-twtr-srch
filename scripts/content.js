const SEARCH_CONTAINER_HTML = `
<div class="search-container">
    <div class="search-item" id="from-option">
        <span>from:</span> search for tweets from a specific user
    </div>
    <div class="search-item">
        <span>to:</span> search for tweets to a specific user
    </div>
    <div class="search-item">
        <span>since:</span> search for tweets after a specific date
    </div>
    <div class="search-item">
        <span>until:</span> search for tweets before a specific date
    </div>
    <div class="search-item">
        <span>near:</span> search for tweets near a specific location
    </div>
</div>`;

function waitForSearchBar() {
	return new Promise((resolve, reject) => {
		let searchBar = document.querySelector('input[aria-label="Search query"]');
		if (searchBar) {
			resolve(searchBar);
		} else {
			let observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.addedNodes.length > 0) {
						let searchBar = document.querySelector(
							'input[aria-label="Search query"]'
						);
						if (searchBar) {
							observer.disconnect();
							resolve(searchBar);
						}
					}
				});
			});
			observer.observe(document.body, { childList: true, subtree: true });
		}
	});
}

async function main() {
	let searchBar = await waitForSearchBar();
	searchBar.placeholder = "Search Twitter Advanced";
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === "attributes") {
				if (mutation.attributeName === "autofocus") {
					const searchPopup = document.querySelector(
						"div[data-testid='typeaheadRecentSearchesHeader']"
					);
					if (searchPopup) {
						const searchContainer = document.getElementById(
							"typeaheadDropdown-1"
						);
						searchContainer.innerHTML = SEARCH_CONTAINER_HTML;

						document
							.getElementById("from-option")
							.addEventListener("click", () => {
								console.log("from option clicked");
								searchBar.value = "from:";
								searchBar.defaultValue = "from:";
								searchBar.focus();
							});
					}
				}
			}
		});
	});

	observer.observe(searchBar, {
		attributes: true //configure it to listen to attribute changes
	});
	console.log("Found search bar");
}

main();

console.log("content.js loaded");
