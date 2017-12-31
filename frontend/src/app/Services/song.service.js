'use strict';

import SettingsService from './settings.service';

export default angular
	.module('app.services.song', [])
	.factory('app.services.song', SongService).name;

//This gets all data controlled by authentication on login.
SongService.$inject = ['$http', SettingsService];
/**
 * @namespace SongService
 * @description Handles getting photos
 * @memberOf app.services
 * @param $http
 * @param {SettingsService} SettingsService
 */
function SongService($http, SettingsService) {
	const service = {};

	service.UploadSong = UploadSong;

	return service;
	/**
	 * Uploads a song
	 * @method
	 * @public
	 * @memberOf app.services.SongService#
	 * @param {File} song The song as a File
	 * @returns {string} the url of the photo
	 */
	function UploadSong(song) {
		return $http({
			method: 'POST',
			url: SettingsService.apiAccess + "Song/uploadSong",
			headers: {
				'Content-Type': undefined
			},
			data: {
				song: song
			},
			transformRequest: function (data, headersGetter) {
				const formData = new FormData();
				formData.append("song", song);
				return formData;
			}
		}).then(handleSuccess).catch(function (data, status) {
			alert("Failed to save song");
		});
	}

	function handleSuccess(res) {
		console.log(res.config.method, res.config.url, ": Response:", res.data);
		return res.data;
	}
}