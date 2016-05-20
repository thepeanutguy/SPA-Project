(function () {
    'use strict';

    var team = hasher.getHash().split('/')[1], // E.g. Futbol-Club-Barcelona
        teamData = [],
        resposeData;

    // Server data
    xmlHttpRequest('GET', './server/teams.php', null, function (res) {
        resposeData = JSON.parse(res);
        team = team.replace(/-/g, ' ');

        // Get specific team details only
        for (var i = 0; i < resposeData.teams.length; i++) {
            if (resposeData.teams[i].team_name === team) {
                teamData = resposeData.teams[i];
            }
        }

        if (typeof teamData === 'undefined') {
            console.log('Error; undefined');
        } else {
            renderTeam(teamData, function () {
                // Image selector controller
                var main_image = document.getElementById('main-image').getElementsByTagName('img')[0],
                    small_images = document.getElementById('other-team-images').getElementsByTagName('img');
                
                for (var i = 0; i < small_images.length; i++) {
                    small_images[i].addEventListener('click', function (event) {
                        console.log('Clicked');
                        console.log(event);
                        
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
        
        // Football data api 
        footballApi('http://api.football-data.org/v1/soccerseasons/399/teams/', function (response) {
            console.log(response.teams[11]._links.players.href);
            
            footballApi(response.teams[11]._links.players.href, function (response_2) {
                console.log(response_2);
            });
            
            footballApi(response.teams[11]._links.fixtures.href, function (response_3) {
                console.log(response_3);
            });
        });

        // Map
        var map = L.map('mapId').setView(teamData.location, 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(teamData.location).addTo(map)
            .bindPopup('Club Stadium')
            .openPopup();
    });

})();