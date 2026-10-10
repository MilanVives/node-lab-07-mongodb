const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const db = require('./helpers/db');
const data = require('../data/exercise-data.json');
const courses = require('../src/courses');

before(async () => {
  await db.connect();
  await mongoose.connection.collection('courses').insertMany(
    data.map(({ _id, date, ...rest }) => ({ ...rest, _id: new mongoose.Types.ObjectId(_id), date: new Date(date) })),
  );
});
after(db.disconnect);

const plain = (docs) => (docs || []).map((d) => (typeof d.toObject === 'function' ? d.toObject() : d));
const names = (docs) => plain(docs).map((d) => d.name);

describe('R1: The Course model has the right schema', () => {
  it('exports a Course model with all fields', () => {
    assert.ok(courses.Course && courses.Course.modelName === 'Course', 'src/courses.js should export the model: module.exports = { Course, ... }');
    for (const p of ['name', 'author', 'tags', 'date', 'isPublished', 'price']) assert.ok(courses.Course.schema.path(p), `The course schema should have a "${p}" field`);
  });
});

describe('R2: getCourses1 returns the published courses sorted by name', () => {
  it('returns the right courses in the right order with only name and author', async () => {
    const result = await courses.getCourses1();
    assert.ok(Array.isArray(result), 'getCourses1 should return the array of courses (return await Course.find(...))');
    assert.deepEqual(names(result), ['ASP.NET MVC Course', 'Angular Course', 'Express.js Course', 'Node.js Course', 'Node.js Course by Jack'], 'getCourses1 should return the published courses sorted by name');
    for (const c of plain(result)) assert.deepEqual(Object.keys(c).filter((k) => k !== '_id').sort(), ['author', 'name'], 'getCourses1 should select only name and author');
  });
});

describe('R3: getCourses2 returns frontend and backend courses by price', () => {
  it('returns published frontend/backend courses, most expensive first', async () => {
    const result = names(await courses.getCourses2());
    assert.equal(result.length, 5, 'getCourses2 should return the 5 published frontend or backend courses');
    assert.equal(result[0], 'Node.js Course', 'The most expensive course (20) should be first: sort by price descending');
    assert.deepEqual(result.slice(1, 3).sort(), ['ASP.NET MVC Course', 'Angular Course'], 'The two courses of 15 should come next');
    assert.deepEqual(result.slice(3), ['Node.js Course by Jack', 'Express.js Course'], 'Then the course of 12, then the course of 10');
  });
});

describe('R4: getCourses3 returns expensive courses or courses by an author', () => {
  it('returns published courses that cost 15 or more or have "by" in the name', async () => {
    const result = names(await courses.getCourses3()).sort();
    assert.deepEqual(result, ['ASP.NET MVC Course', 'Angular Course', 'Node.js Course', 'Node.js Course by Jack'], 'getCourses3: published AND (price >= 15 OR name contains "by", case insensitive)');
  });
});
