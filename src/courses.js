const mongoose = require('mongoose');

// TODO R1: complete the schema: name, author, tags (array of strings), date (default now), isPublished, price
const courseSchema = new mongoose.Schema({});

const Course = mongoose.model('Course', courseSchema);

// Each function returns the courses it finds (the caller prints them).
async function getCourses1() {
  // TODO R2: published courses, sorted by name, only name and author
}

async function getCourses2() {
  // TODO R3: published courses with tag "frontend" or "backend", sorted by price descending, only name and author
}

async function getCourses3() {
  // TODO R4: published courses that cost 15 or more OR have "by" in the name (case insensitive)
}

module.exports = { Course, getCourses1, getCourses2, getCourses3 };
