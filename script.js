function startLoading() {
    const yourName = document.getElementById("yourName").value.trim();
    const crushName = document.getElementById("crushName").value.trim();

    if (!yourName || !crushName) {
        return; // Don't calculate if any name field is empty
    }

    // Hide the button during loading
    document.getElementById("calculateButton").style.display = "none";

    // Show loading bar
    document.getElementById("loadingBarContainer").style.display = "block";
    document.getElementById("result").style.display = "none";
    let progress = 0;
    const loadingBar = document.getElementById("loadingBar");

    // Simulate loading process
    const loadingInterval = setInterval(function () {
        progress += 5;
        loadingBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(loadingInterval);
            displayResult(yourName, crushName);
        }
    }, 100); // Update the progress every 100ms
}

function displayResult(yourName, crushName) {
    const flamesResults = {
        F: "Feeling mo siya na, pero siya lang talaga ang nagpaparamdam sayo ng gutom.",
        L: "Lagi kang naghihintay ng text niya, pero nakalimutan mong wala pala siyang load.",
        A: "Ang pag-ibig ay parang Wi-Fi, minsan may signal, madalas wala.",
        M: "Masarap magmahal, lalo na kung siya rin ang mahal ng nanay mo.",
        E: "Eto na naman, nagpalibre ka lang ng milk tea, inakala niya love mo na siya.",
        S: "Sa hinaba-haba ng paghihintay mo, naging ‘best friend’ ka lang pala."
    };

    let combinedNames = yourName.toLowerCase().replace(/ /g, "") + crushName.toLowerCase().replace(/ /g, "");
    let uniqueLetters = [...new Set(combinedNames)];
    let total = uniqueLetters.length % 6;

    const flamesKeys = ["F", "L", "A", "M", "E", "S"];
    const resultKey = flamesKeys[total === 0 ? 5 : total - 1];
    const resultText = flamesResults[resultKey];

    // Hide loading bar and show result
    document.getElementById("loadingBarContainer").style.display = "none";
    document.getElementById("result").style.display = "block";

    // Display result in the format: FLAMES Result: X "text"
    document.getElementById("result").innerHTML = `
        <p><strong>FLAMES Result: ${resultKey}</strong></p>
        <p>"${resultText}"</p>
    `;
}
