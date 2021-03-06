//create UI Button to upload a file that overrides all of the content stored in localStorage
//TODO: handle wrong files, project should crash on pdf file and throw error msg

(function () {
    'use strict';
    angular.module('psadmin').directive('uploadLocalStorage', function (FileSaver, Blob, StorageService, SyncService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<form name="form">' +
            '<md-button class="md-secondary md-raised" ngf-select ng-model="file" name="file">Datei auswählen</md-button>' +
            '<md-button class="md-secondary md-raised" type="submit" ng-click="submit()">Bestätigen</md-button>' +
            '</form>',
            controller: function ($scope) {
                $scope.submit = function () {
                    var filereader = new FileReader();
                    filereader.onload = function (event) {
                        StorageService.setItem("event", JSON.parse(event.target.result))
                            .then(SyncService.updateEventScope)
                            .then(function () {
                                console.log('upload successful');
                            }).catch(function (err) {
                            console.log('err: ' + err);
                        });
                    };
                    filereader.readAsText($scope.file);
                };
            }
        }
    });
})();
