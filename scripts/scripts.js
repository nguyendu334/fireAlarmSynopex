setInterval(() => {
    read();
}, 100);

var connect = document.getElementById('connect');
const read = async () => {
    try {
        const response = await axios.get('http://localhost:3000/db');
        connect.classList.add('green');
        connectAll(response.data);
        alarm(response.data);
    } catch {}
};

var connectAll = (data) => {
    let SPINKLER = document.getElementById('SPINKLER');
    let pumpPlc = document.getElementById('pumpPlc');
    let mqtt = document.getElementById('mqtt');
    let timedata = document.getElementById('timedata');

    if (data.PLCConnect.Spinkler_isconnected == true) {
        SPINKLER.classList.add('green');
    } else {
        SPINKLER.classList.remove('green');
    }

    if (data.PLCConnect.MQTT_isconnected == true) {
        mqtt.classList.add('green');
    } else {
        mqtt.classList.remove('green');
    }

    if (data.PLCConnect.PLC_isconnected == true) {
        pumpPlc.classList.add('green');
    } else {
        pumpPlc.classList.remove('green');
    }
    timedata.value = new Date();
    // timedata.value = data.Timespan;
};

const alarm = (data) => {
    var dataAlarm = data.dataZone.datazone;
    var soundAlarm = document.getElementById('myAudio');
    var loa = document.getElementById('loa');

    for (var i = 0; i < 30; i++) {
        if (dataAlarm[i] == 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`lamp ${i + 1}`).style.opacity = '0';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`lamp ${i + 1}`).style.animation = 'opacity 0.5s infinite linear';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`cab ${i + 1}`).style.animation = 'fill 0.5s infinite linear';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`zone ${i + 1}`).style.animation = 'fill 0.5s infinite linear';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`smoke${i + 1}`).style.opacity = '0.8';

            soundAlarm.play();
            loa.src = 'img/ALARM.png';
            loa.style.cursor = 'pointer';

            $('#loa').click(function () {
                loa.style.opacity = '0';
                soundAlarm.muted = true;
            });

            if (loa.style.opacity === '0') {
                $('#loa').click(function () {
                    loa.style.opacity = '1';
                    soundAlarm.muted = false;
                });
            }
        } 
        else if(dataAlarm[i] == 0) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`lamp ${i + 1}`).style.opacity = '1';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`lamp ${i + 1}`).style.animation = 'none';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`cab ${i + 1}`).style.animation = 'none';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`zone ${i + 1}`).style.animation = 'none';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`smoke${i + 1}`).style.opacity = '0';
        }
    }
};