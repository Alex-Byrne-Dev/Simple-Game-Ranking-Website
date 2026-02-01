const copyrightElement = document.querySelector("#copyrightNotice");

const date = new Date;
const currentYear = date.getFullYear();

copyrightElement.innerHTML = `&copy; Alex Byrne ${currentYear}` /* Note: Remove this and associated the element once copyright expires */




/* Easter egg */

const RandomNumberEasterEgg = (max) => {
    return Math.floor(Math.random() * max);
};
let alreadyFoundEasterEgg = false;
copyrightElement.addEventListener("mouseover", () => { /* https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event */
    if (RandomNumberEasterEgg(10) == 0 && alreadyFoundEasterEgg == false) {
        alreadyFoundEasterEgg = true;
        copyrightElement.classList.add("easter-egg");
        copyrightElement.innerHTML = copyrightElement.innerHTML + " 🥚";
        setTimeout(() => {
            copyrightElement.innerHTML = `&copy; Alex Byrne ${currentYear}`
            copyrightElement.classList.remove("easter-egg");
            copyrightElement.classList.add("no-easter-egg");
        }, 5000);
    };
});