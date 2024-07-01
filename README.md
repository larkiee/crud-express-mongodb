# crud-express-mongodb

# setup
run docker compose up and app will start by default at port 5200 and mongo database expose at 27055 without password
a posman colection could be found at the root directory of project

# APIs

### GET /users
this api get full list of users and has features like filter, sort and pagination a payload example of endpoint is shown in blew
{
    "email": "",
    "phoneNumber": "",
    "firstName": "",
    "lastName": "",
    "sortByDate": true,
    "isAsc": false,
    "page": 1,
    "count": 10
}

the first four field used for filtering of data the two next used for sorting of data and final two is used for pagination.

*this is the only API that need admin privilege which required token could obtain by login with blew credentials*

{
    "email": "raya@gmail.com",
    "password": "Admin123#"
}

### POST /users
this API after validating payload create a user and return corresponding token and expiration time an example paiload for endpoint could find at below
{
	"email": "saeedd1990@gmail.com",
    "phoneNumber": "09107655152",
    "firstName": "saeed",
    "lastName": "eftekhari",
    "password": "Amir#1897"
}

### POST /users/login
this API use for obtaining jwt token by this payload
{
    "email": "raya@gmail.com",
    "password": "Admin123#"
}

*all resources are accessable for admin user*

### GET /users/:id
this API returns corresponding user if could found
*Authorization bearer token is required for accessing to this endpoint*

### PUT /users/:id
this API after validating of payload update correponding fields of user entity an example payload is shown in below
{
	"firstName": "Amir",
    "email": "amir555larki@gmail.com"
}
*Authorization bearer token is required for accessing to this endpoint*


### DELETE /users/:id
this API remove user entity entirely
*Authorization bearer token is required for accessing to this endpoint*