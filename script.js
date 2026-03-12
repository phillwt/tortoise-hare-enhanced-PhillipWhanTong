//render the track

//start the race with a button click

//trigger the move every second


const TRACK_LENGTH = 70 //sometimes constant variables are shown in all CAPS
const startBtn = document.getElementById("startBtn")
const easyBtn = document.getElementById("easyBtn")
const hardBtn = document.getElementById("hardBtn")

const message = document.getElementById("message")
const track = document.getElementById("track")

let tortoisePosition = 1
let harePosition = 1
let raceIntervalId = null
let stepCount = 0
let isHardMode = false

startBtn.addEventListener("click", startRace)
easyBtn.addEventListener("click", () => {
    isHardMode = false
    easyBtn.disabled = true
    hardBtn.disabled = false

})
hardBtn.addEventListener("click", () => {
    isHardMode = true
    hardBtn.disabled = true
    easyBtn.disabled = false
})


function startRace() {
    tortoisePosition = 1
    harePosition = 1
    message.textContent = "Bang!! and they are off!"

    startBtn.disabled = true

    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId)
    }

    raceIntervalId = setInterval(raceStep, 1000)
}
function raceStep() {
    stepCount++

    // move tortoise randomly (Math.random)
    moveTortoise()

    //move hare randomly
    if (isHardMode === true) {
        moveHareHardMode()
    } else {
        moveHare()

    }

    //fix position if they go beyond range of 0 - 70
    clampPositions()

    //render track with new positions
    renderTrack()

    //when one of the animals reach 70+, show result message
    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId)
        raceIntervalId = null
        showResult()
        startBtn.disabled = false

        renderTrack()
    }
}

function moveTortoise() {
    let roll = Math.floor(Math.random() * 10) + 1

    if (roll >= 1 && roll <= 5) {
        //move fast forward 1 to 5
        tortoisePosition += 4
    } else if (roll >= 6 && roll <= 7) {
        //slips back 6 to 7
        tortoisePosition -= 5
    } else {
        //slowly moves forward 8 to 10
        tortoisePosition += 1
    }
}

function moveHare() {
    let roll = Math.floor(Math.random() * 10) + 1

    if (roll >= 1 && roll <= 5) {
        //move fast forward 1 to 5
        harePosition += 10
    } else if (roll >= 6 && roll <= 7) {
        //super distracted 6 to 7
        harePosition -= 12
    } else {
        //brags to others 8 to 10
        harePosition -= -5
    }

}

function moveHareHardMode() {
    //hard moode makes it so that the hare rests more frequently
    //this is technically harder for the hare, not the tortoise
    let roll = Math.floor(Math.random() * 10) + 1

    if (roll >= 1 && roll <= 5) {
        harePosition += 0
    } else if (roll >= 6 && roll <= 7) {
        harePosition += 10
    } else {
        harePosition -= 8
    }

}

function clampPositions() {
    tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition))
    harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition))
}

function renderTrack() {
    track.innerHTML = ''

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        let isTortoiseHere = tortoisePosition === i
        let isHareHere = harePosition === i

        if (isTortoiseHere && isHareHere) {
            cell.classList.add('both')
            cell.textContent = '🔥'
        } else if (isTortoiseHere) {
            cell.classList.add('tortoise')
            cell.textContent = '🐢'
        } else if (isHareHere) {
            cell.classList.add('hare')
            cell.textContent = '🐇'
        }
        track.appendChild(cell)
    }
}

function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        message.textContent = 'TIE'
    } else if (tortoisePosition >= TRACK_LENGTH) {
        message.textContent = 'TORT WIN'
    } else if (harePosition >= TRACK_LENGTH) {
        message.textContent = 'HARE WIN'
    } else {
        message.textContent = 'Stopped'
    }
}

//initial render
renderTrack()
//initial showing that easy is selected
easyBtn.disabled = true
hardBtn.disabled = false
isHardMode = false