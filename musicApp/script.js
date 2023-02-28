const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Heaven",
		emblem: "Spotify Music",
		"bg-color": ["#05640a", "#000000"],
		"accent-color": "#0ed018",
		url: "https://images.squarespace-cdn.com/content/v1/554bfd09e4b0dd80a879a190/1436367225685-GF43E2GFJ8RGH6IDE5R4/WEB+BLUE.jpg",
		spotify:
			"https://open.spotify.com/embed/track/72SpPFrMYCXLB3Fbw9tEgf?si=41920434ab574932"
	},
    {
		album: "Clarity",
      emblem: "Spotify Music",
      "bg-color": ["#05640a", "#000000"],
      "accent-color": "#0ed018",
		url:
			"https://www.youredm.com/wp-content/uploads/2014/12/zedd-making-a-funny-face.jpeg",
		spotify:
			"https://open.spotify.com/embed/track/60wwxj6Dd9NJlirf84wr2c?si=a2fd22f5010b4776"
	},
	{
		album: "Levels",
    emblem: "Spotify Music",
    "bg-color": ["#05640a", "#000000"],
    "accent-color": "#0ed018",
		url: "https://compote.slate.com/images/c2d03c76-cf68-43d9-b65c-d62cfe5554e9.jpeg?crop=2948%2C1965%2Cx0%2Cy0",
		spotify:
			"https://open.spotify.com/embed/track/6Xe9wT5xeZETPwtaP2ynUz?si=f9f1ac42b3694afb"
	},
	{
		album: "Lady",
    emblem: "Spotify Music",
    "bg-color": ["#05640a", "#000000"],
    "accent-color": "#0ed018",
		url:
			"https://i.scdn.co/image/8f2048dffffc81657d59a5386e691d4d9e3f7dc7",
		spotify:
			"https://open.spotify.com/embed/track/49X0LAl6faAusYq02PRAY6?si=ac710b5fb9f148e4"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);
