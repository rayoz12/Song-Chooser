/**
* Created by Ryan on 6/02/2017.
*/
'use strict';

import CRUDService from '../../Services/crud.service';
import SettingsService from '../../Services/settings.service';
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

TemplateWizardController.$inject = [CRUDService, '$scope', '$compile', '$routeParams', SettingsService, 'Notification'];
export default function TemplateWizardController(CRUDService, $scope, $compile, $routeParams, SettingsService, Notification) {
    const TemplateWizardController = this;

	const SongService = new CRUDService("Song");
	const TemplateService = new CRUDService("Template");
	const TemplateDetailService = new CRUDService("TemplateDetail");
	
	//i could hard code each song but then we would hard repeated code in the template html.
	$scope.songSearchResults = {
		entranceSong: [],
		giftsSong: [],
		com1Song: [],
		com2Song: [],
		recessionalSong: []
	}

	$scope.songTypeEnum = {
		entrance: 'entranceSong',
		gifts: 'giftsSong',
		com1: 'com1Song',
		com2: 'com2Song',
		recessional: 'recessionalSong'
	}

	$scope.selectedSongs = {};

	$scope.massSettings = [
		{name: "St Francis", settings: [
			"Glory To God - St Francis",
			"Response Palm",
			"Alleluia our God is Speaking",
			"Apostles Creed",
			"Holy Holy Holy - St Francis",
			"Memorial Acclamation Joy and Peace",
			"Amen St Francis.htm",
			"Lamb of God",
			"BlankScreen.htm"
		]},
		{name: "Sacred Heart", settings: [
			"Glory To God - Sacred Heart",
			"Response Palm",
			"Gospel Acclamation - Sacred Heart",
			"Apostles Creed",
			"Holy Holy Holy - Sacred Heart",
			"Memorial Acclamation Sacred Heart",
			"Amen Sacred Heart",
			"Lamb of God",
			"BlankScreen.htm"
		]},
		{name: "Joy and Peace", settings: [
			"Glory To God - Joy And Peace",
			"Response Palm",
			"Gospel Acclamation - Joy and Peace",
			"Apostles Creed",
			"Holy Holy Holy - Joy and Peace",
			"Memorial Acclamation Joy and Peace",
			"Amen Joy and Peace.htm",
			"Lamb of God",
			"BlankScreen.htm"
		]},
		{name: "Christ The Saviour", settings: [
			"Glory To God - Christ the Saviour",
			"Response Palm",
			"Gospel Acclamation - Christ the Saviour",
			"Apostles Creed",
			"Holy Holy Holy - Christ the Saviour",
			"Memorial Acclamation Christ the Saviour",
			"Amen Christ the Saviour",
			"Lamb of God",
			"BlankScreen.htm"
		]}
	];

	$scope.search = function (value, elem) {
        SongService.customEndpoint('/songSearch',{searchTerm: value}, 'get').then((data) => {
			console.log(elem.id);
			$scope.songSearchResults[elem.id] = data;
        });
    };

	$scope.selectSong = (song, type) => {
		console.log(song);
		$scope.selectedSongs[type] = song;
		$scope.songSearchResults[type] = [];
		$scope[type] = song.song_name;
	}

	TemplateWizardController.output = function () {
		if ($scope.templateName == "" || $scope.templateName === undefined) {
			alert("Please enter a template name");
			return;
		}

		Notification({message: 'Saving...'});

		console.log($scope.massSetting);
		const setting = $scope.massSetting;
		const songList = [];
		SongService.Where({song_name: {$or: setting.settings}}).then(data => {
			console.log(data);
			
			//construct mass setting stuff
			songList[1] = data.find(item => item.song_name == setting.settings[0]); //gloria
			songList[2] = data.find(item => item.song_name == setting.settings[1]); //response
			songList[3] = data.find(item => item.song_name == setting.settings[2]); //gospel
			songList[4] = data.find(item => item.song_name == setting.settings[3]); //apostles creed
			songList[6] = data.find(item => item.song_name == setting.settings[4]); //holy
			songList[7] = data.find(item => item.song_name == setting.settings[5]); //memorial
			songList[8] = data.find(item => item.song_name == setting.settings[6]); //amen
			songList[9] = data.find(item => item.song_name == setting.settings[7]); //Lamb of god
			songList[13] = data.find(item => item.song_name == setting.settings[8]); //blank
			console.log(songList);

			songList[0] = $scope.selectedSongs[$scope.songTypeEnum.entrance];
			songList[5] = $scope.selectedSongs[$scope.songTypeEnum.gifts];
			songList[10] = $scope.selectedSongs[$scope.songTypeEnum.com1];
			songList[11] = $scope.selectedSongs[$scope.songTypeEnum.com2];
			songList[12] = $scope.selectedSongs[$scope.songTypeEnum.recessional];

			if (songList.includes(undefined))
				console.log("failed making template");
			else
				console.log("worked");

			console.log(songList);

			return TemplateService.Create({name: $scope.templateName});
		}).then(data => {
			const id = data.data.inserted_id;
			for (let i = 0; i < songList.length; i++) {
				const item = songList[i];
				item.order_index = i;
				item.template_id = id;

				item.song_id = item.id;

				switch (i) {
					case 0: 
						item.template_song_name = "Entrance Hymn - " + item.song_name;
						break;
					case 5:
						item.template_song_name = "Preparation of Gifts - " + item.song_name;
						break;
					case 10:
						item.template_song_name = "Communion 1 - " + item.song_name;
						break;
					case 11:
						item.template_song_name = "Communion 2 - " + item.song_name;
						break;
					case 12:
						item.template_song_name = "Sending Forth - " + item.song_name;
						break;
				}
				delete item.id;				
			}

			return TemplateDetailService.CreateBatch(songList);
		}).then(data => {
			if (data.success)
				Notification.success({message: "Saved"});
			else
				Notification.error({message: "Failed to Save"});
		}).catch(error => {
			Notification.error({message: "Failed to Save"});
			console.log(error);
		});
	};

	TemplateWizardController.makeTemplate = function () {
		/*structure is:
		0: Entrance,
		1: Gloria (mass setting dependent),
		2: Response Psalm
		3: Gospel Acclamation (mass setting dependent),
		4: Apostle Creed,
		5: Presentation of Gifts,
		6: Holy Holy Holy (mass setting dependent),
		7: Memorial Acclamation (mass setting dependent),
		8: Amen (mass setting dependent),
		9: Lamb of God,
		10; Communion 1,
		11: Communion 2,
		12: Recessional,
		13: Blank Page,
		*/
	};


    TemplateWizardController.cancel = function () {
        history.back();
    };
}