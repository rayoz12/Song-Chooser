//extremely hacky way doing this.

//config
const headingColour = "#FFC000";
const headingSelector = `span[style*="color:${headingColour}"`

//scroll config
const scrollConfig = [{
	text: "Slow Scroll",
	clickHandler: scrollSlow
},{
	text: "Medium Scroll",
	clickHandler: scrollMedium
},{
	text: "Fast Scroll",
	clickHandler: scrollFast
},{
	text: "Stop Scroll",
	clickHandler: scrollStop
}];

//Style sheet

css = `
.text {
	color: white;
}

#UIDiv {
	float: right;
	position: sticky;
	top: 0px;
}

.scrollInfo {
	padding-top: 5%;
	font-size: 30px;
}

.headingsList {
	max-height: 100px;
	height: auto;
	overflow-y: scroll;
	overflow-x: scroll;
	border: 1px solid white;
	display: inline-block
}

.headingsList>span{
	cursor: pointer;
	text-decoration: underline;
	color: #0563C1;
}
`;

let sheet = document.createElement('style');
sheet.innerHTML = css;
document.body.appendChild(sheet);

window.originalSetInterval=window.setInterval;
window.originalClearInterval=window.clearInterval;
window.activeIntervals=[];

window.setInterval = function(func,delay)
{
	const intervalID = window.originalSetInterval(func,delay);
	window.activeIntervals.push(intervalID);
	// console.log("Interval Registered:", intervalID);
	return intervalID
};

window.clearInterval = function(intervalID)
{
	const index = window.activeIntervals.indexOf(intervalID);
	if (index <= -1)
		console.log("Interval:", intervalID, "doesn't exist");
	else {
		window.activeIntervals.splice(index, 1);
		// console.log("Interval Cleared:", intervalID);
	}
	window.originalClearInterval(intervalID);
};

//---------------------------------Feature Detection---------------------------------------
pipEnabled = true;
if (!('pictureInPictureEnabled' in document)) {
	console.warn('The Picture-in-Picture Web API is not available.');
	pipEnabled = false;
}
else if (!document.pictureInPictureEnabled) {
	console.warn('The Picture-in-Picture Web API is disabled.');
	pipEnabled = false;
}


//-------------------------Start Presentation software Logic-------------------------------
//GLOBAL VARIABLES
//----------Presentation window variables-------------
dispWindow = null;
scrollInterval = null;

closedWindowTimeout = 5000;
closedWindowTimeoutID = null;

//--------------------Picture in picture variables-----
pipDrawInterval = 300;
pipDrawIntervalID = null;

dispWindowCanvas = document.createElement('canvas');
dispWindowCtx = dispWindowCanvas.getContext('2d');
dispWindowCtx.fillRect(0, 0, dispWindowCanvas.width, dispWindowCanvas.height);
document.body.append(dispWindowCtx);

video = document.createElement('video');
video.muted = true;
const framerate = Math.ceil(1000 / pipDrawInterval);
video.srcObject = dispWindowCanvas.captureStream(framerate < 1 ? 1 : framerate); //determine framerate from drawInterval
video.play();

pipButtonElem = null;


function init() {
	
	const UIDiv = $('<div/>', {
		id: "UIDiv",
	});
	
	const controlsDiv = document.createElement("div");
	controlsDiv.id = "controls";
	
	const scrollPercent = $('<div/>', {
		id: "scrollPercent",
		text: "Scroll: 0/100%",
		class: "text scrollInfo"
	});
	
	const headings = $('<h2/>', {
		id: "headings",
		text: "Headings",
		class: "text"
	});
	
	const headingsList = $('<div/>', {
		id: "headingsList",
		text: "Headings.......",
		class: "text headingsList"
	});
	
	const h1 = document.createElement("h1");
	h1.innerHTML = "Controls";
	h1.classList = "text";

	controlsDiv.appendChild(h1);

	for (let i = 0; i < scrollConfig.length; i++) {
		const scroll = scrollConfig[i];
		const button = document.createElement("button");
		button.innerHTML = scroll.text;
		button.addEventListener("click", scroll.clickHandler);
		controlsDiv.appendChild(button);
	}

	if (pipEnabled) {
		pipButtonElem = document.createElement("button");
		pipButtonElem.id = "togglePipButton";
		pipButtonElem.innerHTML = "Toggle Picture in Picture";
		pipButtonElem.hidden = true;
		pipButtonElem.addEventListener("click", initPictureinPicture);
	}
	
	UIDiv.append(controlsDiv);
	if (pipEnabled) UIDiv.append(pipButtonElem);
	UIDiv.append(scrollPercent);
	UIDiv.append(headings);
	UIDiv.append(headingsList);
	
	const linksDiv = document.getElementsByClassName("WordSection1")[0];
	$(linksDiv).prepend(UIDiv);
	
	headingsList.width($(h1).width())
	
}
//------------------------------Picture in picture mode--------------------------
async function initPictureinPicture() {
	//already enabled
	if (pipDrawIntervalID)
		return;
	pipButtonElem.disabled = true;
	try {
		await video.requestPictureInPicture();
		setUpPipDrawInterval();
	}
	catch (e) {
		console.error(e.message, e);
	}
	finally {
		pipButtonElem.disabled = false;
	}
}

async function setUpPipDrawInterval() {
	pipDrawIntervalID = setInterval(async () => {
		if (!dispWindow || dispWindow.closed)
			return;
		
		const isTallerthanViewPort = $(dispWindow).height() > dispWindow.innerHeight;
		await html2canvas(dispWindow.document.body, { 
			canvas: dispWindowCanvas, 
			x: dispWindow.scrollX,
			y: dispWindow.scrollY + 10,
			width: dispWindow.innerWidth - 30,
			height: dispWindow.innerHeight - 10,
			logging: true,
		});
		// const canvas = await html2canvas(dispWindow.document.body, { type: 'view' });
		// dispWindowCanvas.width = canvas.width;
		// dispWindowCanvas.height = canvas.height;
		// dispWindowCtx.clearRect(0, 0, dispWindowCanvas.width, dispWindowCanvas.height);
		// dispWindowCtx.drawImage(canvas, 0, 0);
		
	}, pipDrawInterval)
}

async function clearPipDrawInterval() {
	clearInterval(pipDrawIntervalID);
	pipDrawIntervalID = null;
}

// Note that this can happen if user clicked the "Toggle Picture-in-Picture"
// button but also if user clicked some browser context menu or if
// Picture-in-Picture was triggered automatically for instance.
video.addEventListener('enterpictureinpicture', function (event) {
	console.log('> Video entered Picture-in-Picture');

	pipWindow = event.pictureInPictureWindow;
	console.log(`> Window size is ${pipWindow.width}x${pipWindow.height}`);

});

video.addEventListener('leavepictureinpicture', function (event) {
	console.log('> Video left Picture-in-Picture');
	clearPipDrawInterval();
});


//------------------------------Event Handlers--------------------------

document.querySelectorAll("a").forEach(elem => $(elem).on("click", async function (e) {
	// console.log(dispWindow);
	e.preventDefault();
	e.stopPropagation();

	if (dispWindow === null)
		openWindow(this.href);
	else {
		if (!dispWindow.closed)
			dispWindow.location.href = this.href;
		else {
			//alert("YOU CLOSED THE DAMN WINDOW");
			dispWindow = null;
			openWindow(this.href);
		}
	}

	// await initPictureinPicture();

	
}));

//called whenever the target window loads a new page.
function targetWindowLoaded() {
	getHeadings();

	pipButtonElem.hidden = false;
}

/**
 * Called when the target window is unloaded.
 */
function targetWindowClosed() {
	dispWindow = null;
	pipButtonElem.hidden = true;
	clearPipDrawInterval();
	console.log("window closed");
}

function getHeadings() {
	let targetWindowHeadings = $(headingSelector, dispWindow.document);
	console.log("elems", targetWindowHeadings);
	const headings = $("#headingsList")
	headings.text("");
	for(let i = 0; i < targetWindowHeadings.length; i++) {
		let innerHTML = targetWindowHeadings[i].innerHTML;
		let cleanTitle = innerHTML.replace(`<o:p></o:p>`, "");
		let newElem = $('<span/>', {
			text: cleanTitle,
		});
		newElem.on("click", function (e) {
			scrollToElem(targetWindowHeadings[i], dispWindow);
			//console.log(this);
		});
		headings.append(newElem);
		headings.append(`<br/>`);
	}
}

function openWindow(url) {
	dispWindow = window.open(url);

	dispWindow.onbeforeunload = () => {
		closedWindowTimeoutID = setTimeout(() => {
			// console.log("child window closed");
			targetWindowClosed();
		}, closedWindowTimeout);

		setTimeout(() => {
			$(dispWindow).ready(() => {
				console.log("loaded on url:", dispWindow.location.href);
				clearTimeout(closedWindowTimeoutID);
				targetWindowLoaded();
			});
		}, 2000);

	}
}

function scrollToElem(elem, windowContext) {
	$('html, body', windowContext.document).stop().animate({
        scrollTop: $(elem).offset().top
    }, 2000);
}

function updateScroll(currentScroll, maxScroll) {
	const perecent = Math.round((currentScroll / maxScroll) * 100);
	$("#scrollPercent").text(`Scroll Percent: ${perecent}%`);
}

function scrollSlow() {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
	scrollInterval = scrollWindow(dispWindow, 1, 10);
}

function scrollMedium() {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
	scrollInterval = scrollWindow(dispWindow, 2, 10);
}

function scrollFast() {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
	scrollInterval = scrollWindow(dispWindow, 3, 10);
}

function scrollStop() {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
}

function scrollWindow(windowRef, pixelsScroll, intervalLength) {
	return setInterval(function () {
		// make sure it's not at the bottom
		if (windowRef.document.body.scrollTop < windowRef.document.body.scrollHeight - windowRef.document.body.clientHeight)
			windowRef.document.body.scrollTop += pixelsScroll; // move down
		else {
			console.log("Reached end of page");
			clearInterval(scrollInterval);
		}
		updateScroll(windowRef.document.body.scrollTop, windowRef.document.body.scrollHeight - windowRef.document.body.clientHeight);
	}, intervalLength); // 10 milliseconds
}

$(document.body).on('keydown', function (e) {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
});

init();