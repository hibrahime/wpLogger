var counter = 0;
var dateNow;
var dateString;
var dateGetTime;

var selectedPerson;

var peopleList = [
    "Kisi 1",
    "Kisi 2",
    "Kisi 3",
    "Kisi 4",
    "Kisi 5",
    "Kisi 6",
    "Kisi 7",
    "Kisi 8",
    "Kisi 9",
];

var colorList = [
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "aqua",
    "blueViolet",
    "brown",
    "darkgreen"
];

var htmlString = '<!DOCTYPE HTML>' +
    '<html>' +
    '' +
    '<head>' +
    '	<script>' +
    '		window.onload = function () {' +
    '' +
    '			var chart = new CanvasJS.Chart("chartContainer",' +
    '##placeHolderForChart##' +
    '   );' +
    '				chart.render();' +
    'function toogleDataSeries(e) {' +
    '    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {' +
    '        e.dataSeries.visible = false;' +
    '    } else {' +
    '        e.dataSeries.visible = true;' +
    '    }' +
    '    chart.render();' +
    '}' +
    '		}' +
    '	</script>' +
    '</head>' +
    '' +
    '<body>' +
    '	<div id="chartContainer" style="height: 370px; width: 100%;"></div>' +
    '	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>' +
    '</body>' +
    '' +
    '</html>';

var isContinue = true;
var dayOfMonth = 6;
var maxRunningTime = new Date(new Date().getFullYear(), new Date().getMonth(), dayOfMonth, 8, 0);
var minMsgSendingTime = new Date(new Date().getFullYear(), new Date().getMonth(), dayOfMonth, 5, 0);

var messageList = [
    "Good morning",
    "Günaydın",
    "お早うございます"
];

var htmlClasses = {
    "status": "_315-i",
    "inPageUserName": "_19RFN",
    "sendButton": "button._3M-N-",
    "textBox": "div._3u328",
    "contactsUserNames": "_19RFN"
}

var statusTexts = {
    "online": "çevrimiçi",
    "typing": "yazıyor...",
    "voiceRecording1": "ses kaydediyor...",
    "voiceRecording2": "ses kaydediliyor...",
    "waitingForStatusInfo": "kişi bilgisi için buraya tıkla"
}

var chart =
{
    animationEnabled: true,
    exportFileName: "Online Minutes",
    exportEnabled: true,
    zoomEnabled: true,
    theme: "light1",
    title: {
        text: "Online Minutes",
        dockInsidePlotArea: true
    },
    axisX: {
        valueFormatString: "HH:mm:ss",
        crosshair: {
            enabled: true,
            snapToDataPoint: true
        }
    },
    axisY: {
        title: "Online",
        minimum: -0.2,
        maximum: 1.4,
        interval: 1,
        crosshair: {
            enabled: true
        }
    },
    toolTip: {
        shared: true
    },
    legend: {
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "center",
        dockInsidePlotArea: false,
        itemclick: "toogleDataSeries"
    },
    data: []
}

var jsonData = {

}

function downloadContent(name, content, outputType) {
    var atag = document.createElement("a");
    var file = new Blob([content], { type: outputType });
    atag.href = URL.createObjectURL(file);
    atag.download = name;
    atag.click();
}

function sendMessage(message) {
    window.InputEvent = window.Event || window.InputEvent;

    var event = new InputEvent('input', {
        bubbles: true
    });

    var textbox = document.querySelector(htmlClasses.textBox);

    textbox.textContent = message;
    textbox.dispatchEvent(event);
    console.log(message + " " + selectedPerson + " " + dateString)
    document.querySelector(htmlClasses.sendButton).click();
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function simulateMouseEvents(element, eventName) {
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initEvent(eventName, true, true);
    element.dispatchEvent(mouseEvent);
};

function downloadJSON() {
    var fileName = "Log File " + dateString + ".json"
    console.log("File Downloaded ==>> " + fileName);
    var stringData = JSON.stringify(jsonData, null, '\t');
    downloadContent(fileName, stringData, 'application/json');
};

function downloadHTMLChart() {
    var fileName = "Chart " + dateString + ".html"
    console.log("File Downloaded ==>> " + fileName);
    var stringHtml = htmlString.replace("##placeHolderForChart##", JSON.stringify(chart, null, '\t'));;
    downloadContent(fileName, stringHtml, "text/plain;charset=utf-8");
};

function sendFirstMessage() {
    if (dateNow.getTime() - minMsgSendingTime.getTime() > 0) {
        var isMessageSended = jsonData[selectedPerson]["isMessageSended"];

        var statusTimes = jsonData[selectedPerson]["statusTimes"];
        statusTimes ? null : statusTimes = [];
        var latestStatusInfo = statusTimes[0];

        if (!isMessageSended && latestStatusInfo && latestStatusInfo.OnlineMoment && !latestStatusInfo.OfflineMoment) {
            sendMessage(messageList[dateNow.getDate() % messageList.length]);
            jsonData[selectedPerson]["isMessageSended"] = true;
        }
    }
};

async function checkOnline() {
    var statusText = document.getElementsByClassName(htmlClasses.status);
    var statusTextString = undefined;

    var statusTimes = jsonData[selectedPerson]["statusTimes"];
    statusTimes ? null : statusTimes = [];
    var latestStatusInfo = statusTimes[0];


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

function changePerson() {
    var people = document.getElementsByClassName(htmlClasses.contactsUserNames);
    var personToBeSelected = ([...people].filter(element => element.textContent == selectedPerson))[0];
    simulateMouseEvents(personToBeSelected, 'mousedown');
};

function downloadFiles() {
    downloadJSON();
    downloadHTMLChart();
}

function cleanMemory() {
    jsonData = undefined;
    jsonData = {};
    for (var i = 0; i < [...chart.data].length; i++) {
        [...chart.data][i].dataPoints = [];
    }
}

function stop() {
    downloadFiles();
    console.log("Stopped: ", dateString);
    clearInterval(intervalId);
    isContinue = false;
};

(async function start() {
    dateNow = new Date();
    dateString = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    dateGetTime = dateNow.getTime();

    if (peopleList.length > 1) {
        selectedPerson = peopleList[counter % peopleList.length];
        changePerson();
        await sleep(700);
        counter++;
    }
    else {
        selectedPerson = peopleList[0];
    }

    jsonData[selectedPerson] ? null : jsonData[selectedPerson] = {};

    if ([...chart.data].filter(p => p.name == selectedPerson).length <= 0) {
        chart.data.push({
            type: "stepLine",
            xValueType: "dateTime",
            xValueFormatString: "HH:mm:ss",
            highlightEnabled: true,
            connectNullData: true,
            showInLegend: true,
            markerType: "none",
            name: selectedPerson,
            color: colorList[counter % peopleList.length],
            dataPoints: [
            ]
        });
    }

    await checkOnline();
    await sleep(500);
    sendFirstMessage();

    if (dateNow.getTime() - maxRunningTime.getTime() > 0 || !isContinue) {
        stop();
    }
    else {
        setTimeout(start, 500);
    }
})();

var index = 0
var intervalId = setInterval(function () {
    downloadFiles();
    // if (index == 30) {
    //     cleanMemory();
    //     index = 0;
    // }
    console.log("index",index);
    index++;
}, 1000 * 60 * 20);

console.log("intervalId", intervalId);

function toogleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    chart.render();
}
