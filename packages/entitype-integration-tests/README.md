# Entitype Integration tests

[![Build Status](https://travis-ci.org/KurtGokhan/entitype-integration-tests.svg?branch=master)](https://travis-ci.org/KurtGokhan/entitype-integration-tests)

## Database Model

Some example contexts are defined for better understanding and keeping the relationships consistent.

### University Example

Tables:

- Student
- Course
- Instructor
- Profile
- StudentCourseMap

Relationships:

- Student    +----+ Course
- Student    1----1 Profile
- Instructor 1----+ Course
- ınstructor 1----1 Profile

### Social Media Example

Tables:

- Person
- Photo
- Album
- PersonFriendsMap
- PersonPhotoLikeMap
- PhotoAlbumMap

Relationships:

- Person +----+ Person (As friends)
- Person 1----+ Photo  (Photos posted by a person)
- Person 1----+ Album  (Albums created by a person)
- Photo  +----+ Album  (Photos in an album)
- Person +----+ Photo  (A person can like photos)

## Running Tests

A config file `test/config.json` can be created like following.

``` json

{
  "$schema": "../node_modules/entitype-mysql/schema.json",
  "adapter": "mysql2",
  "host": "localhost",
  "port": 3306,
  "database": "test",
  "user": "root",
  "password": "*********"
}

```

Alternatively, following environment variables must be defined. Environment variables overrides the config file.

- DB_ADAPTER
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_PORT
