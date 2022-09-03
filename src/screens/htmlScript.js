const url = ``;
const html_script = [`

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
        <!--<link rel="stylesheet" href="./style.css">-->
        <title>OpenStreet Map API</title>
        <style>
            #map1
            {
                width: 150%;
                height: 880px;
                background-color: gray;
                margin-bottom: 30px;
                margin: 5px;
            }

            .card
            {
                display: flex;
                flex-direction: row;
            }

            .content
            {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
            }

            p, h2
            {
                margin: 0;
                
            }
        </style>
    </head>
    <body>

        <div class="card">
            <div id="map1"></div>
        </div>
    
    
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
        <!--<script src="./map.js"></script>-->
        <script>
            let mapOptions1 = {
                center: [3.8623706314432016, 11.499879956245424],
                zoom: 17
            }

            let map1 = new L.map('map1', mapOptions1);
            let layer1 = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

            map1.addLayer(layer1);
        </script>
    </body>
</html>


`,
`

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
        <!--<link rel="stylesheet" href="./style.css">-->
        <title>OpenStreet Map API</title>
        <style>
            #map
            {
                width: 150%;
                height: 880px;
                background-color: gray;
                margin-bottom: 30px;
                margin: 5px;
            }

            .card
            {
                display: flex;
                flex-direction: row;
            }

            .content
            {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
            }

            p, h2
            {
                margin: 0;
                
            }
        </style>
    </head>
    <body>

        <div class="card">
            <div id="map"></div>
        </div>
    
    
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
        <!--<script src="./map.js"></script>-->
        <script>

            let mapOptions = {
                center: [3.86237, 11.4998860],
                zoom: 20
            }

            let map = new L.map('map', mapOptions);
            let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

            map.addLayer(layer);

            let marker = new L.Marker(mapOptions.center);

            marker.addTo(map);

            function onMapClick(e) {
                    
                marker.remove(map);
                marker = new L.Marker(e.latlng);
                marker.addTo(map);

                window.ReactNativeWebView.postMessage(JSON.stringify(e.latlng));
                //window.ReactNativeWebView.postMessage(e.latlng.lng);
            }

            map.on('click', onMapClick);
        </script>
    </body>
</html>

`]

export default html_script;