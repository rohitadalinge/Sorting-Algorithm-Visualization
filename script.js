const barsContainer = document.getElementById('bars');
const algorithmSelect = document.getElementById('algorithm-select');
const timerDisplay = document.getElementById('timer');
let bars = [];
let startTime, endTime;

// Function to randomize bars
function randomizeBars() {
    console.log("Randomizing bars...");
    barsContainer.innerHTML = ''; // Clear previous bars
    bars = []; // Reset bars array

    for (let i = 0; i < 20; i++) {
        // Random height between 30 and 300px
        let height = Math.floor(Math.random() * 270) + 30;  
        console.log(`Bar ${i} height: ${height}px`); // Debugging: Show bar height

        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${height}px`; // Set height in pixels
        barsContainer.appendChild(bar); // Add the bar to the container
        bars.push(bar); // Store the bar in an array
    }
}

// Function to get the selected algorithm
function getSelectedAlgorithm() {
    return algorithmSelect.value;
}

// Function to update timer display
function updateTimerDisplay(duration) {
    timerDisplay.textContent = `Time: ${duration.toFixed(2)}s`;
}

// Sorting function with animation
async function sortBars() {
    const algorithm = getSelectedAlgorithm();
    console.log(`Sorting with ${algorithm}...`);

    // Start the timer
    startTime = performance.now();

    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'quick':
            await quickSort(0, bars.length - 1);
            break;
        default:
            console.log("Unknown algorithm");
    }

    // End the timer and update the display
    endTime = performance.now();
    const duration = (endTime - startTime) / 1000; // Convert ms to seconds
    updateTimerDisplay(duration);
}

// Bubble Sort
async function bubbleSort() {
    let len = bars.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            let height1 = parseInt(bars[j].style.height);
            let height2 = parseInt(bars[j + 1].style.height);
            console.log(`Comparing Bar ${j} (${height1}px) with Bar ${j+1} (${height2}px)`); // Debugging

            if (height1 > height2) {
                await swapBars(j, j + 1);
            }
            await sleep(200); // Wait for 200ms for animation
        }
    }
}

// Selection Sort
async function selectionSort() {
    let len = bars.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            let height1 = parseInt(bars[j].style.height);
            let height2 = parseInt(bars[minIndex].style.height);
            console.log(`Comparing Bar ${j} (${height1}px) with Bar ${minIndex} (${height2}px)`); // Debugging

            if (height1 < height2) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swapBars(i, minIndex);
        }
        await sleep(200); // Wait for 200ms for animation
    }
}

// Insertion Sort
async function insertionSort() {
    let len = bars.length;
    for (let i = 1; i < len; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j + 1].style.height = `${parseInt(bars[j].style.height)}px`;
            j--;
            await sleep(200); // Wait for 200ms for animation
        }
        bars[j + 1].style.height = `${key}px`;
        await sleep(200); // Wait for 200ms for animation
    }
}

// Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    let pivot = parseInt(bars[high].style.height);
    let i = low - 1;

    for (let j = low; j < high; j++) {
        let height = parseInt(bars[j].style.height);

        if (height < pivot) {
            i++;
            await swapBars(i, j);
        }
    }

    await swapBars(i + 1, high);
    return i + 1;
}

// Swap function to change positions of bars in the DOM
async function swapBars(index1, index2) {
    let tempHeight = bars[index1].style.height;
    bars[index1].style.height = bars[index2].style.height;
    bars[index2].style.height = tempHeight;
    await sleep(200); // Wait for 200ms for animation
}

// Utility function to pause execution (used for animation effect)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize random bars on page load
window.onload = randomizeBars;
