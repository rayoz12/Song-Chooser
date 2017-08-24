

### Pagination
	Several CRUD routes allow you to paginate data to ease contraint on the server and client. While optional now, it may 
	be set to default in the future. Refer to CRUD API section.

### Transactions
	As of May the server supports transactions. Refer to the Transaction section in the API

### Serve The Angular Web App
	The Web service is already is configured to serve the web app's index file from the folder 'SongChooser'. 
	One to go about this instead of having to copy the app's files every time is to system link it to the correct folder.

### Patching KnexJS for MSSQL 4.00 
	Knex has updated their library however they have not made a release with the hotfix. 
		- Apply the changes from this commit to your local library. https://github.com/tgriesser/knex/commit/17bf763cb13543f502668d2f74ae0ca1b2d67a28
	Read this issue for more details: https://github.com/tgriesser/knex/issues/1999


	

Last Updated: 22/08/17
