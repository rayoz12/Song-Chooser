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

const verse = {
	title: "",
	text: ""
};

SongMakerController.$inject = [CRUDService, '$scope', '$compile', '$routeParams'];
export default function SongMakerController(CRUDService, $scope, $compile, $routeParams) {
    const SongMakerController = this;

    const SongService = new CRUDService("Song");

    $scope.title = "";
	$scope.verses = [{title: "", text: ""}];

	SongMakerController.output = function () {
		let tab = window.open();
		const postData = {title: $scope.title, lyrics: $scope.verses};
		SongService.customEndpoint("/generateSong", postData, 'post').then(data => {
			console.log("location:", data.path);
			tab.location = data.path;
		});
	};

	SongMakerController.addVerse = function () {
		$scope.verses.push({title: "", text: ""});
	};

	SongMakerController.importSong = function () {
		const songTitle = prompt("Give the full name of the song which is in the HTML_Files directory. This includes the .htm\n" +
			"For example: A New Commandment would be: A New Commandment.htm");
		if (songTitle === null)
			return;
		SongService.Create({song_name: songTitle, path: "./HTML_Files/" + songTitle}).then(() => {
			alert("saved");
		}).catch((err) => {
			alert("Failed: " + err);
		})
	};

    SongMakerController.cancel = function () {
        history.back();
    };
}