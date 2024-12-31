import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const db_name = "dietary_planner";
const MONGODB_URL = "mongodb+srv://rssharmili:Sharmili@cluster0.gc3yk.mongodb.net/";

let db;
let client;

// Connect to MongoDB
(async () => {
  try {
    client = new MongoClient(MONGODB_URL);
    await client.connect();
    db = client.db(db_name);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
})();

// Signup Endpoint
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await db.collection("login_credentials").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please sign in." });
    }

    await db.collection("login_credentials").insertOne({ name, email, password });
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signin Endpoint
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection("login_credentials").findOne({ email, password });

    if (user) {
      res.status(200).json({ msg: "You are correct!" });
    } else {
      res.status(400).json({ msg: "Invalid credentials. Please try again." });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
// Seed Endpoint
app.get("/seed", async (req, res) => {
  try {
    const food_items = [
      
      // **Diabetes**
      { name: "Grilled Salmon Salad", calories: 250, ingredients: ["salmon", "greens", "avocado", "lemon"], cuisine: "Mediterranean", medicalConditions: ["Diabetes", "High Protein"], category: "Protein", description: "A healthy salad rich in protein and omega-3 fatty acids, perfect for managing blood sugar levels." ,imageurl :"/images/food/salmon.jpeg"},
      { name: "Chickpea & Avocado Salad", calories: 300, ingredients: ["chickpeas", "avocado", "tomato", "cucumber", "lemon"], cuisine: "International", medicalConditions: ["Diabetes", "Low Calorie"], category: "Vegan", description: "A refreshing salad with chickpeas and avocado, providing fiber and healthy fats for stable blood sugar.",imageurl :"\images\food\chickpeaavocodo.jpeg" },

      // **High BP**
      { name: "Baked Salmon with Asparagus", calories: 400, ingredients: ["salmon", "asparagus", "garlic", "lemon"], cuisine: "American", medicalConditions: ["High BP", "Heart Disease"], category: "Protein", description: "A heart-healthy dish rich in omega-3 fatty acids that help lower blood pressure.",imageurl :"/images/food/salmonas.jpeg" },
      { name: "Spinach & Lentil Soup", calories: 200, ingredients: ["spinach", "lentils", "onion", "garlic", "spices"], cuisine: "Mediterranean", medicalConditions: ["High BP", "Low Cholesterol"], category: "Vegan", description: "A nutrient-packed soup filled with spinach and lentils, great for lowering blood pressure." ,imageurl :"/images/food/spinachsoup.jpeg"},

      // **Cholesterol**
      { name: "Oats Porridge with Berries", calories: 220, ingredients: ["oats", "berries", "almond milk", "chia seeds"], cuisine: "International", medicalConditions: ["Cholesterol", "Low Cholesterol"], category: "Breakfast", description: "A fiber-rich porridge made with oats and berries, designed to help reduce cholesterol levels.",imageurl :"/images/food/oatsblueberry.jpeg" },
      { name: "Grilled Chicken with Sweet Potato", calories: 350, ingredients: ["chicken", "sweet potato", "rosemary", "garlic"], cuisine: "American", medicalConditions: ["Cholesterol", "Low Calorie"], category: "Protein", description: "A lean protein source paired with fiber-rich sweet potatoes, helping in cholesterol management.",imageurl :"/imagesfood/grilledchickensp.jpeg" },

      // **Obesity**
      { name: "Grilled Chicken with Veggies", calories: 250, ingredients: ["chicken", "broccoli", "carrot", "olive oil"], cuisine: "American", medicalConditions: ["Obesity", "Low Calorie"], category: "Protein", description: "A low-calorie, high-protein meal with grilled chicken and nutrient-rich vegetables for weight management.",imageurl :"/images/food/grilledchickenveg.jpeg" },
      { name: "Cucumber & Hummus Sandwich", calories: 180, ingredients: ["cucumber", "hummus", "whole wheat bread"], cuisine: "Mediterranean", medicalConditions: ["Obesity", "Low Calorie"], category: "Vegan", description: "A light sandwich with cucumber and hummus, offering a low-calorie snack for weight loss." ,imageurl :"/images/food/hummus.jpeg"},

      // **Heart Disease**
      { name: "Quinoa Salad", calories: 220, ingredients: ["quinoa", "cherry tomatoes", "cucumber", "feta cheese"], cuisine: "Mediterranean", medicalConditions: ["Heart Disease", "Low Cholesterol"], category: "Vegan", description: "A heart-healthy salad with quinoa, providing fiber and essential nutrients for heart health." ,imageurl :"/images/food/quinasalad.jpeg"},
      { name: "Baked Chicken with Sweet Potatoes", calories: 350, ingredients: ["chicken", "sweet potatoes", "rosemary", "garlic"], cuisine: "American", medicalConditions: ["Heart Disease", "High Protein"], category: "Protein", description: "A lean protein-rich meal designed to support heart health with anti-inflammatory sweet potatoes.",imageurl :"/images/food/chickensp.jpeg" },

      // **Arthritis**
      { name: "Turmeric Lentil Soup", calories: 250, ingredients: ["lentils", "turmeric", "carrots", "garlic", "spices"], cuisine: "Indian", medicalConditions: ["Arthritis", "Vegan"], category: "Vegan", description: "A flavorful soup with turmeric known for its anti-inflammatory properties, perfect for arthritis.",imageurl :"/images/food/dalsoup.jpeg" },
      { name: "Grilled Salmon with Kale", calories: 300, ingredients: ["salmon", "kale", "olive oil", "garlic"], cuisine: "Mediterranean", medicalConditions: ["Arthritis", "High Protein"], category: "Protein", description: "Omega-3-rich salmon paired with antioxidant-packed kale to fight inflammation from arthritis.",imageurl :"/images/food/grilledsalmon.jpeg" },

      // **Asthma**
      { name: "Spicy Chickpea Salad", calories: 220, ingredients: ["chickpeas", "spinach", "lemon", "spices"], cuisine: "Middle Eastern", medicalConditions: ["Asthma", "Vegan"], category: "Vegan", description: "A spicy, fiber-rich salad that can help in managing asthma symptoms by promoting overall lung health.",imageurl :"/images/food/chickpeasalad.jpeg" },
      { name: "Sweet Potato & Black Bean Tacos", calories: 280, ingredients: ["sweet potato", "black beans", "corn tortillas", "spices"], cuisine: "Mexican", medicalConditions: ["Asthma", "Vegan"], category: "Vegan", description: "A satisfying, nutrient-rich taco that supports asthma management with anti-inflammatory ingredients." ,imageurl :"/images/food/sptacos.jpeg"},

      // **Energy Boost**
      { name: "Avocado Toast with Eggs", calories: 300, ingredients: ["avocado", "eggs", "whole wheat bread"], cuisine: "American", medicalConditions: ["Energy Boost", "High Protein"], category: "Breakfast", description: "A nutrient-packed breakfast offering healthy fats from avocado and protein from eggs for energy." ,imageurl :"/images/food/avacodoegg.jpeg"},
      { name: "Banana Oat Smoothie", calories: 250, ingredients: ["banana", "oats", "almond milk", "honey"], cuisine: "International", medicalConditions: ["Energy Boost", "Low Cholesterol"], category: "Smoothie", description: "A delicious smoothie made with banana and oats for an energy boost throughout the day.",imageurl :"/images/food/bananasmoo.jpeg" },

      // **Weight Loss**
      { name: "Zucchini Noodles with Pesto", calories: 180, ingredients: ["zucchini", "basil pesto", "olive oil"], cuisine: "Italian", medicalConditions: ["Weight Loss", "Low Calorie"], category: "Vegan", description: "A low-calorie, nutrient-dense dish using zucchini noodles and pesto for a healthy weight loss meal.",imageurl :"/images/food/pestopasta.jpeg" },
      { name: "Vegetable Stir-Fry", calories: 220, ingredients: ["broccoli", "carrot", "bell peppers", "soy sauce"], cuisine: "Asian", medicalConditions: ["Weight Loss", "Low Calorie"], category: "Vegan", description: "A colorful stir-fry with a variety of vegetables, perfect for a low-calorie, nutritious meal.",imageurl :"/images/food/vegfry.jpeg" },

      // **Low BP**
      { name: "Spinach & Kale Salad", calories: 150, ingredients: ["spinach", "kale", "tomato", "cucumber"], cuisine: "Mediterranean", medicalConditions: ["Low BP", "Vegan"], category: "Salad", description: "A light salad filled with iron-rich spinach and kale, helping to regulate blood pressure.",imageurl :"/images/food/spinach.jpeg" },
      { name: "Beetroot Soup", calories: 180, ingredients: ["beetroot", "onion", "garlic", "spices"], cuisine: "International", medicalConditions: ["Low BP", "Vegan"], category: "Soup", description: "A beetroot soup rich in nitrates that can help in improving blood flow and increasing blood pressure." ,imageurl :"/images/food/beetrootsoup.jpeg"},

      // **High Sugar**
      { name: "Sweet Potato & Chickpea Curry", calories: 350, ingredients: ["sweet potato", "chickpeas", "coconut milk", "spices"], cuisine: "Indian", medicalConditions: ["High Sugar", "Vegan"], category: "Vegan", description: "A flavorful curry with sweet potatoes and chickpeas, offering a balance of slow-releasing sugars." ,imageurl :"/images/food/spcurry.jpeg"},
      { name: "Quinoa & Black Bean Salad", calories: 250, ingredients: ["quinoa", "black beans", "corn", "lime"], cuisine: "Mexican", medicalConditions: ["High Sugar", "Vegan"], category: "Vegan", description: "A high-protein salad with quinoa and black beans to help manage blood sugar levels." ,imageurl :"/images/food/quinasalad.jpeg"},

      // **Diabetes**
      { name: "Palak Tofu", calories: 220, ingredients: ["tofu", "spinach", "garlic", "tomato", "spices"], cuisine: "Indian", medicalConditions: ["Diabetes", "High Protein"], category: "Vegan", description: "A tofu-based curry with spinach, packed with protein and fiber for diabetic control." ,imageurl :"/images/food/palaktofu.jpeg"},
      { name: "Lentil Soup (Dal)", calories: 150, ingredients: ["lentils", "tomato", "garlic", "spices"], cuisine: "Indian", medicalConditions: ["Diabetes", "Vegan"], category: "Vegan", description: "A nutritious lentil soup with garlic and spices, ideal for diabetic patients." ,imageurl :"/images/food/lentilsoup.jpeg"},

      // **High BP**
      { name: "Methi Thepla", calories: 150, ingredients: ["fenugreek leaves", "wheat flour", "spices"], cuisine: "Indian", medicalConditions: ["High BP", "Low Cholesterol"], category: "Breakfast", description: "A healthy fenugreek-based flatbread, great for managing blood pressure." ,imageurl :"/images/food/methi.jpeg"},
      { name: "Vegetable Stew", calories: 180, ingredients: ["carrot", "beans", "potato", "coconut milk"], cuisine: "South Indian", medicalConditions: ["High BP", "Vegan"], category: "Vegan", description: "A light and nutritious vegetable stew, perfect for heart health." ,imageurl :"/images/food/vegstew.jpeg"},

      // **Cholesterol**
      { name: "Vegetable Pulao", calories: 250, ingredients: ["rice", "mixed vegetables", "spices"], cuisine: "Indian", medicalConditions: ["Cholesterol", "Low Cholesterol"], category: "Vegan", description: "A flavorful vegetable rice dish that helps in reducing cholesterol." ,imageurl :"/images/food/vegpulao.jpeg"},
      { name: "Chana Masala", calories: 300, ingredients: ["chickpeas", "onion", "tomato", "spices"], cuisine: "Indian", medicalConditions: ["Cholesterol", "High Protein"], category: "Vegan", description: "A high-protein curry made with chickpeas and tomatoes to support cholesterol management.",imageurl :"/images/food/channamasala.jpeg" },

      // **Obesity**
      { name: "Moong Dal Chilla", calories: 150, ingredients: ["yellow moong dal", "onion", "green chilies", "spices"], cuisine: "Indian", medicalConditions: ["Obesity", "Low Calorie"], category: "Breakfast", description: "A low-calorie, high-protein pancake made from moong dal, perfect for weight management." ,imageurl :"/images/food/chilla.jpeg"},
      { name: "Cabbage Sabzi", calories: 180, ingredients: ["cabbage", "onion", "tomato", "spices"],medicalConditions: ["High BP", "Low Calorie"],imageurl :"/images/food/cabbage.jpeg"}
    ];

    const existingData = await db.collection("food_items").countDocuments();
    if (existingData === 0) {
      const result = await db.collection("food_items").insertMany(food_items);
      res.status(201).json({ message: "Food items seeded successfully!", insertedCount: result.insertedCount });
    } else {
      res.status(400).json({ message: "Food items already exist in the database." });
    }
  } 
catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ message: "Internal server error during seeding." });
  }
});
// Suggest Food Endpoint
app.post('/suggest-food', async (req, res) => {
  try {
    const { ingredients, maxCalories, medicalConditions } = req.body; // Access data from the request body

    console.log("Received Query:", req.body);

    // Parse the maxCalories to a number, or leave it undefined if invalid
    const parsedMaxCalories = isNaN(parseInt(maxCalories, 10)) ? undefined : parseInt(maxCalories, 10);

    // Parse the dietary restrictions and medical conditions
    const ingredientsArray = ingredients
      ? ingredients.split(',').map(item => item.trim().toLowerCase())
      : [];
    const medicalConditionsArray = medicalConditions
      ? medicalConditions.split(',').map(item => item.trim().toLowerCase())
      : [];

    // Build MongoDB query
    const query = {};

    // Check if maxCalories is valid and set it as a filter
    if (parsedMaxCalories) {
      query.calories = { $lte: parsedMaxCalories };
    }
    
    // Check if medicalConditionsArray is not empty and set it as a filter
    if (medicalConditionsArray.length > 0) {
      query.medicalConditions = { $nin: medicalConditionsArray.map(condition => new RegExp(`^${condition}$`, 'i')) };
    }
    
    // Check if ingredientsArray is not empty and set it as a filter
    if (ingredientsArray.length > 0) {
      query.ingredients = { $nin: ingredientsArray.map(restriction => new RegExp(`^${restriction}$`, 'i')) };
    }
    
    console.log('Final Query:', query); // Log the query being sent to the database
    

    // Query the database for food items matching the query
    const food_items = await db.collection("food_items").find(query).toArray();

    // If no items are found, return an empty array
    if (food_items.length === 0) {
      return res.status(200).json({message: "Error fetching food suggestions."}); // Return an empty array instead of a 404 error
    }

    // Return the found food items
    res.status(200).json(food_items);

  } catch (error) {
    console.error("Error fetching food suggestions:", error);
    res.status(500).json({ message: "Error fetching food suggestions." });
  }
});



// Start Server
app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
