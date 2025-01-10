const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (e) => e.preventDefault());

const result = document.querySelector(".result");
const originSelection = document.querySelector("#country-selection");

fetch("cats.json")
	.then((response) => response.json())
	.then((cats) => {
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

		cats.forEach((cat) => {
			const card = document.createElement("div");
			card.dataset.breed = cat.breed.toLowerCase();
			card.dataset.origin = cat.origin.toLowerCase();
			card.classList.add("card");
			const catImage = document.createElement("img");
			catImage.classList.add("cat-image");
			catImage.alt = cat.breed;
			catImage.src = cat.image;
			const name = document.createElement("p");
			name.classList.add("cat-breed");
			name.textContent = cat.breed;
			const origin = document.createElement("p");
			origin.classList.add("cat-origin");
			origin.textContent = `Origin: ${cat.origin}`;
			result.appendChild(card);
			card.appendChild(catImage);
			card.appendChild(name);
			card.appendChild(origin);
		});
	});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", (e) => {
	const catElements = document.querySelectorAll(".card");
	const searchTerm = e.target.value.toLowerCase();
	catElements.forEach((catElement) => {
		const isVisible = catElement
			.querySelector(".cat-breed")
			.textContent.toLowerCase()
			.includes(searchTerm);
		catElement.classList.toggle("hidden", !isVisible);
	});
});

originSelection.addEventListener("change", (e) => {
	const catElements = document.querySelectorAll(".card");
	const selection = e.target.value;
	catElements.forEach((catElement) => {
		const isVisible = catElement
			.querySelector(".cat-origin")
			.textContent.toLowerCase()
			.includes(selection);
		catElement.classList.toggle("hidden", !isVisible);
	});
});

let sortBy = "breeds";
const sortSelection = document.querySelector("#sort-by");
const ascBtn = document.querySelector(".asc");
const descBtn = document.querySelector(".desc");

sortSelection.addEventListener("change", (e) => {
	sortBy = e.target.value;
});

ascBtn.addEventListener("click", (e) => {
	const catElements = Array.from(document.querySelectorAll(".card"));
	descBtn.classList.remove("active");
	e.currentTarget.classList.add("active");
	if (sortBy === "breeds") {
		catElements.sort((a, b) => {
			return a.dataset.breed.localeCompare(b.dataset.breed);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
	if (sortBy === "origins") {
		catElements.sort((a, b) => {
			return a.dataset.origin.localeCompare(b.dataset.origin);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
});

descBtn.addEventListener("click", (e) => {
	const catElements = Array.from(document.querySelectorAll(".card"));
	ascBtn.classList.remove("active");
	e.currentTarget.classList.add("active");
	if (sortBy === "breeds") {
		catElements.sort((a, b) => {
			return b.dataset.breed.localeCompare(a.dataset.breed);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
	if (sortBy === "origins") {
		catElements.sort((a, b) => {
			return b.dataset.origin.localeCompare(a.dataset.origin);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
});
