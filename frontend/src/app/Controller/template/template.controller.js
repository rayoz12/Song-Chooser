/**
* Created by Ryan on 6/02/2017.
*/
'use strict';

import CRUDService from '../../Services/crud.service';
import BootstrapDialog from 'bootstrap3-dialog';

const model = {
    song_name: null,
    path: null,
    tags: null,
};

TemplateListController.$inject = [CRUDService, '$scope', '$location'];
export default function TemplateListController(CRUDService, $scope, $location) {
    const TemplateListController = this;

    const TemplateService = new CRUDService("Template");

    $scope.sortableConf = {
        animation: 350,
        chosenClass: 'sortable-chosen',
        handle: '.grab-handle',
        forceFallback: true,
    };

    $scope.showSongPreview = false;

    $scope.templates = [];

    TemplateService.GetAll().then(data => {$scope.templates = data})

    TemplateListController.edit = function (id) {
        $location.url('/SongChooser/' + id)
    }
}