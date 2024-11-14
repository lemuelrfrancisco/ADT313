# ADT313

# Deadline of submission: Dec. 7, 2024

### Students who doesn't have hands-on 1 to 5 are required to submit for completion only.

## Midterms coverage (checking is on finals)

    ### 1. Login Page
    ### 2. Register Page
    ### 3. Create Movie with search to TMDB
    ### 4. Update Movie with field validation
    ### 5. Exam last Nov. 9

## Semi-finals & Finals coverage

    ## Students have their own design and not allowed to use any Styling library and framework.
    ## Students must demonstrate the usage of React Hooks.

    ### 1. Admin Dashboard with design
        Login, Register, Movie, Artist, photos and videos (artist, photos, videos should be linked to movie)
        #### [User (access token and information) and movies should be stored using useContext.]
     	    #### Search Movies using TMDB API
        #### Search Videos, Photos and Credits using TMDB API under Admin - Movie page
    ### 2. Client Site with design
        #### [User (access token and information) and movies should be stored using useContext.]

# Database Diagram

![image3](https://raw.githubusercontent.com/lemuelrfrancisco/ADT313/main/diagram.png)

#### TMDB Search movie

##### https://developer.themoviedb.org/reference/search-movie

#### TMDB Search image

##### https://developer.themoviedb.org/reference/movie-images

#### TMDB Search videos

##### https://developer.themoviedb.org/reference/movie-videos

#### TMDB Search artist/Credits

##### https://developer.themoviedb.org/reference/movie-credits

# Hands-on activity

    1. using react hooks, get the latest value of form fields
    and pass it as payload to api.
    2. Create the update function of movie
        -use method:PATCH url: /movies/{id}
    3. implement pagination in search movie using the
       `total_pages` from tmdb api response
    4. add error handler for search, save, delete
    5. redirect to `/main/movies` after saving the movie

# API Endpoints

[image]

## Users

| Method | URL                                      | Payload                                                                                                                                                                 | Header |
| ------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| POST   | localhost/movieproject-api/user/register | { <br> "email":"test@mail.com", <br> "password":"password",<br> "firstName":"string",<br> "middleName":"string",<br> "lastName":"string",<br> "contactNo":"string"<br>} | N/A    |
| POST   | localhost/movieproject-api/user/login    | {<br> "email": "test@mail.com",<br> "password": "password"<br>}                                                                                                         | N/A    |

### User - Movies

| Method | URL                                 | Payload | Header |           |
| ------ | ----------------------------------- | ------- | ------ | --------- |
| GET    | localhost/movieproject-api/movies   | N/A     | N/A    | Get all   |
| GET    | localhost/movieproject-api/movies/2 | N/A     | N/A    | Get by id |

### User - Casts

| Method | URL                                | Payload | Header |
| ------ | ---------------------------------- | ------- | ------ |
| GET    | localhost/movieproject-api/casts/1 | N/A     | N/A    |

### Users - Photos

| Method | URL                                 | Payload | Header |
| ------ | ----------------------------------- | ------- | ------ |
| GET    | localhost/movieproject-api/photos/1 | N/A     | N/A    |

### Users - Videos

| Method | URL                                 | Payload | Header |
| ------ | ----------------------------------- | ------- | ------ |
| GET    | localhost/movieproject-api/videos/1 | N/A     | N/A    |

---

## Admin

| Method | URL                                       | Payload                                                                                                                                                                 | Header |
| ------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| POST   | localhost/movieproject-api/admin/register | { <br> "email":"test@mail.com", <br> "password":"password",<br> "firstName":"string",<br> "middleName":"string",<br> "lastName":"string",<br> "contactNo":"string"<br>} | N/A    |
| POST   | localhost/movieproject-api/admin/login    | {<br> "email": "test@mail.com",<br> "password": "password"<br>}                                                                                                         | N/A    |

### User - Movies

| Method | URL                                       | Payload                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Header        |                              |
| ------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------- |
| GET    | localhost/movieproject-api/admin/movies   | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | N/A           | Get all                      |
| GET    | localhost/movieproject-api/admin/movies/2 | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | N/A           | Get by id                    |
| POST   | localhost/movieproject-api/movies         | {<br> "tmdbId": 125,<br> "title": "Jollibee",<br> "overview": "Wrong item.",<br> "popularity": 1,<br> "releaseDate":"2003-05-23",<br> "voteAverage": 5,<br> "backdropPath": "https://image.tmdb.org/t/p/original/gdGIwCH9OS2w2USTKUlcTppXfXz.jpg",<br> "posterPath": "https://image.tmdb.org/t/p/original/3XJKBKh9Km89EoUEitVTSnrlAkZ.jpg",<br> "isFeatured": 0<br>}                                                                                                                                                                                                                                                                                                                                  | Authorization | Create using JSON as payload |
| PATCH  | localhost/movieproject-api/movies/0       | {<br> "tmdbId": 310,<br> "title": "Bruce Almighty",<br> "overview": "Bruce Nolan toils as a \"human interest\" television reporter in Buffalo, NY, but despite his high ratings and the love of his beautiful girlfriend, Bruce remains unfulfilled. At the end of the worst day in his life, he angrily ridicules God - and the Almighty responds, endowing Bruce with all of His divine powers.",<br> "popularity": 57.52,<br> "releaseDate":"2003-05-23",<br> "voteAverage": 6.715,<br> "backdropPath": "https://image.tmdb.org/t/p/original//gdGIwCH9OS2w2USTKUlcTppXfXz.jpg",<br> "posterPath": "https://image.tmdb.org/t/p/original//3XJKBKh9Km89EoUEitVTSnrlAkZ.jpg",<br> "isFeatured": 1<br>} | Authorization | Update using PATCH           |
| POST   | localhost/movieproject-api/movies/1       | ![image1](https://raw.githubusercontent.com/lemuelrfrancisco/ADT313/main/image1.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Authorization | Update using Form (POST)     |
| DELETE | localhost/movieproject-api/admin/movies/1 | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Authorization | Delete By ID                 |

### Admin - Casts

| Method     | URL                                      | Payload                                                                                                                                                                                                   | Header        |                         |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------- |
| GET        | localhost/movieproject-api/casts/1       | N/A                                                                                                                                                                                                       | Authorization | Get By ID               |
| POST       | localhost/movieproject-api/admin/casts   | ![image2](https://raw.githubusercontent.com/lemuelrfrancisco/ADT313/main/image2.png)                                                                                                                      | Authorization | Create using Form       |
| POST       | localhost/movieproject-api/admin/casts   | {<br> "userId": 1,<br> "movieId": 38,<br> "name": "Robert Downey Jr.",<br> "characterName": "Tony Stark / Iron Man",<br> "url":"https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"<br>} | Authorization | Create using JSON       |
| POST/PATCH | localhost/movieproject-api/admin/casts/1 | {<br> "movieId": 38,<br> "name": "Robert Downey Jr.",<br> "characterName": "Tony Stark / Iron Man",<br> "url":"https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"<br>}                  | Authorization | Update using POST/PATCH |
| DELETE     | localhost/movieproject-api/admin/casts/1 | N/A                                                                                                                                                                                                       | Authorization | Delete By ID            |

### Users - Photos

| Method     | URL                                       | Payload                                                                                                                                                          | Header        |                         |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------- |
| GET        | localhost/movieproject-api/admin/photos/2 | N/A                                                                                                                                                              | Authorization | Get By ID               |
| POST       | localhost/movieproject-api/admin/photos   | ![image3](https://raw.githubusercontent.com/lemuelrfrancisco/ADT313/main/image3.png)                                                                             | Authorization | Create using Form       |
| POST       | localhost/movieproject-api/admin/photos   | {<br> "userId": 1,<br> "movieId": 38,<br> "url":"https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",<br> "description":"Test Description"<br>} | Authorization | Create using JSON       |
| POST/PATCH | localhost/movieproject-api/admin/photos/1 | {<br> "movieId": 38,<br> "url":"https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",<br> "description":"Test Description"<br>}                  | Authorization | Update using POST/PATCH |
| DELETE     | localhost/movieproject-api/admin/photos/1 | N/A                                                                                                                                                              | Authorization | Delete By ID            |

### Users - Videos

| Method     | URL                                       | Payload                                                                                                                                                                                                                                                                                          | Header        |                         |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ----------------------- |
| GET        | localhost/movieproject-api/admin/videos/1 | N/A                                                                                                                                                                                                                                                                                              | Authorization | Get By ID               |
| POST       | localhost/movieproject-api/admin/photos   | ![image4](https://raw.githubusercontent.com/lemuelrfrancisco/ADT313/main/image4.png)                                                                                                                                                                                                             | Authorization | Create using Form       |
| POST       | localhost/movieproject-api/admin/videos   | {<br> "userId": 1,<br> "movieId": 38,<br> "url":"https://www.youtube.com/embed/49xWJJvpjzI",<br> "name":"Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD",<br> "site":"YouTube",<br> "videoType":"Clip",<br> "videoKey":"49xWJJvpjzI",<br> "official":0<br>} | Authorization | Create using JSON       |
| POST/PATCH | localhost/movieproject-api/admin/videos/1 | {<br> "movieId": 38,<br> "url":"https://www.youtube.com/embed/49xWJJvpjzI",<br> "name":"Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD",<br> "site":"YouTube",<br> "videoType":"Clip",<br> "videoKey":"49xWJJvpjzI",<br> "official":0<br>}                  | Authorization | Update using POST/PATCH |
| DELETE     | localhost/movieproject-api/admin/videos/1 | N/A                                                                                                                                                                                                                                                                                              | Authorization | Delete By ID            |
