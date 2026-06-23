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
    var notepadApp = document.querySelector("#notepadApp");
    var notepadAppClose = document.querySelector("#notepadAppclose");
    var notepadAppOpen = document.querySelector("#notepadAppopen");
    var googleApp = document.querySelector("#google");
    var googleAppClose = document.querySelector("#googleclose");
    var googleAppOpen = document.querySelector("#googleopen");

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

    if (notepadApp) {
        dragElement(notepadApp);
    }

    if (notepadAppClose && notepadApp) {
        notepadAppClose.addEventListener("click", function () {
            closeWindow(notepadApp);
        });
    }

    if (notepadAppOpen && notepadApp) {
        notepadAppOpen.addEventListener("click", function () {
            openWindow(notepadApp);
        });
    }

    if (googleApp) {
        dragElement(googleApp);
    }

    if (googleAppClose && googleApp) {
        googleAppClose.addEventListener("click", function () {
            closeWindow(googleApp);
        });
    }

    if (googleAppOpen && googleApp) {
        googleAppOpen.addEventListener("click", function () {
            openWindow(googleApp);
        });
    }
});

function closeWindow(element) {
    element.style.visibility = "hidden";
}

function openWindow(element) {
    element.style.visibility = "visible";
}

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notepadApp"));
dragElement(document.getElementById("google"));
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;
    
  // Check if there is a special header element associated with the draggable element.
  var header = document.getElementById(element.id + "header");
  if (header) {
    // Assign the `startDragging` function to the header's `onmousedown` event.
    header.onmousedown = startDragging;
  } else {
    // Assign the function directly to the draggable element's `onmousedown` event.
    element.onmousedown = startDragging;
  }

  // Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    
    // --- INTEGRATED: Bring the clicked window to the top ---
    layerOnTop(element);
    
    // Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    
    // Set up event listeners for mouse movement and mouse button release.
    document.onmouseup = stopDragging;
    document.onmousemove = moveElement; // Renamed to avoid conflicting with outer function name
  }
  
  // Define the `moveElement` function to calculate the new position of the element based on mouse movement.
  function moveElement(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    // Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // The helper function to calculate and apply the highest z-index
  function layerOnTop(el) {
    const windows = document.querySelectorAll('.window');
    
    // Map all z-indices to numbers, defaulting to 0 if auto/invalid
    const zIndices = Array.from(windows, w => 
      parseInt(window.getComputedStyle(w).zIndex, 10) || 0
    );

    // Find the highest z-index (default to 0 if no windows exist)
    const maxZIndex = zIndices.length > 0 ? Math.max(...zIndices) : 0;

    // Optional optimization: If the element is already on top, do nothing
    const currentZ = parseInt(window.getComputedStyle(el).zIndex, 10) || 0;
    if (currentZ === maxZIndex && maxZIndex > 0) return;

    // Set the new z-index one higher than the max
    el.style.zIndex = maxZIndex + 1;
  }
}

var notepadScreen = document.querySelector("#notepadApp");
var notepadClose = document.querySelector("#notepadAppclose");
var notepadTextArea = document.querySelector("#notepadText");
var clearBtn = document.querySelector("#clearNotesBtn");
var saveBtn = document.querySelector("#saveNotesBtn");

if (notepadScreen) {
    dragElement(notepadScreen);
}

if (notepadClose && notepadScreen) {
    notepadClose.addEventListener("click", function () {
        closeWindow(notepadScreen);
    });
}

if (clearBtn && notepadTextArea) {
    clearBtn.addEventListener("click", function () {
        notepadTextArea.value = "";
    });
}

if (saveBtn && notepadTextArea) {
    var savedNote = localStorage.getItem("goopOS_notepad_save");
    if (savedNote) {
        notepadTextArea.value = savedNote;
    }

    saveBtn.addEventListener("click", function () {
        localStorage.setItem("goopOS_notepad_save", notepadTextArea.value);
        alert("Notes saved successfully!");
    });
}