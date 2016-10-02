mainApp.controller("songController", function ($scope) {
    $scope.songs = [
            {
                "id": 3,
                "title": "Songs of John",
                "audio": "https://dl.dropboxusercontent.com/s/w1lezxvjeqwbtkr/Creep.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists": [
                    "Artista 1"
                ],
                "categories": [
                    1,
                    2
                ]
            },
            {
                "id": 3,
                "title": "Songs of John",
                "audio": "https://dl.dropboxusercontent.com/s/wxmovmshfsiwk4c/04%20The%20Man%20Who%20Sold%20The%20World.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists":[
                    "Artista 2"
                ],
                "categories": [
                    1,
                    2
                ]
            },
            {
                "id": 3,
                "title": "Songs of John",
                "audio": "https://dl.dropboxusercontent.com/s/f3lrpvehp6a5fpb/05%20Falling.mp3",
                "playCount": 4,
                "downloadsCount": 4,
                "rating": 4,
                "numOfRatings": 4,
                "uploadDate": "2016-09-24",
                "album": "",
                "artists":[
                    "Artista 3"
                ],
                "categories": [
                    1,
                    2
                ]
            }
        ];
    });

mainApp.directive('myList', function() {
    return {
        template: '<ul class="hidden playlist-files"><li ng-repeat="song in songs" data-title="{{song.title}}" data-artist="{{song.artists[0]}}" data-mp3="{{song.audio}}"></li></ul>'
    };
});



