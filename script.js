function updateTime() {
    var timeElement = document.querySelector("#timeElement");
    if (timeElement) {
        timeElement.innerHTML = new Date().toLocaleString();
    }
}

updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
    var welcomeScreen = document.querySelector("#welcome");
    var welcomeScreenClose = document.querySelector("#welcomeclose");
    var welcomeScreenOpen = document.querySelector("#welcomeopen");

    if (welcomeScreen) {
        dragElement(welcomeScreen);
    }

    if (welcomeScreenClose && welcomeScreen) {
        welcomeScreenClose.addEventListener("click", function () {
            closeWindow(welcomeScreen);
        });
    }

    if (welcomeScreenOpen && welcomeScreen) {
        welcomeScreenOpen.addEventListener("click", function () {
            openWindow(welcomeScreen);
        });
    }
});

function closeWindow(element) {
    element.style.visibility = "hidden";
}

function openWindow(element) {
    element.style.visibility = "visible";
}

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    var header = document.getElementById(element.id + "header");

    if (header) {
        header.onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}