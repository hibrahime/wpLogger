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

function start() {
    addMessageReceiversToFollow();

    console.log('peopleToFollow',peopleToFollow);
    console.log('messagesToSend',messagesToSend);

    
    //loopInsidePeopleToFollow
    //click each people
    //waitUntilValidInfo
    //checkMessagesToSend
    // isPersonHasMessage, isInsideDateRange, !isSent
    // isSendAtFirstOnline , isPersonOnline
    // sendMessage(messageObj)

}

start();

function addMessageReceiversToFollow() {
    messagesToSend.forEach(m => {
        if (peopleToFollow.findIndex(p => p.name === m.to) === -1) {
            peopleToFollow.push({ 'name': m.to, 'isOnline': false, 'onlineTimes': [] });
        }
    });
}
