let columnA = [];
let columnB = [];
let currentSentence = ""; // aktuell angezeigter Satz mit XXX entfernt
let currentWord = "";

async function loadExcel() {
    try {
        const response = await fetch("data.xlsx");
        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        columnA = rows.map(row => row[0]).filter(v => v !== undefined && v !== "");
        columnB = rows.map(row => row[1]).filter(v => v !== undefined && v !== "");

        showRandomEntry(); // gleich beim Laden
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Fehler beim Laden.";
    }
}

function showRandomEntry() {
    if (columnA.length === 0 || columnB.length === 0) return;

    // Neuer Satz
    const randomSentence = columnA[Math.floor(Math.random() * columnA.length)];
    currentSentence = randomSentence; // merken

    const randomWord = columnB[Math.floor(Math.random() * columnB.length)];
    currentWord = randomWord; // merken
    const finalSentence = currentSentence.replace(
        "XXX",
        `<span class="highlight">${currentWord}</span>`
    );

    document.getElementById("output").innerHTML = finalSentence;
}


// Vorheriger Code bleibt unverändert

// Funktion für eigenen Satz

function setCustomSentence() {
    const input = document.getElementById("customInput").value.trim();
    const errorEl = document.getElementById("error");

    if (!input.includes("XXX")) {
        errorEl.innerText = "Der Satz muss 'XXX' enthalten!";
        return;
    }

    errorEl.innerText = "";
    currentSentence = input; // merken

    const randomWord = columnB[Math.floor(Math.random() * columnB.length)];
    const finalSentence = currentSentence.replace(
        "XXX",
        `<span class="highlight">${randomWord}</span>`
    );

    document.getElementById("output").innerHTML = finalSentence;
}


// Neuer Button: nur Wort wechseln
function replaceWordOnly() {
    if (!currentSentence || columnB.length === 0) return;

    const randomWord = columnB[Math.floor(Math.random() * columnB.length)];
    currentWord = randomWord;
    const finalSentence = currentSentence.replace(
        "XXX",
        `<span class="highlight">${currentWord}</span>`
    );

    document.getElementById("output").innerHTML = finalSentence;
}

// Neuer Button: nur Wort wechseln
function replaceSentenceOnly() {

    const randomSentence = columnA[Math.floor(Math.random() * columnA.length)];
    currentSentence = randomSentence;
    const finalSentence = currentSentence.replace(
        "XXX",
        `<span class="highlight">${currentWord}</span>`
    );

    document.getElementById("output").innerHTML = finalSentence;
}

// Event Listener
document.getElementById("newBtn").addEventListener("click", replaceSentenceOnly);
document.getElementById("customBtn").addEventListener("click", setCustomSentence);
document.getElementById("customInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        setCustomSentence();
        e.preventDefault();
    }
});
document.getElementById("newWordBtn").addEventListener("click", replaceWordOnly);

loadExcel();















