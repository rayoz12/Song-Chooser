//extremely hacky way doing this.

//config

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
.controlText {
	color: white;
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
	console.log("Interval Registered:", intervalID);
	return intervalID
};

window.clearInterval = function(intervalID)
{
	const index = window.activeIntervals.indexOf(intervalID);
	if (index <= -1)
		console.log("Interval:", intervalID, "doesn't exist");
	else {
		window.activeIntervals.splice(index, 1);
		console.log("Interval Cleared:", intervalID);
	}
	window.originalClearInterval(intervalID);
};

dispWindow = null;
scrollInterval = null;


function init() {
	//
	const h1 = document.createElement("h1");
	h1.innerHTML = "Controls";
	h1.classList = "controlText";

	const linksDiv = document.getElementsByClassName("WordSection1")[0];

	linksDiv.appendChild(h1);

	for (let i = 0; i < scrollConfig.length; i++) {
		const scroll = scrollConfig[i];
		const button = document.createElement("button");
		button.innerHTML = scroll.text;
		button.addEventListener("click", scroll.clickHandler);
		linksDiv.appendChild(button);
	}

}



$("a").on("click", function (e) {
	console.log(dispWindow);
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
	console.log(this);
	e.preventDefault();
});

function openWindow(url) {
	dispWindow = window.open(url);
	$(dispWindow).on('load', () => {
	    console.log("loaded on url:", dispWindow.location.href);
	});
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
	}, intervalLength); // 10 milliseconds
}

$(document.body).on('keydown', function (e) {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
});

init();