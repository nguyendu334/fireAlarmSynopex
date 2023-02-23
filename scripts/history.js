setInterval(() => {
    timer();
    read1();
}, 100);

const read1 = async () => {
    try {
        const response = await axios.get('./firealarm.json');
        history(response.data);
    } catch {}
};

const timer = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var day = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    document.getElementById('myTime').innerHTML = h + ':' + m + ':' + s + '      ' + day + '/' + month + '/' + year;
};

const history = (data) => {
    var dataTable = data.Historians.historians;
    var table = document.getElementById('table');
    var table1 = document.getElementById('tableHeder');
    table1.innerHTML =
        '<tr style="vertical-align:top;">' +
        '<td style="width:0px;height:30px;"></td>' +
        '<td style="width:80px;text-align:center;vertical-align:middle;"><b>DATE</b></td>' +
        '<td style="width:150px;text-align:center;vertical-align:middle;"><b>TIME</b></td>' +
        '<td style="width:455px;vertical-align:middle;padding-left: 120px"><b>ALARM</b></td>' +
        '</tr>';
    table.innerHTML = '';
    for (let i = 0; i < dataTable.length; i++) {
        table.innerHTML +=
            '<tr style="vertical-align:top; ">' +
            '<td style="width:0px;height:25px;"></td>' +
            '<td style="width:80px;text-align:center;vertical-align:middle;">' +
            dataTable[i].DATE +
            '</td>' +
            '<td style="width:150px;text-align:center;vertical-align:middle;">' +
            dataTable[i].TIME +
            '</td>' +
            '<td style="width:500px;vertical-align:middle; padding-left: 75px">' +
            dataTable[i].ALARM +
            '</td>' +
            '</tr>';
    }
};
