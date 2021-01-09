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
const checkOnlineSleep = 300;
const changePersonSleep = 400;
const waitValidStatusSleep = 3000;

const htmlClasses = {
    "status": "_315-i",
    "inPageUserName": "_19RFN",
    "sendButton": "button._3M-N-",
    "textBox": "div._3u328",
    "contactsUserNames": "_19RFN"
}

const statusTexts = {
    "onlineTypes": {
        "online": "çevrimiçi",
        "typing": "yazıyor...",
        "voiceRecording1": "ses kaydediyor...",
        "voiceRecording2": "ses kaydediliyor..."
    },
    "unknownTypes": {
        "waitingForStatusInfo": "kişi bilgisi için buraya tıkla"
    }
}

function checkStatus() {
    var statusText = document.getElementsByClassName(htmlClasses.status);
    var statusTextString = statusText[0].innerHTML;
    return statusTextString;
}

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
        await sleep(checkOnlineSleep);
        const status = checkStatus();
        if(Object.values(statusTexts.onlineTypes).includes(status)){

        } else if (Object.values(statusTexts.unknownTypes).includes(status)){
            await sleep(waitValidStatusSleep);
        }
        await sleep(changePersonSleep);
    } while (isContinue)

    //checkMessagesToSend
    // isPersonHasMessage, isInsideDateRange, !isSent
    // isSendAtFirstOnline , isPersonOnline
    // sendMessage(messageObj)

}

start();