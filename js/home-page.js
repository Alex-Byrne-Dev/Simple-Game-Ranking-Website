const quotes = [
    "Welcome to my website!",
    "Don't get mad at me for the default game ranks, it's just my opinion!",
    "This website was made for an assignment!"
];
const RandomNumber = (max) => {
    return Math.floor(Math.random() * max);
};
const CapitaliseSentence = (sentence) => {
    let parsed = "";
    sentence.split(" ").forEach((word) => {
        parsed += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
    });
    parsed = '"' + parsed.slice(0, parsed.length - 1) + '"'
    return parsed;
};

const quoteIndex = RandomNumber(quotes.length);
document.querySelector("blockquote").textContent = CapitaliseSentence(quotes[quoteIndex]);

console.log("Quotes NOT chosen:");
for (let i = 0; i < quotes.length; i++) {
    if (i != quoteIndex) {
        console.log(quotes[i]);
    }
};