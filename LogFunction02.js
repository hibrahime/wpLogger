const message = {
    'text': 'test',
    'to': 'person 1',
    'startDate': '2020-01-05 07:40',
    'endDate': '2020-01-05 10:40',
    'sendAtFirstOnline': true,
    'isSent': false
};
const peopleToFollow = [{'name': 'Person 2', 'isOnline': false, 'onlineTimes':[]}];
const messagesToSend = [message];
let isContinue = true;
let counter = 0;
const changePersonSleep = 400;

const htmlClasses = {
    "status": "_315-i",
    "inPageUserName": "_19RFN",
    "sendButton": "button._3M-N-",
    "textBox": "div._3u328",
    "contactsUserNames": "_19RFN"
}

const statusTexts = {
    "online": "çevrimiçi",
    "typing": "yazıyor...",
    "voiceRecording1": "ses kaydediyor...",
    "voiceRecording2": "ses kaydediliyor...",
    "waitingForStatusInfo": "kişi bilgisi için buraya tıkla"
}

async function checkOnline() {
    var statusText = document.getElementsByClassName(htmlClasses.status);
    var statusTextString = undefined;

    jsonData[selectedPerson]["statusTimes"] ? null : jsonData[selectedPerson]["statusTimes"] = [];
    var latestStatusInfo = jsonData[selectedPerson]["statusTimes"][0];

    //waitUntilValidInfo
    if (statusText.length > 0) {
        statusTextString = statusText[0].innerHTML;
        if (statusTextString == statusTexts.waitingForStatusInfo) {
            await sleep(3000);
        }
    }

    if ((latestStatusInfo && latestStatusInfo.OfflineMoment && latestStatusInfo.OnlineMoment) || !latestStatusInfo) {
        if (statusTextString == statusTexts.online || statusTextString == statusTexts.typing || statusTextString == statusTexts.voiceRecording1 || statusTextString == statusTexts.voiceRecording2) {
            jsonData[selectedPerson]["statusTimes"].unshift({
                "OnlineMoment": dateString
            });
            [...chart.data].filter(p => p.name == selectedPerson)[0].dataPoints.push({ x: dateGetTime, y: 1 });
        }
    }
    else if (latestStatusInfo && !latestStatusInfo.OfflineMoment && latestStatusInfo.OnlineMoment) {
        if (!(statusTextString == statusTexts.online || statusTextString == statusTexts.typing || statusTextString == statusTexts.voiceRecording1 || statusTextString == statusTexts.voiceRecording2)) {
            jsonData[selectedPerson]["statusTimes"][0].OfflineMoment = dateString;
            [...chart.data].filter(p => p.name == selectedPerson)[0].dataPoints.push({ x: dateGetTime, y: 0 });
        }
    }
};

function simulateMouseEvents(element, eventName) {
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initEvent(eventName, true, true);
    element.dispatchEvent(mouseEvent);
};

function clickPerson(person) {
    var people = document.getElementsByClassName(htmlClasses.contactsUserNames);
    var personToBeSelected = ([...people].filter(element => element.textContent == person.name))[0];
    simulateMouseEvents(personToBeSelected, 'mousedown');
};

function addMessageReceiversToFollow() {
    messagesToSend.forEach(m => {
        if (peopleToFollow.findIndex(p => p.name === m.to) === -1) {
            peopleToFollow.push({ 'name': m.to, 'isOnline': false, 'onlineTimes': [] });
        }
    });
}

function start() {
    addMessageReceiversToFollow();

    console.log('peopleToFollow',peopleToFollow);
    console.log('messagesToSend',messagesToSend);

    do {
        clickPerson(peopleToFollow[counter%peopleToFollow.length]);
        await checkOnline();
        await sleep(changePersonSleep);
    } while (isContinue)

    //loopInsidePeopleToFollow
    //click each people

    //checkMessagesToSend
    // isPersonHasMessage, isInsideDateRange, !isSent
    // isSendAtFirstOnline , isPersonOnline
    // sendMessage(messageObj)

}

start();
