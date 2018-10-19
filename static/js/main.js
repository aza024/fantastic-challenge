let 
    failures = [],
    successes = []

$.ajax({
    method: 'GET',
    url:'/stats',
    success: (j_res) => {
        res = JSON.parse(j_res)
        for(let i = 0; i < res.length; i++){
            statusCode = (res[i].status_code)
            timestamp = (res[i].timestamp)
            if (statusCode == '500'){
                failures.push(timestamp)
            } else {
                successes.push(timestamp)
            }
        }
        createChart()
        createTable(successes, failures)
    },
    error: (res) => {
        console.log('Error:' + JSON.stringify(res))
    }
})

createTable = (successes, failures) => {
    for (var i = 0; i < successes.length; i++) {
        let 
            newRow = document.createElement('tr'),
            succTime = successes[i],
            failTime = failures[i],
            succTblDt = document.createElement('td'),
            failTblDt = document.createElement('td')


        succTblDt.innerHTML = '' + succTime
        failTblDt.innerHTML = '' + failTime

        newRow.appendChild(succTblDt)
        newRow.appendChild(failTblDt)

        document.getElementById("table")
        .appendChild(newRow)
    }
};

createChart = () => {
    // chart data
    console.log(successes.length)
    console.log(failures.length)
    var ctx = document.getElementById("chart").getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Success(200)", "Failure(500)"],
            datasets: [{
                label: 'Fantastic Health Monitor',
                data: [successes.length,failures.length],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};
