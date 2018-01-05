/**
* Created by Ryan on 6/02/2017.
*/
'use strict';

import CRUDService from '../../Services/crud.service';
import SongService from '../../Services/song.service';
import $ from 'jquery';

const model = {
    song_name: null,
    path: null,
    tags: null,
};

const verse = {
	title: "",
	text: ""
};

SongUploadController.$inject = [CRUDService, SongService, '$scope'];
export default function SongUploadController(CRUDService, SongService, $scope) {
    const SongUploadController = this;

    const SongCRUDService = new CRUDService("Song");


	SongUploadController.uploadSong = function () {
		//returns array from some reason.
		let elem = $("#songUpload")[0];
		let file = elem.files[0];

		SongService.UploadSong(file).then(data => {
			if (data.success) {
				alert("Saved.")
			}
		}).catch(err => {
		    alert(err);
		    console.log(err);
		});
	};

	SongUploadController.cancel = function () {
        history.back();
    };
}