// ==========================================
// MongoDB Aggregation Exercises - Solutions
// Collection: restaurants
// ==========================================

// 1. Select fields - Show each restaurant’s name and borough, hide _id.
db.restaurants.find(
  {},
  { "_id": 0, "name": 1, "borough": 1 }
);

// 2. Write a MongoDB query that calculates the number of restaurants in Manhattan
db.restaurants.countDocuments({ "borough": "Manhattan" });

// 3. Count restaurants per borough - How many restaurants in each borough?
db.restaurants.aggregate([
  {
    $group: {
      _id: "$borough",
      totalRestaurants: { $sum: 1 }
    }
  }
]);

// 4. Top 5 cuisine in Brooklyn - find the 5 most common cuisines in Brooklyn. Output the cuisine and their amount.
db.restaurants.aggregate([
  {
    $match: { "borough": "Brooklyn" }
  },
  {
    $group: {
      _id: "$cuisine",
      total: { $sum: 1 }
    }
  },
  {
    $sort: { total: -1 }
  },
  {
    $limit: 5
  }
]);

// 5. Write a MongoDB query that calculates the average score of each restaurant. Project borough name, restaurant name, average score.
db.restaurants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      borough: 1,
      avgScore: { $avg: "$grades.score" }
    }
  }
]);

// 6. List restaurants that at least once got grade "B".
db.restaurants.find({ "grades.grade": "B" });

// 7. For each restaurant, compute min and max historical score.
db.restaurants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      minScore: { $min: "$grades.score" },
      maxScore: { $max: "$grades.score" }
    }
  }
]);