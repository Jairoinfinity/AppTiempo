$(document).ready(function(){
    
    $("button").click(function(){
        var datos = {
            q: $("input").val(),
            APPID: "16ad80008b670f86ac1dfa76771115dc"
        }
        $.getJSON("https://api.openweathermap.org/data/2.5/weather", datos, function(res){
            console.log(res);
            var mymap = L.map('mapid').setView([res.coord.lat, res.coord.lon], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
            }).addTo(mymap);

            var marker = L.marker([res.coord.lat, res.coord.lon]).addTo(mymap);

            var map = new ol.Map({
                target: 'map',
                layers: [
                  new ol.layer.Tile({
                    source: new ol.source.OSM()
                  })
                ],
                view: new ol.View({
                  center: ol.proj.fromLonLat([res.coord.lon, res.coord.lat]),
                  zoom: 13
                })
              });
        }); 
    });    
});