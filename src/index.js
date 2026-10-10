// Run with: npm start (needs a MongoDB; import the data first, see README)
const mongoose = require('mongoose');
const { getCourses1, getCourses2, getCourses3 } = require('./courses');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongo-exercises');
  console.log('Connected to MongoDB');
  console.log(await getCourses1());
  console.log(await getCourses2());
  console.log(await getCourses3());
  await mongoose.disconnect();
}

main().catch((err) => { console.error('Could not connect to MongoDB...', err.message); process.exit(1); });
