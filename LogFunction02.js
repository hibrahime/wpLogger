/*
- sendMessage(messageObj) it can send message with message object 
- usersToFollow loop click each item  
- check isOnline or not
- is user have message , is startdate < t < enddate, issent false, isFirstOnline
- send message func.
- test
- test5
*/
const message = {
    'text': 'test',
    'to': 'person 1',
    'startDate': '2020-01-05 07:40',
    'endDate': '2020-01-05 10:40',
    'sendAtFirstOnline': true,
    'isSent': false
};
const peopleToFollow = [{'name': 'Person 2', 'isOnline': false}];
const messagesToSend = [message];

function start() {
//addMessageReceiversToFollow
    console.log('peopleToFollow',peopleToFollow);
    console.log('messagesToSend',messagesToSend);
    //loopInsidePeopleToFollow
    //click each people
}
