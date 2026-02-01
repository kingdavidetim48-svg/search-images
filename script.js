const form = document.querySelector("form");
const errorMessage = document.getElementById("errorMessage");
const searchInput = document.getElementById("searchInput");
const searchResults = document.querySelector(".searchResults");
const showMore = document.getElementById("showMore");

let inputData = "";
let currentPage = 1;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  currentPage = 1;
  searchImages();
});

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${inputData}&client_id=${APIKEY}`;

  if (currentPage === 1) {
    searchResults.innerHTML = "";
    errorMessage.innerText = "";
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Input a valid search item");
    }

    const data = await response.json();
    const results = data.results;

    if (results.length === 0) {
      errorMessage.innerText =
        "No images found for your search. Try another name.";
      showMore.style.display = "none";
      return;
    }

    results.map((results) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("searchResult");
      const image = document.createElement("img");
      image.src = results.urls.small;
      image.alt = results.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = results.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = results.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    currentPage++;
    if (currentPage > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    errorMessage.innerText = "Error: " + error.message;
  }
}

currentPage++;

if (currentPage > 1) {
  showMore.style.display = "none";
} else {
  showMore.style.display = "block";
}

showMore.addEventListener("click", function () {
  searchImages();
});
