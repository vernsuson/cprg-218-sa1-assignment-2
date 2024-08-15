console.log("testing");

const makeupEndpoint = "https://makeup-api.herokuapp.com/api/v1/products.json";
const dropdown = document.getElementById("makeup-categories");
const makeupsDiv = document.getElementById("makeup-cards");
let makeupResults;

async function fetchAndDisplayMakeup() {
  const response = await fetch(makeupEndpoint);
  makeupResults = await response.json();

  makeupResults.forEach((makeup) => {
    const img = new Image();
    img.src = makeup.image_link;
    img.alt = makeup.name;

    img.onload = function () {
      const card = document.createElement("div");
      card.className = "product-card";

      const name = document.createElement("h2");
      name.textContent = makeup.name;

      const price = document.createElement("p");
      price.textContent = "$ " + makeup.price;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(price);
      makeupsDiv.appendChild(card);
    };
  });
}

fetchAndDisplayMakeup().catch((error) =>
  console.error("Error fetching makeup product types:", error)
);

dropdown.addEventListener("change", () => {
  const category = dropdown.value;

  makeupsDiv.innerHTML = "";

  if (category) {
    fetchMakeupbyCategory(category)
      .then((makeupResults) => {
        makeupResults.forEach((makeup) => {
          const img = new Image();
          img.src = makeup.image_link;
          img.alt = makeup.name;

          img.onload = function () {
            const card = document.createElement("div");
            card.className = "product-card";

            const name = document.createElement("h2");
            name.textContent = makeup.name;

            const price = document.createElement("p");
            price.textContent = "$ " + makeup.price;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            makeupsDiv.appendChild(card);
          };
        });
      })
      .catch((error) => console.error("Error fetching Makeup:", error));
  }
});

async function fetchMakeupbyCategory(category) {
  const response = await fetch(
    `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`
  );
  const data = await response.json();
  return data;
}
