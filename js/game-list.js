const placeholder = "images/placeholder.png";
const gameList = [
];

const gameListContainer = document.querySelector("#game-list-container");
const checkbox = document.querySelector("#delete-disable");
const filterButton = document.querySelector("#search-filter");
let CurrentId = 0;

const checkAgainstFilter = (selectedOption, rank) => {
    if (selectedOption == "All" || rank == selectedOption) {
        return true;
    } else {
        return false;
    };
};

function insertCard(GameName, GameDescription, ImageUrl, GameRating) {
    let extraClassesToApplyToCard = !checkAgainstFilter(filterButton.value, GameRating) ? " hidden-card" : "";
    let extraClassesToApplyToButton = checkbox.checked ? " hidden-button" : "";

    const HTMLToInsert = `
            <div class="game-card${extraClassesToApplyToCard}" data-id=${CurrentId}>
                <img src="${ImageUrl}" alt="Icon">
                <h3 class="game-name">${GameName}</h3>
                <p class="game-description">${GameDescription}</p>
                <p class="game-rating rating-${GameRating}">${GameRating}</p>
                <button class="delete-button${extraClassesToApplyToButton}">Delete</button>
            </div>
            `; /* https://www.w3schools.com/tags/att_data-.asp */
    CurrentId += 1;
    gameListContainer.insertAdjacentHTML("beforeend", HTMLToInsert);
};

console.log("Games added to list: ");
for (const game of gameList) {
    insertCard(game.name, game.description, game.icon, game.rating);
    console.log(game);
};

const dialog = document.querySelector("#game-add-dialog");
const addButton = document.querySelector("#add-game-button");
addButton.addEventListener("click", () => {
    dialog.showModal();
});

const form = document.querySelector("#game-add-form");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const elements = form.elements

    const fileUrl = form.elements["game-icon"].files[0] ? URL.createObjectURL(elements["game-icon"].files[0]) : placeholder; /* Derived from: https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file */
    const description = form.elements["game-description"].value !== "" ? form.elements["game-description"].value : "<i>No Description</i>"
    const gameName = elements["game-name"].value
    const tier = elements["tier-field"].value

    gameList.push({
        id: CurrentId,
        name: gameName,
        description: description,
        icon: fileUrl,
        rating: tier
    });
    insertCard(gameName, description, fileUrl, tier)
    dialog.close();
    form.reset(); /* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset */
});

gameListContainer.addEventListener("click", (evt) => {
    if (evt.target.matches("button")) {
        if (confirm("Are you sure you want to delete this?") === true) {
            evt.target.disabled = true;
            const card = evt.target.parentElement; /* https://www.w3schools.com/jsref/prop_node_parentelement.asp */
            card.classList.add("deleting");
            const indexToRemove = gameList.findIndex((item) => {
                if (item.id == card.getAttribute("data-id")) {
                    return true;
                } else {
                    return false;
                }
            })
            gameList.splice(indexToRemove, 1);
            CurrentId -= 1;
            setTimeout(() => {
                card.remove(); /* https://www.w3schools.com/jsref/met_element_remove.asp */
            }, 500)
        };
    };
});

filterButton.addEventListener("change", () => {
    const selectedOption = filterButton.value;
    const objects = document.querySelectorAll(".game-card");
    for (var object of objects) {
        const label = object.querySelector(".game-rating");
        if (checkAgainstFilter(selectedOption, label.textContent)) {
            object.classList.remove("hidden-card");
        } else {
            object.classList.add("hidden-card");
        }
    }
});

document.querySelector("#form-reset-field").addEventListener("click", () => {
    dialog.close();
});

checkbox.addEventListener("change", () => {
    document.querySelectorAll(".delete-button").forEach((item) => {
        if (checkbox.checked === true) { /* https://builtin.com/articles/javascript-check-if-checkbox-is-checked#:~:text=The%20most%20straightforward%20way%20to,var%20isChecked%20%3D%20document. */
            item.classList.add("hidden-button");
        } else {
            item.classList.remove("hidden-button");
        }
    });
});