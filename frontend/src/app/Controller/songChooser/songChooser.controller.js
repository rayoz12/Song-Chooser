/**
* Created by Ryan on 6/02/2017.
*/
'use strict';

import CRUDService from '../../Services/crud.service';
import BootstrapDialog from 'bootstrap3-dialog';
import $ from 'jquery';

const model = {
    song_name: null,
    path: null,
    tags: null,
};

const templateSongJoin = [{
    "tableLeft": "TemplateDetail",
    "tableRight": "Song",
    "fieldLeft": "song_id",
    "fieldRight": "id"
}];


SongChooserController.$inject = [CRUDService, '$scope', '$compile', '$routeParams'];
export default function SongChooserController(CRUDService, $scope, $compile, $routeParams) {
    const SongChooserController = this;

    const SongService = new CRUDService("Song");
    const TemplateService = new CRUDService("Template");
    const TemplateDetailService = new CRUDService("TemplateDetail");

    $scope.sortableConf = {
        animation: 350,
        chosenClass: 'sortable-chosen',
        handle: '.grab-handle',
        forceFallback: true,
    };

    const template_id = $routeParams.template; //preload if defined, otherwise undefined



    $scope.showSongPreview = false;
    let templateLoaded = false;
    let templateID = null;

    //result of searches are stored here
    $scope.songSearch = [];
    $scope.songTypes = [];
    $scope.songList = [];

    if (template_id !== undefined) {
        console.log("preloading");
        let songs = [];
        TemplateDetailService.InnerJoin(templateSongJoin, {template_id}).then(data => {
            data.sort((a,b) => a.order_index - b.order_index);
            $scope.songList = data;
        })
    }

    $scope.search = function (value, elem) {
        SongService.customEndpoint('/songSearch',{searchTerm: value}, 'get').then(data => {
            $scope.songSearch = data;
        });
    };

    $scope.loadTemplate = function () {
        BootstrapDialog.show({
            title: "Templates",
            message: function () {
                let template = require("./../../View/songChooser/songEdit.html");
                return $compile(template)($scope);
            },
            buttons: [{
                label: 'Save',
                // no title as it is optional
                cssClass: 'btn btn-primary',
                action: function(dialog){
                    saveSong($scope.editSong);
                    dialog.close();
                }
            }, {
                label: 'Cancel',
                action: function(dialog){
                    dialog.close();
                }
            }]
        });
    };

    $scope.editSong = function (song) {
        $scope.editingSong = song;
        BootstrapDialog.show({
            title: "Edit Song",
            message: function () {
                let template = require("./../../View/songChooser/songEdit.html");
                return $compile(template)($scope);
            },
            buttons: [{
                label: 'Save',
                // no title as it is optional
                cssClass: 'btn btn-primary',
                action: function(dialog){
                    saveSong($scope.editingSong);
                    dialog.close();
                }
            }, {
                label: 'Cancel',
                action: function(dialog){
                    dialog.close();
                }
            }]
        });
    };

    $scope.selectSong = function(song) {
        $scope.songList.push(song);
        $scope.songSearch.length = 0;
    };

    $scope.deleteSong = function(index) {
        $scope.songList.splice(index,1);
    };

    $scope.editSongLocalName = function (song) {
        console.log(song);
        const response = window.prompt("New song name", song.song_name);
        if (response !== null) {
            song.song_name = response;
        }
    };

    $scope.viewSong = function (song) {
        setSongPreview(song.path)
    };

    function setSongPreview(path) {
        const preview = document.getElementById("songPreview");
        preview.src = "http://localhost:1337" + path.slice(1);
        $scope.showSongPreview = true;
    }

    function saveSong(song) {
        SongService.Update(song);
    }


    //TODO add checking to determine if it's a template that already exists.
    SongChooserController.saveAsTemplate = function(){
        if (templateLoaded) {
            TemplateDetailService.DeleteWhere({template_id: templateID}).then(() => {
                TemplateDetailService.CreateBatch(generateTemplateDetails(templateID));
            });
        }
        else {
            const response = window.prompt("New song name", song.song_name);
            if (response !== null) {
                saveTemplate(name);
            }
        }

    };

    function saveTemplate(templateName) {
        TemplateService.Create({name: templateName}).then(data => {
            const id = data.data.inserted_id;
            return TemplateDetailService.CreateBatch(generateTemplateDetails(id));
        }).then(data => {
            console.log(data);
        })
    }

    function generateTemplateDetails(templateID) {
        let templateDetails = [];
        for (let i = 0; i < $scope.songList.length; i++) {
            const song = $scope.songList[i];
            templateDetails.push({
                template_id: templateID,
                song_id: song.id,
                order_index: i,
            })
        }
        return templateDetails;
    }


    SongChooserController.cancel = function () {
        history.back();
    };
}