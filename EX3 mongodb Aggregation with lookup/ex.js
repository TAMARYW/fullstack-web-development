// EX3: MongoDB Aggregation Practice Questions (Tasks 1-15)
// Collections: customers, purchases, stores

// -----------------------------------------------------------------------------
// 1. Selection: Show the first_name, last_name, and country of all customers, hiding the _id.
// -----------------------------------------------------------------------------
db.customers.aggregate([
  {
    $project: {
      _id: 0,
      first_name: 1,
      last_name: 1,
      country: 1
    }
  }
]);

// -----------------------------------------------------------------------------
// 2. Basic Filtering: Find all customers from "Israel" who are older than 40.
// -----------------------------------------------------------------------------
db.customers.aggregate([
  {
    $match: {
      country: "Israel",
      age: { $gt: 40 }
    }
  }
]);

// -----------------------------------------------------------------------------
// 3. Count & Match: Calculate how many purchases have a "shipped" status.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $match: {
      status: "shipped"
    }
  },
  {
    $count: "shipped_purchases_count"
  }
]);

// -----------------------------------------------------------------------------
// 4. Join (Lookup): Join purchases with customers to show the item name and the buyer's first_name.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      _id: 0,
      item: 1,
      first_name: "$customer.first_name"
    }
  }
]);

// -----------------------------------------------------------------------------
// 5. Filtered Join: Find all purchases made by "Gold" members. Show item, amount, and membership.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $match: {
      "customer.membership": "Gold"
    }
  },
  {
    $project: {
      _id: 0,
      item: 1,
      amount: 1,
      membership: "$customer.membership"
    }
  }
]);

// -----------------------------------------------------------------------------
// 6. Store Join: Join purchases with stores to show the item name and the store_name where it was purchased.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      as: "store"
    }
  },
  { $unwind: "$store" },
  {
    $project: {
      _id: 0,
      item: 1,
      store_name: "$store.store_name"
    }
  }
]);

// -----------------------------------------------------------------------------
// 7. Triple Join: Join purchases with both customers and stores. Show first_name, item, and the store city.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      as: "store"
    }
  },
  { $unwind: "$store" },
  {
    $project: {
      _id: 0,
      first_name: "$customer.first_name",
      item: 1,
      city: "$store.city"
    }
  }
]);

// -----------------------------------------------------------------------------
// 8. Grouping: Calculate the total amount of money spent per country.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $group: {
      _id: "$customer.country",
      total_spent: { $sum: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      country: "$_id",
      total_spent: 1
    }
  }
]);

// -----------------------------------------------------------------------------
// 9. Sorting & Limits: Find the top 3 most expensive purchases. Show item, amount, and the store manager name.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      as: "store"
    }
  },
  { $unwind: "$store" },
  { $sort: { amount: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      item: 1,
      amount: 1,
      manager: "$store.manager"
    }
  }
]);

// -----------------------------------------------------------------------------
// 10. Average Calculation: Find the average purchase amount for each membership type.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $group: {
      _id: "$customer.membership",
      avg_amount: { $avg: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      membership: "$_id",
      avg_amount: 1
    }
  }
]);

// -----------------------------------------------------------------------------
// 11. Multi-condition Join: Find all purchases of "Tech" items made in stores located in "London".
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      as: "store"
    }
  },
  { $unwind: "$store" },
  {
    $match: {
      category: "Tech",
      "store.city": "London"
    }
  },
  {
    $project: {
      _id: 0,
      item: 1,
      category: 1,
      amount: 1,
      store_city: "$store.city"
    }
  }
]);

// -----------------------------------------------------------------------------
// 12. Aggregated Match: Show the list of countries that have a total purchase amount exceeding 5,000.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $group: {
      _id: "$customer.country",
      total_spent: { $sum: "$amount" }
    }
  },
  {
    $match: {
      total_spent: { $gt: 5000 }
    }
  },
  {
    $project: {
      _id: 0,
      country: "$_id",
      total_spent: 1
    }
  }
]);

// -----------------------------------------------------------------------------
// 13. Data Transformation: Show the store_name in uppercase and the manager name for all stores.
// -----------------------------------------------------------------------------
db.stores.aggregate([
  {
    $project: {
      _id: 0,
      store_name: { $toUpper: "$store_name" },
      manager: 1
    }
  }
]);

// -----------------------------------------------------------------------------
// 14. Customer Behavior: Count how many unique items were bought by customers from "Canada".
// -----------------------------------------------------------------------------
db.customers.aggregate([
  { $match: { country: "Canada" } },
  {
    $lookup: {
      from: "purchases",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "purchases"
    }
  },
  { $unwind: "$purchases" },
  {
    $group: {
      _id: null,
      unique_items: { $addToSet: "$purchases.item" }
    }
  },
  {
    $project: {
      _id: 0,
      unique_item_count: { $size: "$unique_items" }
    }
  }
]);

// -----------------------------------------------------------------------------
// 15. Complex Summary: For each store city, find the total revenue and the maximum amount spent on a single purchase.
// -----------------------------------------------------------------------------
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      as: "store"
    }
  },
  { $unwind: "$store" },
  {
    $group: {
      _id: "$store.city",
      total_revenue: { $sum: "$amount" },
      max_purchase: { $max: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      city: "$_id",
      total_revenue: 1,
      max_purchase: 1
    }
  }
]);