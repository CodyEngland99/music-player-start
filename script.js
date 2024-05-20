const container = document.getElementById("music-container");
const valueBar = document.querySelector("#progress");
const valueChange = document.querySelector("#progress-container");
const playPause = document.getElementById("play");
const prevBtn = document.querySelector(".fa-backward");
const nextBtn = document.querySelector(".fa-forward");
const audio = document.getElementById("audio");
const image = document.getElementById("cover");
const controls = document.getElementById("control")

const songs = ["ukulele", "summer", "hey"];

function songPausePlay() {
	const condition = container.classList.contains("play");

	if (condition) {
		audio.pause();
		container.classList.remove("play");
		container.classList.add("pause");
		controls.classList.remove("fa-pause")
		controls.classList.add("fa-play")
	} else if (!condition) {
		audio.play();
		container.classList.remove("pause");
		container.classList.add("play");
		controls.classList.remove("fa-play")
		controls.classList.add("fa-pause")
	} else {
		console.log("Error");
	}
}

let songNum = 0;

function songChange(e) {
	const condition = e.target;

	if (condition.classList.contains("fa-backward")) {
		songNum--;
		if (songNum < 0) {
			songNum = songNum + songs.length;
			songPlay(songNum);
		} else {
			songPlay(songNum);
		}
	} else if (condition.classList.contains("fa-forward")) {
		songNum++;
		if (songNum > songs.length - 1) {
			songNum = 0;
			songPlay(songNum);
		} else {
			songPlay(songNum);
		}
	} else {
		console.log("Error");
	}
}

function songPlay() {
	audio.src = `music/${songs[songNum]}.mp3`;
	image.src = `images/${songs[songNum]}.jpg`;

	audio.play();
	container.classList.add("play");
}

function updateProgress() {
	const { duration, currentTime } = audio;
	const progressPercent = (currentTime / duration) * 100;
	valueBar.style.width = `${progressPercent}%`;
}

function setProgress(event) {
	const width = this.clientWidth;
	const clickX = event.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

function init() {
	playPause.addEventListener("click", songPausePlay);
	prevBtn.addEventListener("click", songChange);
	nextBtn.addEventListener("click", songChange);
	audio.addEventListener("timeupdate", updateProgress);
	valueChange.addEventListener("click", setProgress);
}

document.addEventListener("DOMContentLoaded", init);
