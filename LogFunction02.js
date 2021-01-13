const document = {};
const window = {};
const message = {
  text: 'Dostum yeni çelıncımız nedir?',
  to: 'Furkan Burak Bağcı',
  startDate: '2021-01-13 21:30',
  endDate: '2021-01-13 22:55',
  sendAtFirstOnline: false,
  isSent: false,
};
const peopleToFollow = [{ name: 'Furkan Burak Bağcı', isOnline: false, onlineTimes: [] }];
const messagesToSend = [message];
const isContinue = true;
const counter = 0;
const checkOnlineSleep = 300;
const changePersonSleep = 400;
const waitValidStatusSleep = 3000;

const htmlClasses = {
  status: '_3Id9P', // _3Id9P
  inPageUserName: '_19RFN',
  sendButton: 'button._3M-N-',
  textBox: 'div.DuUXI',// div.DuUXI
  contactsUserNames: '_1hI5g', // _1hI5g
};

const statusTexts = {
  onlineTypes: {
    online: 'çevrimiçi',
    typing: 'yazıyor...',
    voiceRecording1: 'ses kaydediyor...',
    voiceRecording2: 'ses kaydediliyor...',
  },
  unknownTypes: {
    waitingForStatusInfo: 'kişi bilgisi için buraya tıkla',
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateMouseEvents(element, eventName) {
  const mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initEvent(eventName, true, true);
  element.dispatchEvent(mouseEvent);
}

function sendMessage({ text }) {
  window.InputEvent = window.Event || window.InputEvent;

  const event = new InputEvent('input', {
    bubbles: true,
  });
  // document.querySelector(_1awRl).textContent = 'text'

  const textbox = document.querySelector(htmlClasses.textBox);

  textbox.textContent = text;
  textbox.dispatchEvent(event);
  console.log(`${text}`);
  document.querySelector(htmlClasses.sendButton).click();
}

function isInsideDateRange(sd, ed) {
  const [startDate, startTime] = sd.split(' ');
  const [endDate, endTime] = ed.split(' ');
  const [syear, smonth, sday] = startDate.split('-');
  const [eyear, emonth, eday] = endDate.split('-');
  const [shour, sminute] = startTime.split(':');
  const [ehour, eminute] = endTime.split(':');
  const dateNowEpoch = (new Date()).getTime();
  const startDateEpoch = new Date(syear, smonth - 1, sday, shour, sminute).getTime();
  const endDateEpoch = new Date(eyear, emonth - 1, eday, ehour, eminute).getTime();
  return dateNowEpoch >= startDateEpoch && dateNowEpoch <= endDateEpoch;
}

function checkStatus() {
  const statusText = document.getElementsByClassName(htmlClasses.status);
  const statusTextString = statusText[0].innerHTML;
  return statusTextString;
}

function clickPerson(person) {
  const people = document.getElementsByClassName(htmlClasses.contactsUserNames);
  const personToBeSelected = ([...people].filter((element) => element.textContent === person.name))[0];
  simulateMouseEvents(personToBeSelected, 'mousedown');
}

function addMessageReceiversToFollow() {
  messagesToSend.forEach((m) => {
    if (peopleToFollow.findIndex((p) => p.name === m.to) === -1) {
      peopleToFollow.push({ name: m.to, isOnline: false, onlineTimes: [] });
    }
  });
}

function help() {
  console.log('peopleToFollow', peopleToFollow);
  console.log('messagesToSend', messagesToSend);
}

async function start() {
  addMessageReceiversToFollow();
  help();

  do {
    const person = peopleToFollow[counter % peopleToFollow.length];
    clickPerson(person);
    await sleep(checkOnlineSleep);
    const status = checkStatus();
    person.isOnline = Object.values(statusTexts.onlineTypes).includes(status);
    if (!Object.values(statusTexts.unknownTypes).includes(status)) {
      const messages = messagesToSend.filter((m) => m.to === person.name
      && isInsideDateRange(m.startDate, m.endDate)
      && !m.isSent
      && ((message.sendAtFirstOnline && person.isOnline)
        || !message.sendAtFirstOnline));

      if (messages && messages.length) {
        for (let index = 0; index < messages.length; index += 1) {
          const msgObj = messages[index];
          console.log('msgObj', msgObj);
          // sendMessage(msgObj)
        }
      }
    } else {
      await sleep(waitValidStatusSleep);
    }
    await sleep(changePersonSleep);
  } while (isContinue);
}

start();
