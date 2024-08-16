# Music Management System

A full-stack music management application built using TypeScript, Express, and MongoDB. The application allows users to manage songs, albums, artists, and genres, with full CRUD (Create, Read, Update, Delete) operations and advanced filtering capabilities.
## Technologies Used

- **Backend**: TypeScript, Express.js
- **Database**: MongoDB, Mongoose
- **File Upload**: Multer
  
## Features
- **`CRUD Operations`:** Create, read, update, and delete songs, albums, artists, and genres.
-  **`File Uploads`:** Supports file uploads for song files, ensuring each song is associated with a physical file on the server.
-  **`Search & Filter`:** Implements search and filtering functionality, allowing users to find songs based on criteria like title, artist, album, genre, etc.
-  **`Statistics`:** Provides various statistics, including the number of albums per artist, the most popular genres, and more.
-  **`Relational Data Management`:** Manages relationships between songs, albums, artists, and genres, ensuring data integrity.
-  **`Efficient Querying`:** Uses MongoDB aggregation pipelines for efficient querying and data retrieval.
-  **`Error handling`:** Error handlingand validation with custom error messages.


  
## Database Design

The database is built using MongoDB, and the schema is designed to manage songs, artists, albums, and genres. Below are the collections and their relationships:

### Collections

- **Songs**
  - Fields: `title`, `artists`, `album`, `genres`, `fileUrl`
  - Relationships: 
    - `artists` (Many-to-Many with Artists)
    - `album` (Many-to-One with Albums)
    - `genres` (Many-to-Many with Genres)
  
- **Artists**
  - Fields: `name`, `songs`, `albums`
  - Relationships: 
    - `songs` (Many-to-Many with Songs)
    - `albums` (Many-to-Many with Albums)
  
- **Albums**
  - Fields: `name`, `songs`, `artists`
  - Relationships: 
    - `songs` (Many-to-One with Songs)
    - `artists` (Many-to-Many with Artists)
  
- **Genres**
  - Fields: `name`, `songs`
  - Relationships: 
    - `songs` (Many-to-Many with Songs)

## API Endpoints

### Songs

- **Create Song**  
  `POST /api/songs`  
  Create a new song.

- **List Songs**  
  `GET /api/songs`  
  Retrieve all songs, with optional filters.

- **Get Song by ID**  
  `GET /api/songs/:id`  
  Retrieve a song by its ID.

- **Update Song**  
  `PATCH /api/songs/:id`  
  Update a song's details.

- **Delete Song**  
  `DELETE /api/songs/:id`  
  Delete a song by its ID.

### Artists

- **Create Artist**  
  `POST /api/artists`  
  Create a new artist.

- **List Artists**  
  `GET /api/artists`  
  Retrieve all artists.

- **Get Artist by ID**  
  `GET /api/artists/:id`  
  Retrieve an artist by its ID.

- **Update Artist**  
  `PATCH /api/artists/:id`  
  Update an artist's details.

- **Delete Artist**  
  `DELETE /api/artists/:id`  
  Delete an artist by its ID.

### Albums

- **Create Album**  
  `POST /api/albums`  
  Create a new album.

- **List Albums**  
  `GET /api/albums`  
  Retrieve all albums.

- **Get Album by ID**  
  `GET /api/albums/:id`  
  Retrieve an album by its ID.

- **Update Album**  
  `PATCH /api/albums/:id`  
  Update an album's details.

- **Delete Album**  
  `DELETE /api/albums/:id`  
  Delete an album by its ID.

### Genres

- **Create Genre**  
  `POST /api/genres`  
  Create a new genre.

- **List Genres**  
  `GET /api/genres`  
  Retrieve all genres.

- **Get Genre by ID**  
  `GET /api/genres/:id`  
  Retrieve a genre by its ID.

- **Update Genre**  
  `PATCH /api/genres/:id`  
  Update a genre's details.

- **Delete Genre**  
  `DELETE /api/genres/:id`  
  Delete a genre by its ID.
