# Lab 07: MongoDB and Mongoose

Query a MongoDB database with Mongoose: filtering, sorting and selecting fields.

## Getting started

```bash
npm install
npm test
```

`npm test` runs the same checks as the autograder. The tests start their own temporary in-memory MongoDB (the first `npm install` downloads it once, about 70 MB), so you do not need a database to run them. Run a single requirement with `npm test -- --test-name-pattern="^R1:"`.

To run `npm start` against your own database, import the data first:

```bash
mongoimport --db mongo-exercises --collection courses --drop --file data/exercise-data.json --jsonArray
npm start
```

For MongoDB Atlas set `MONGODB_URI` to your connection string before `npm start`.

All code goes in `src/courses.js`. Each function **returns** the courses (`return Course.find(...)`); `src/index.js` prints them.

## Requirements

### R1: The Course model has the right schema
**2 points**

Complete `courseSchema`: `name` (String), `author` (String), `tags` ([String]), `date` (Date, default `Date.now`), `isPublished` (Boolean), `price` (Number).

### R2: getCourses1 returns the published courses sorted by name
**3 points**

All published courses, sorted by name (ascending), with only the fields `name` and `author` (`select`).

### R3: getCourses2 returns frontend and backend courses by price
**3 points**

All published courses with the tag `frontend` or `backend` (`$in`), sorted by price from high to low, with only `name` and `author`.

### R4: getCourses3 returns expensive courses or courses by an author
**2 points**

All published courses that cost 15 or more **or** have the word `by` in their name (case insensitive, use a regular expression and `.or([...])`), with only `name` and `author`.

## Submitting

Commit your work and run `npm run submit`. Your score and feedback appear under **Releases** after a few minutes. You can submit as often as you like; the latest submission counts.
