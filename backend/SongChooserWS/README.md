# Smart Child Care API
	Please refer to the API documentation. 

### Pagination
	Several CRUD routes allow you to paginate data to ease contraint on the server and client. While optional now, it may 
	be set to default in the future. Refer to CRUD API section.

### Transactions
	As of May the server supports transactions. Refer to the Transaction section in the API.

### User Authentication
	As of the April Update User authentication is now enforced across the entire web service and integrated with ORM.
	Authentication is enforced via JWT. You must have a valid user account then you will be able to login and get a session 
	unique JWT.

### Getting a Token
	You must POST /Login with a JSON body of username and password. A JSON object will be retured with a key "success"
	which will indicate sucess if it is 1 or failure if 0. If the login has failed there will also be another key "err"
	which will give a user friendly error. If successful success will be 1 and there will be a token key with a value
	of the token assigned to you.

### Send Requests with the Token
	Any requests to the web service will result in a Not Authorised error. For any requests that you do send you have to
	send authorization header with "Bearer" and a space preceding the token. E.G.
	`Authorization: Bearer <Token>`
	Where Token is your token.

### Permission requests
	If you don't have permission for a resource the Web service will throw an error and let you know.

### Serve The Angular Web App
	The Web service is already is configured to serve the web app's index file from the folder 'SmartChildCare'. 
	One to go about this instead of having to copy the app's files every time is to system link it to the correct folder.

### Patching KnexJS for MSSQL 4.00 
	Knex has updated their library however they have not made a release with the hotfix. 
		- Apply the changes from this commit to your local library. https://github.com/tgriesser/knex/commit/17bf763cb13543f502668d2f74ae0ca1b2d67a28
	Read this issue for more details: https://github.com/tgriesser/knex/issues/1999


	

Last Updated: 23/06/17