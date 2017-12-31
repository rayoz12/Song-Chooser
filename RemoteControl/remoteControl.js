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
},{
	text: "Top of page",
	clickHandler: pageTop
}];


function Log(timestampEnabled) {
	this.timestampEnabled = timestampEnabled;
}

Log.prototype.log = function (string) {
	let logString = "";
	if (this.timestampEnabled)
		logString += new Date().toString();
}

Log.prototype.warning = function (string) {
	
}

Log.prototype.error = function (string) {
	
}

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
	font-size: 1em;
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
	
	const UIDiv = $('<div/>', {
		id: "UIDiv",
	});
	
	UIDiv.attr("class", "text")
	
	const controlsDiv = document.createElement("div");
	controlsDiv.id = "controls";
	
	const scrollInfo = $('<div/>', {
		id: "scrollInfo",
		text: "Scroll: 0/0"
	});
	const scrollPercent = $('<div/>', {
		id: "scrollPercent",
		text: "Scroll: 0/100%"
	});
	
	scrollInfo.attr("class", "scrollInfo");
	scrollPercent.attr("class", "scrollInfo");
	
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
	
	UIDiv.append(controlsDiv);
	UIDiv.append(scrollInfo);
	UIDiv.append(scrollPercent);
	
	const linksDiv = document.getElementsByClassName("WordSection1")[0];
	$(linksDiv).prepend(UIDiv);
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


function updateScroll(currentScroll, maxScroll) {
	$("#scrollInfo").text(`Scroll Info: ${currentScroll}/${maxScroll}`);
	const perecent = Math.round((currentScroll / maxScroll) * 100);
	$("#scrollPercent").text(`Scroll Percent: ${perecent}%`);
}

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

function pageTop() {
	if (scrollInterval !== null)
		clearInterval(scrollInterval);
	windowRef.document.body.scrollTop = 0;
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