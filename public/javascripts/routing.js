'use strict';

// |--------------------------------------------------
// | Page elements loading and control
// |--------------------------------------------------
function page(pagePath) {
    (function () {
        var application_root = document.getElementById('application-root'),
            script_root = document.getElementById('script-root'),
            HTML, JavaScript;

        // HTTP get assoc. HTML and JavaScript files
        xmlHttpRequest('GET', './pages/' + pagePath + '.html', null, function (res) {
            HTML = res;

            xmlHttpRequest('GET', './controllers/' + pagePath + '.js', null, function (res) {
                JavaScript = res;

                // Clear page
                while (application_root.lastChild || script_root.lastChild) try {
                    application_root.removeChild(application_root.lastChild);
                    script_root.removeChild(script_root.lastChild);
                } catch (ex) {
                    // DOM Exception 8
                }

                // Populate page
                application_root.innerHTML = HTML;
                eval(script_root.innerHTML = JavaScript);
            });
        });
    })();
}

// |--------------------------------------------------
// | Routing Map
// |--------------------------------------------------
(function () {
    crossroads.addRoute('/', function () {
        page('home');
        menuController(0);
    });

    crossroads.addRoute('/teams', function () {
        page('teams');
        menuController(1);
    });

    crossroads.addRoute('/teams/{catch}', function () {
        page('a-team');
        menuController(1);
    });

    crossroads.addRoute('/cities', function () {
        page('cities');
        menuController(2);
    });

    crossroads.addRoute('/cities/{catch}', function () {
        page('a-city');
        menuController(2);
    });

    crossroads.addRoute('/regions', function () {
        page('regions');
        menuController(3);
    });

    crossroads.addRoute('/regions/{catch}', function () {
        page('a-region');
        menuController(3);
    });
})();

// |--------------------------------------------------
// | Hashing
// |--------------------------------------------------
(function () {
    var default_hash = '',
        url = hasher.getBaseURL();

    if (hasher.getHash() === url) {
        hasher.setHash(default_hash);
    }

    function parseHash(newHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();
})();