# Smart Child Care API

Currently the following data can be retrieved

*   Booking Detail
*   Booking
*   Centre
*   Centre Roll
*   Children
*   Company
*   Family Contact
*   Roll
*   Staff Attendance
*   Staff
*   Tag

These API's are all accesibile with the standard request operation:

*   Create : HTTP POST, pass a body with a record of data to add. Returns a JSON object indicating success or failure
*   Edit : HTTP PUT, pass a body with the record of data including the id to change. Returns a JSON object indicating success or failure
*   getAll : HTTP GET, no Parameters. Returns an array of JSON which has each record
*   getById : HTTP GET, Paramter: "id" with a value of the id you want. Returns JSON which has record
*   getLastId: HTTP GET, no Parameters. Returns JSON: {"id":"3"}
*   Delete : HTTP POST, pass a body with: "id" with a value of the id you want. Returns a JSON object indicating success or failure

How to get some data from the API:

The Syntax is: Domain:port/dataToAccess/requestOperation

When there is a space in the dataToAccess, convert it to camel case. e.g Centre Roll becomes /CentreRoll/

E.g Centre

`GET http://localhost:1337/Centre/getAll`

Where: dataToAccess = Centre, requestOperation = getAll

Last Updated: 24/01/16