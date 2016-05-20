(function () {
    'use strict';

    var teamsList = [],
        badgeList = [];

    server.teams(function (response) {
        for (var i = 0; i < response.length; i++) {
            teamsList.push(response[i].team_name);
            badgeList.push(response[i].badge);
        }

        var target = document.getElementById('teams-list');

        renderArray('teams', target, teamsList, badgeList);
    });
})();
