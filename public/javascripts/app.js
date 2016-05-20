'use strict';

/**
 * Reusable and customisable AJAX function
 *
 * @param { String } method  - The HTTP method
 * @param { String } request - The request URI address
 * @param { Object } data - The data to be sent to the server
 * @param { Function } callback - The callback function
 * @param { Boolean } formHeader - If the request is to be www-form-urlencoded (true) or JSON encoded (false)
 */
function xmlHttpRequest (method, request, data, callback, formHeader) {
    (function () {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    callback(xmlHttp.responseText);
                }
            }
        };

        xmlHttp.open(method, request, true);
        if (formHeader === true) {
            // PHP is terrible at dealing with JSON :(
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        } else {
            xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        }

        if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
            xmlHttp.send(data);
        } else {
            xmlHttp.send();
        }
    })();
}

/**
 * API for collecting the required info about each football team
 *
 * @param { String } request - The request URI address
 * @param { Function } callback - The callback function
 */
function footballApi (request, callback) {
    (function () {
        var xmlHttp = new XMLHttpRequest(),
            response;

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    response = xmlHttp.responseText;
                    response = JSON.parse(response);
                    //response = JSON.stringify(response);
                    callback(response);
                }
            }
        };

        xmlHttp.open('GET', request, true);
        xmlHttp.setRequestHeader('X-Auth-Token', '7d9053ce70c443a597776ab040f6e389');
        xmlHttp.send();
    })();
}

/**
 * Factory function for the regions, cities and teams data
 *
 * @param: { Function } callback - The callback function
 */
var server = (function () {
    var regions,
        cities,
        teams;

    function getData (request, callback) {
        xmlHttpRequest('GET', './server/' + request + '.php', null, function (response) {
            var parsedData = JSON.parse(response);

            switch (request) {
                case 'regions':
                    regions = parsedData.regions;
                    break;

                case 'cities':
                    cities = parsedData.cities;
                    break;

                case 'teams':
                    teams = parsedData.teams;
                    break;

                default:
                    throw new Error('Incorrect request name');
                    break;
            }

            callback();
        }, false);
    }

    return {
        regions: function (callback) {
            if (typeof regions === 'undefined') {
                getData('regions', function () {
                    callback(regions);
                });
            } else {
                callback(regions);
            }
        },
        cities: function (callback) {
            if (typeof cities === 'undefined') {
                getData('cities', function () {
                    callback(cities);
                });
            } else {
                callback(cities);
            }
        },
        teams: function (callback) {
            if (typeof teams === 'undefined') {
                getData('teams', function () {
                    callback(teams);
                });
            } else {
                callback(teams);
            }
        }
    }
})();

/**
 * Populates the teams, cities and regions lists
 *
 * @param { String } parentPage - The page where item was selected
 * @param { String } target - The target element for element and data rendering
 * @param { Array } namesArr - The array of titles
 * @param { Array } imagesArr - The array of images
 */
function renderArray (parentPage, target, namesArr, imagesArr) {
    (function () {
        for (var i = 0; i < namesArr.length; i++) {
            var column = document.createElement('div'),
                img    = document.createElement('img'),
                link   = document.createElement('a');

            column.setAttribute('class', 'three columns each');
            img.setAttribute('src', './server/images/' + imagesArr[i]);
            link.setAttribute('href', '#/' + parentPage + '/' + namesArr[i].replace(/[\. ,:-]+/g, '-'));
            link.innerText = namesArr[i];
            target.appendChild(column).appendChild(link).appendChild(img);
        }
    })();
}

/**
 * Populate DOM with data of teams
 *
 * @param { Object } data - team specific data set
 * @param { Function } callback - The callback function
 */
function renderTeam (data, callback) {
    (function () {
        var target            = document.getElementById('a-teams-list'),
            main_image        = document.getElementById('main-image'),
            other_team_images = document.getElementById('other-team-images'),
            team_details      = document.getElementById('team-details'),
            team_name         = document.getElementById('team-name'),
            stadium_name      = document.getElementById('stadium-name'),
            team_location     = document.getElementById('team-location'),
            location_details  = document.getElementById('location-details'),
            images            = [],
            image,
            i;

        // Add team badge
        if (data.badge) {
            images.push(data.badge);
        }

        // Build array of all acc. images
        for (i = 0; i < data.images.length; i++) {
            images.push(data.images[i].url);
        }

        // Build html elements
        for (i = 0; i < images.length; i++) {
            image = document.createElement('img');

            if (i === 1) {
                image.setAttribute('src', './server/images/' + images[1]);
                main_image.appendChild(image);
            } else {
                image.setAttribute('src', './server/images/' + images[i]);
                other_team_images.appendChild(image);
            }
        }

        // Set details
        team_name.textContent = data.team_name;
        stadium_name.textContent = 'Stadium: ' + data.stadium;

        callback();
    })();
}

/**
 * Populate DOM with data of a specific city
 *
 * @param { Object } data - city specific data set
 * @param { Function } callback - The callback function
 */
function renderCity (data, callback) {
    (function () {
        var target            = document.getElementById('a-cities-list'),
            main_image        = document.getElementById('main-image'),
            other_city_images = document.getElementById('other-city-images'),
            city_images       = document.getElementById('city-images'),
            city_name         = document.getElementById('city-name'),
            images            = [],
            image,
            city_teams_list,
            city_teams_team,
            i;

        // Build array of images
        for (i = 0; i < data.images.length; i++) {
            images.push(data.images[i].url);
        }

        // Build html elements
        for (i = 0; i < images.length; i++) {
            image = document.createElement('img');

            if (i === 1) {
                image.setAttribute('src', './server/images/' + images[1]);
                main_image.appendChild(image);
            } else {
                image.setAttribute('src', './server/images/' + images[i]);
                other_city_images.appendChild(image);
            }
        }

        // Set details
        city_name.textContent = data.city_name;

        callback();
    })();
}

/**
 * Populate DOM with data of specific region
 *
 * @param { Object } data - region specific data set
 * @param { Function } callback - The callback function
 */
function renderRegion (data, callback) {
    (function () {
        var target              = document.getElementById('a-region-list'),
            main_image          = document.getElementById('main-image'),
            other_region_images = document.getElementById('other-region-images'),
            region_name         = document.getElementById('region-name'),
            region_images       = document.getElementById('region-images'),
            images              = [],
            image,
            region_teams_list,
            region_teams_team,
            i;

        // Build array of images
        for (i = 0; i < data.images.length; i++) {
            images.push(data.images[i].url);
        }

        // Build html elements
        for (i = 0; i < images.length; i++) {
            image = document.createElement('img');

            if (i === 1) {
                image.setAttribute('src', './server/images/' + images[1]);
                main_image.appendChild(image);
            } else {
                image.setAttribute('src', './server/images/' + images[i]);
                other_region_images.appendChild(image);
            }
        }

        region_name.textContent = data.region_name;

        callback();
    })();
}

/**
 * Sets the active element of the menu per page
 *
 * @param { Number } target - Selected menu item id
 */
function menuController (target) {
    (function () {
        var menu = document.getElementById('main-menu').getElementsByTagName('li');

        switch (target) {
            case 0:
                clearMenu();
                menu[0].className = 'menu-active';

                break;
            case 1:
                clearMenu();
                menu[1].className = 'menu-active';

                break;

            case 2:
                clearMenu();
                menu[2].className = 'menu-active';

                break;

            case 3:
                clearMenu();
                menu[3].className = 'menu-active';

                break;
            default:
                console.log('No menu item');

                break;
        }

        function clearMenu () {
            for (var i = 0; i < menu.length; i++) {
                menu[i].className = '';
            }
        }
    })();
}

/**
 * Search controller
 *
 * @param null
 */
(function () {
    var search_container     = document.getElementById('search'),
        body_fade            = document.getElementById('body-fade'),
        search_form          = document.getElementById('search-form'),
        search_input         = document.getElementById('search-input'),
        search_open          = document.getElementById('search-open'),
        search_close         = document.getElementById('search-close'),
        search_submit        = document.getElementById('search-submit'),
        search_buttons_group = document.getElementById('search-buttons-group'),
        page                 = 'team',
        selection;

    search_open.onclick = function () {
        body_fade.classList.remove('closed');
        body_fade.classList.add('open');

        search_container.classList.remove('menu-fade-out');
        search_container.classList.add('menu-fade-in');

        search_container.classList.remove('closed');
        search_container.classList.add('open');
    };

    search_close.onclick = function () {
        body_fade.classList.remove('open');
        body_fade.classList.add('closed');

        search_container.classList.remove('menu-fade-in');
        search_container.classList.add('menu-fade-out');

        search_container.classList.remove('open');
        setTimeout(function () {
            search_container.classList.add('closed');
        }, 300);
    };

    // For the buttons
    search_buttons_group.addEventListener('click', function (event) {
        selection = event.target.textContent.toLowerCase();

        if (selection === 'city' || selection === 'team' || selection === 'region') {
            page = selection;

            // Clear colours
            for (var i = 0; i < 3; i++) {
                search_buttons_group.getElementsByTagName('button')[i].setAttribute('style', 'background: white; color: #333333');
            }

            // Set clicked button colours
            event.target.setAttribute('style', 'background: #03A9F4; color: white');
        }
    }, false);

    search_form.addEventListener('submit', function (event) {
        event.preventDefault();
        searchSubmit(search_input.value);
    }, false);

    search_submit.addEventListener('click', function (event) {
        event.preventDefault();
        searchSubmit(search_input.value);
    }, false);

    function searchSubmit (search_term) {
        search(page, search_term);
    }
})();

/**
 * Search method
 *
 * @param { String } page - The page of search
 * @param { String } searchTerm - The value to be used to search the server
 */
function search (page, searchTerm) {
    (function () {
        var response_data,
            data = 'group=' + page + '&term=' + searchTerm;

        console.log(searchTerm);
        console.log(page);

        xmlHttpRequest('POST', './server/search.php', data, function (response) {
            //response_data = JSON.parse(response);
            response_data = response;
            console.log(response_data);
        }, true);
    })();
}

/**
 * Check if value is null or empty
 *
 * @param { String } value - The value to be checked
 */
function isNullOrWhitespace (value) {
    (function () {
        return !(!value || !value.trim());
    })();
}