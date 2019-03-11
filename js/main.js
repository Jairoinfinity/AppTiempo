$(document).ready(function(){
    
    $("button").click(function(){
        var datos = {
            q: $("input").val(),
            APPID: "16ad80008b670f86ac1dfa76771115dc"
        }
        console.log(datos.APPID)
        $.getJSON("https://api.openweathermap.org/data/2.5/weather", datos, function(res){
            var temp = parseFloat(res.main.temp) - 273.15;
            var empMa = parseFloat(res.main.temp_max) - 273.15;
            var empMi = parseFloat(res.main.temp_min) - 273.15;
            
            $("h2").text("Estas en "+datos.q+" y hace una temperatura de "+temp.toFixed(2)+"ºC");
            
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
            
            function drawChart() {
                var container = document.getElementById('timeline');
                var chart = new google.visualization.BarChart(container);
                var dataTable = new google.visualization.DataTable();
        
                dataTable.addColumn({ type: 'string', id: 'temperaturas' });
                dataTable.addColumn({ type: 'number', id: 'temp' });
               
                dataTable.addRows([
                  [ 'Temp Maxima', empMa ],
                  [ 'Temp Actual', temp ],
                  [ 'Temp Minima', empMi ]
                ]);
        
                chart.draw(dataTable);
            }
        });
    });    
});