**Readings:**

- https://jwt.io/introduction/

### Setup DB

- Get [MongoDB FREE Hosting](https://account.mongodb.com/account/login) here.
- Rename .env.example to .env
- Put your db connection string to DB_CONNECT in .env file
- Edit/View the PORT in .env file, use it in `docker run -p` command

### Run Dockerfile only

**Build the image**  
`docker build -t my-node-express-jwt-auth .`  
**Run & create container** (e.g., in .env file, PORT = 8080)  
`docker run -itd -p 8080:8080 -v $(pwd):/app --name my-container my-node-express-jwt-auth`  
or this to make ie undetached:  
`docker run -it -p 8080:8080 -v $(pwd):/app --name my-container my-node-express-jwt-auth`  
**Stop the container**  
`docker stop my-container`  
**Start the container**  
`docker start my-container`  
**Remote the container**  
`docker rm my-container`

p/s: `my-node-express-jwt-auth` & `my-container` is the name I use, you can change according your needs.

Packages:

- express // nodejs web framework
- dotenv // read environtment variable
- mongoose // handles mongodb database
- @hapi/joi // validator
- bcryptjs // encrypt password
- jsonwebtoken // handles JWT

### Start Development

- install dependencies: `yarn`
- Start nodemon: `yarn start:dev`
- Url: [localhost:8080](localhost:8080)

#### Register a user

`POST localhost:8080/api/user/register`
Content-Type: application/json

request.body:

```
{
  "name" : "Ashraf Handsome",
  "email" : "ashrafcool@cmail.com",
  "password" : "super_strong_secret_password",
  "repeat_password": "super_strong_secret_password"
}

```

#### Login

`POST localhost:8080/api/user/login`
Content-Type: application/json

request.body:

```
{
    "email": "ashrafcool@cmail.com",
    "password": "super_strong_secret_password"
}
```

Return Header `auth-token JWT_TOKEN` with payload (user id)
