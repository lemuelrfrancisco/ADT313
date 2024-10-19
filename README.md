# ADT313

## Midterms coverage (checking is on finals)

    ### 1. Login Page
    ### 2. Register Page
    ### 3. Create Movie with search to TMDB
    ### 4. Update Movie with field validation

## Semi-finals & Finals coverage

    ### 1. Admin Dashboard with design
        Login, Register, Movie, Artist, photos and videos (artist, photos, videos should be linked to movie)
    ### 2. Client Site with design

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
