(function () {
    'use strict';

    var city = hasher.getHash().split('/')[1], // E.g. Barcelona
        drill_down = document.getElementById('drill-down'),
        cityData = [],
        resposeData;

    xmlHttpRequest('GET', './server/cities.php', null, function (res) {
        resposeData = JSON.parse(res);
        city = city.replace(/-/g, ' ');

        // Get specific city details only
        for (var i = 0; i < resposeData.cities.length; i++) {
            if (resposeData.cities[i].city_name === city) {
                cityData = resposeData.cities[i];
            }
        }

        if (typeof cityData === 'undefined') {
            console.log('Error; undefined');
        } else {
            renderCity(cityData, function () {
                // Image selector controller
                var main_image = document.getElementById('main-image').getElementsByTagName('img')[0],
                    small_images = document.getElementById('other-city-images').getElementsByTagName('img');
                
                for (var i = 0; i < small_images.length; i++) {
                    small_images[i].addEventListener('click', function (event) {                        
                        try {
                            var main_image_src = main_image.getAttribute('src');
                            var small_image_src = this.getAttribute('src');
                            
                            // Replace main image with selected image
                            main_image.setAttribute('src', small_image_src);
                            
                            // Replace old image with the to-be-removed main image
                            this.setAttribute('src', main_image_src);
                        } catch (Exception) {
                            console.log('Error with event listener.');
                        }
                    }, false);
                }
            });
        }
        
        // Map
        var map = L.map('mapId').setView([cityData.lat, cityData.long], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([cityData.lat, cityData.long]).addTo(map)
            .bindPopup(cityData.city_name)
            .openPopup();

        // Drill-down menu
        server.cities(function (cities) {
            console.log(cities);

            server.teams(function (teams) {
                for (var i = 0; i < teams.length; i++) {
                    if (teams[i].city_id === cityData.city_id) {
                        var drill_down_item = document.createElement('li'),
                            drill_down_link = document.createElement('a');

                        drill_down.appendChild(drill_down_item).appendChild(drill_down_link).href = '#/teams/' + teams[i].team_name.replace(/[\. ,:-]+/g, '-');
                        drill_down_link.innerText = teams[i].team_name;
                    }
                }
            });
        });
    });

})();