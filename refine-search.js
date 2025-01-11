const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const originSelection = document.querySelector("#country-selection");
let sortBy = "breed";
let orderBy = "asc";
const sortSelection = document.querySelector("#sort-by");
const ascBtn = document.querySelector(".asc");
const descBtn = document.querySelector(".desc");
const result = document.querySelector(".result");

/**
 * Fetches cat data from the provided URL.
 * @param {string} url - The URL to fetch cat data from.
 * @returns {Promise<Object[]>} A promise that resolves to an array of cat objects.
 * @throws {Error} Throws an error if the HTTP response is not ok.
 */
const fetchCats = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const cats = await response.json();
	return cats;
};

/**
 * Populates a selection element with unique cat origins.
 * @param {Array} cats - An array of cat objects.
 */
const populateUniqueOrigins = (cats) => {
	const uniqueOrigins = [...new Set(cats.map((cat) => cat.origin))];
	uniqueOrigins.sort((a, b) => {
		return a.localeCompare(b);
	});
	uniqueOrigins.forEach((origin) => {
		const option = document.createElement("option");
		option.textContent = origin;
		option.value = origin.toLowerCase();
		originSelection.appendChild(option);
	});
};

/**
 * Renders cat cards on the page.
 * @param {Array} cats - An array of cat objects.
 */
const renderCatCards = (cats) => {
	try {
		cats.forEach((cat) => {
			const card = document.createElement("div");
			card.dataset.breed = cat.breed.toLowerCase();
			card.dataset.origin = cat.origin.toLowerCase();
			card.classList.add("card");
			result.appendChild(card);
			const catImage = document.createElement("img");
			catImage.classList.add("cat-image");
			catImage.alt = cat.breed;
			catImage.src = cat.image;
			const name = document.createElement("p");
			name.textContent = cat.breed;
			const origin = document.createElement("p");
			origin.textContent = `Origin: ${cat.origin}`;
			card.appendChild(catImage);
			card.appendChild(name);
			card.appendChild(origin);
		});
	} catch (error) {
		result.textContent = error;
	}
};

/**
 * Handles the search input event to filter and display cat elements based on the search term.
 * @param {Event} e - The input event triggered by the search bar.
 */
const handleSearchInput = (e) => {
	const catElements = document.querySelectorAll(".card");
	const searchTerm = e.target.value.toLowerCase();
	catElements.forEach((catElement) => {
		const isVisible = catElement.dataset.breed
			.toLowerCase()
			.includes(searchTerm);
		catElement.classList.toggle("hidden", !isVisible);
	});
};

/**
 * Handles the selection of an origin from a dropdown element
 * by Filtering and toggling the visibility of elements based on the selected origin.
 * @param {Event} e - The event object from the origin selection input.
 */
const handleOriginSelection = (e) => {
	const catElements = document.querySelectorAll(".card");
	const selection = e.target.value;
	catElements.forEach((catElement) => {
		const isVisible = catElement.dataset.origin
			.toLowerCase()
			.includes(selection);
		catElement.classList.toggle("hidden", !isVisible);
	});
};

/**
 * Sorts the cat cards based on the specified order and criteria.
 * The function retrieves all elements with the class "card", sorts them
 * based on the data attribute specified by `sortBy` and the order specified
 * by `orderBy`, and then appends the sorted elements back to the result container.
 */
const sortCatCards = () => {
	const catElements = Array.from(document.querySelectorAll(".card"));
	catElements.sort((a, b) => {
		return orderBy === "asc"
			? a.dataset[sortBy].localeCompare(b.dataset[sortBy])
			: -a.dataset[sortBy].localeCompare(b.dataset[sortBy]);
	});
	result.textContent = "";
	catElements.forEach((catElement) => result.appendChild(catElement));
};

const cats = await fetchCats("cats.json");
populateUniqueOrigins(cats);
renderCatCards(cats);
searchForm.addEventListener("submit", (e) => e.preventDefault());
searchInput.addEventListener("input", (e) => handleSearchInput(e));
originSelection.addEventListener("change", (e) => handleOriginSelection(e));
sortSelection.addEventListener("change", (e) => {
	sortBy = e.target.value;
	sortCatCards();
});
ascBtn.addEventListener("click", (e) => {
	orderBy = "asc";
	descBtn.classList.remove("active");
	ascBtn.classList.add("active");
	sortCatCards();
});
descBtn.addEventListener("click", (e) => {
	orderBy = "desc";
	ascBtn.classList.remove("active");
	descBtn.classList.add("active");
	sortCatCards();
});
