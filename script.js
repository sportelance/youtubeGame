const videoStore = ["https://www.youtube.com/embed/vR6_ZVKEhJ4?si=WWFG13XZnUubAlKc"];

let displayedVideoIndex = 0;
let displayedComponent = 'videoControls';

function createAllIFrameElements() {
    const carousel = document.getElementById("carousel-inner");
    carousel.innerHTML = "";
    for (videoLink of videoStore) {
        const iframeElement = document.createElement("iframe");
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("carousel-item");
        if (carousel.innerHTML === ""){
            parentDiv.classList.add("active");
        } 
        iframeElement.setAttribute("src", videoLink);
        iframeElement.setAttribute("frameborder", "0");
        iframeElement.setAttribute("allowfullscreen", "");
        parentDiv.appendChild(iframeElement);
        carousel.appendChild(parentDiv);
    }
}

function removeVideoByLink(link) {
    const indexToBeDeleted = videoStore.indexOf(link)
    videoStore.splice(1, indexToBeDeleted);
    createAllIFrameElements();
}

function addVideoByLink(videoLink) {
    console.log("called with: ", videoLink)
    videoStore.push(videoLink);
    createAllIFrameElements();
}

function checkYouTubeLink() {
    const potentialYoutubeLink = document.getElementById("youtubeLink").value;
    const errorBox = document.getElementById("errorMessage");
  
    // Regular expression to match YouTube embed links
    const youtubeEmbedRegex = /youtube.*embed/;
    const youtubeRegex = /youtube*/;
    if (videoStore.includes(potentialYoutubeLink)) {
        errorBox.textContent = "This video has already been added.";
    } else if (youtubeEmbedRegex.test(potentialYoutubeLink)) {
        addAndAlert(potentialYoutubeLink, errorBox);
    } else if (youtubeRegex.test(potentialYoutubeLink)) {
        const embedLink = convertToEmbedLink(potentialYoutubeLink);
        addAndAlert(embedLink, errorBox);
    } else {
        errorBox.textContent = "Please enter a valid YouTube embed link.";
    }
}

function addAndAlert(potentialYoutubeLink, errorBox) {
    errorBox.textContent = ""; // Clear any previous error message
    alert("YouTube embed link submitted successfully!");
    addVideoByLink(potentialYoutubeLink);   
}

function convertToEmbedLink(youtubeLink) {
    // Extract video ID from the YouTube link
    var videoID = youtubeLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
  
    // Construct the embed link using the video ID
    var embedLink = "https://www.youtube.com/embed/" + videoID;
  
    return embedLink;
  }

function previousVideo() {
    displayedVideoIndex = (displayedVideoIndex - 1 + videoStore.length) % videoStore.length;
    updateDisplayedVideo();
}

function nextVideo() {
    displayedVideoIndex = (displayedVideoIndex + 1) % videoStore.length;
    updateDisplayedVideo();
}

function updateDisplayedVideo() {
    const videoElements = document.querySelectorAll('.carousel-item');
    console.log("videoElements.length", videoElements.length)
    videoElements.forEach((video, i) => {
        console.log("video: ", video)
        console.log("i: ", i)
        if (i === displayedVideoIndex) {
            video.classList.add('active');
            video.style.display = 'inline';
        } else {
            video.classList.remove('active');
            video.style.display = 'none';
        }
    });
}

function toggleDisplayedComponent() {
    if (displayedComponent === 'videoControls') {
        document.getElementById('videoControls').style.display = "none";
        document.getElementById('addVideoContainer').style.display = "inline";
        displayedComponent = 'addVideoContainer';
    } else if (displayedComponent === 'addVideoContainer') {
        document.getElementById('addVideoContainer').style.display = "none";
        document.getElementById('videoControls').style.display = "block";
        displayedComponent = 'videoControls';
    } else {
        alert(`displayedComponent variable is misconfigured. Its current value is ${displayedComponent}`)
    }
}

function shuffleVideos() {
    shuffleArray(videoStore);
    createAllIFrameElements();
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function deleteDisplayedVideo() {
    const displayedVideo = document.getElementsByClassName('carousel-item active')[0];
    const displayedIFrame = displayedVideo.children[0]; 
    const link = displayedIFrame.src;
    removeVideoByLink(link);
    createAllIFrameElements(); 
}