import React, { useState } from "react";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const qaPairs = [
    { question: "What is a balanced diet?", answer: "A balanced diet includes a mix of fruits, vegetables, proteins, grains, and dairy in the right proportions." },
    { question: "How much water should I drink daily?", answer: "The general recommendation is about 2 liters or 8 glasses per day, but individual needs may vary." },
    
      // Blood Pressure (BP)
      { question: "What is high blood pressure (hypertension)?", answer: "High blood pressure, or hypertension, occurs when the force of the blood against the artery walls is consistently too high. It can lead to serious health issues if not managed." },
      { question: "What causes high blood pressure?", answer: "Causes of high blood pressure include poor diet, lack of exercise, obesity, smoking, excessive alcohol intake, and genetics." },
      { question: "How can I lower my blood pressure naturally?", answer: "To lower blood pressure naturally, focus on a healthy diet (low in salt), regular exercise, maintaining a healthy weight, reducing alcohol consumption, and managing stress." },
      { question: "What are the symptoms of high blood pressure?", answer: "High blood pressure often has no symptoms, which is why it is called the silent killer. Some may experience headaches, dizziness, or shortness of breath." },
      { question: "Can stress cause high blood pressure?", answer: "Yes, chronic stress can contribute to high blood pressure by causing the release of hormones that constrict blood vessels." },
      { question: "What foods should I avoid with high blood pressure?", answer: "Foods high in sodium (salt), processed foods, fatty foods, and sugary snacks should be avoided to help control blood pressure." },
      { question: "How does exercise affect blood pressure?", answer: "Regular exercise helps lower blood pressure by strengthening the heart and improving blood flow." },
      { question: "Can high blood pressure lead to other health problems?", answer: "Yes, untreated high blood pressure can lead to heart disease, kidney damage, strokes, and vision loss." },
      { question: "What is considered normal blood pressure?", answer: "Normal blood pressure is generally considered to be 120/80 mm Hg or lower." },
      { question: "What medications are commonly prescribed for high blood pressure?", answer: "Common medications include diuretics, ACE inhibitors, calcium channel blockers, and beta-blockers." },
    
      // Sugar (Diabetes)
      { question: "What is diabetes, and how is it different from high blood sugar?", answer: "Diabetes is a condition where the body doesn't produce enough insulin or doesn't use it effectively, leading to high blood sugar levels." },
      { question: "What are the signs and symptoms of diabetes?", answer: "Symptoms include excessive thirst, frequent urination, fatigue, blurred vision, and slow healing of wounds." },
      { question: "How can I manage my blood sugar levels effectively?", answer: "Managing blood sugar involves eating a balanced diet, exercising regularly, monitoring blood sugar levels, and taking medications as needed." },
      { question: "What foods should diabetics avoid to control blood sugar?", answer: "Diabetics should avoid sugary foods, white bread, sugary beverages, and processed snacks that cause blood sugar spikes." },
      { question: "How do carbohydrates affect blood sugar levels?", answer: "Carbohydrates are broken down into glucose, which can cause a rise in blood sugar levels. It’s important for diabetics to monitor carb intake." },
      { question: "What are the long-term complications of uncontrolled diabetes?", answer: "Uncontrolled diabetes can lead to complications such as heart disease, kidney failure, nerve damage, and vision loss." },
      { question: "How does exercise help manage blood sugar levels?", answer: "Exercise helps the body use insulin more efficiently and lowers blood sugar levels by increasing muscle activity." },
      { question: "What is the glycemic index, and how does it affect diabetes?", answer: "The glycemic index measures how quickly foods raise blood sugar levels. Diabetics should choose foods with a low glycemic index to help manage blood sugar." },
      { question: "Can diabetes be reversed or cured with diet and exercise?", answer: "In some cases, type 2 diabetes can be managed or even reversed with diet changes and regular exercise, though it varies from person to person." },
      { question: "How can I monitor my blood sugar levels at home?", answer: "You can monitor blood sugar at home using a glucose meter to measure the amount of sugar in your blood." },
    
      // Diet Foods
      { question: "What is a healthy balanced diet?", answer: "A healthy balanced diet includes a variety of foods: fruits, vegetables, whole grains, lean proteins, and healthy fats, in appropriate proportions." },
      { question: "What are the best foods to eat for weight loss?", answer: "Foods rich in fiber, lean proteins, and healthy fats, such as vegetables, whole grains, fish, and legumes, are great for weight loss." },
      { question: "How do I eat a healthy diet on a budget?", answer: "Buying in bulk, planning meals, and focusing on whole foods like beans, rice, and seasonal vegetables can help you eat healthily on a budget." },
      { question: "What are nutrient-dense foods?", answer: "Nutrient-dense foods are foods that provide a high amount of nutrients relative to their calorie content, such as vegetables, fruits, and lean proteins." },
      { question: "What role do vitamins and minerals play in a healthy diet?", answer: "Vitamins and minerals support various body functions, such as immune health, bone strength, and energy production." },
      { question: "What is the difference between complex and simple carbohydrates?", answer: "Complex carbohydrates are found in whole grains and legumes and take longer to digest, while simple carbohydrates are found in sugary foods and digest quickly." },
      { question: "What are some healthy snacks to keep me energized during the day?", answer: "Healthy snacks include nuts, yogurt, fruits, vegetables with hummus, and whole-grain crackers." },
      { question: "What are the benefits of eating whole foods?", answer: "Whole foods are nutrient-dense, providing essential vitamins, minerals, and fiber, which support overall health and help maintain a healthy weight." },
      { question: "How can I ensure I'm getting enough protein on a plant-based diet?", answer: "You can get protein from plant-based sources like lentils, chickpeas, tofu, quinoa, and nuts." },
      { question: "What is the role of fiber in a healthy diet?", answer: "Fiber aids digestion, helps maintain blood sugar levels, and promotes satiety, preventing overeating." },
    
      // Cholesterol
      { question: "What is cholesterol, and why is it important for my health?", answer: "Cholesterol is a fatty substance that is essential for cell structure and hormone production. However, high levels of cholesterol can increase heart disease risk." },
      { question: "What is the difference between good and bad cholesterol?", answer: "Good cholesterol (HDL) helps remove bad cholesterol (LDL) from the bloodstream, reducing heart disease risk." },
      { question: "How can I lower my cholesterol levels naturally?", answer: "You can lower cholesterol by eating fiber-rich foods, reducing saturated fats, eating heart-healthy fats like olive oil, and exercising regularly." },
      { question: "What foods should I eat to raise good cholesterol?", answer: "Foods like oats, fatty fish (like salmon), nuts, and olive oil can help raise good cholesterol." },
      { question: "How does exercise affect cholesterol levels?", answer: "Exercise helps increase HDL (good cholesterol) and lower LDL (bad cholesterol), improving overall cholesterol levels." },
      { question: "What are the risks associated with high cholesterol?", answer: "High cholesterol increases the risk of heart disease, stroke, and peripheral artery disease by contributing to plaque buildup in arteries." },
      { question: "What is the optimal level of cholesterol in the blood?", answer: "An optimal total cholesterol level is under 200 mg/dL, with LDL levels under 100 mg/dL and HDL levels above 60 mg/dL." },
      { question: "Can cholesterol be controlled with medication alone?", answer: "While medication can help control cholesterol, lifestyle changes like diet and exercise are essential for long-term management." },
      { question: "How can I reduce my cholesterol through dietary changes?", answer: "Focus on eating more fiber-rich foods, replacing saturated fats with unsaturated fats, and avoiding trans fats." },
      { question: "What are some cholesterol-lowering foods to include in my diet?", answer: "Cholesterol-lowering foods include oats, barley, beans, lentils, fatty fish, nuts, and plant-based oils." },
    
      // Allergies
      { question: "What are food allergies, and how do they differ from food intolerances?", answer: "Food allergies are immune system reactions to certain foods, whereas food intolerances are digestive issues caused by the inability to digest certain foods." },
      { question: "How do I know if I have a food allergy?", answer: "Symptoms like hives, swelling, stomach pain, or difficulty breathing after eating certain foods may indicate an allergy." },
      { question: "What are the most common food allergens?", answer: "The most common food allergens include peanuts, tree nuts, eggs, milk, soy, wheat, fish, and shellfish." },
      { question: "What is the difference between a mild allergic reaction and a severe one?", answer: "A mild reaction might involve itching or swelling, while a severe allergic reaction (anaphylaxis) can cause difficulty breathing and requires immediate medical attention." },
      { question: "How can I manage my food allergies in daily life?", answer: "Read food labels carefully"},
      
      { question: "What is a balanced diet?", answer: "A balanced diet includes a mix of fruits, vegetables, proteins, grains, and dairy in the right proportions." },
      { question: "How much water should I drink daily?", answer: "The general recommendation is about 2 liters or 8 glasses per day, but individual needs may vary." },
      { question: "What are good sources of protein?", answer: "Great protein sources include chicken, fish, beans, lentils, tofu, eggs, and dairy products." },
      { question: "What are healthy snacks?", answer: "Healthy snacks include nuts, fruits, yogurt, vegetable sticks with hummus, and whole-grain crackers." },
      { question: "How can I lose weight?", answer: "To lose weight, focus on a calorie deficit, eat nutrient-dense foods, and incorporate regular exercise." },
      { question: "What are the benefits of fiber?", answer: "Fiber helps with digestion, maintains blood sugar levels, and keeps you feeling full longer." },
      { question: "How can I gain weight healthily?", answer: "To gain weight, consume calorie-dense foods like nuts, avocados, and lean proteins, and ensure you're in a calorie surplus." },
      { question: "What foods are rich in vitamins?", answer: "Fruits, vegetables, whole grains, and lean proteins are great sources of essential vitamins." },
      { question: "What is the role of carbohydrates?", answer: "Carbohydrates provide energy for your body and brain, and are essential for daily functioning." },
      { question: "Are fats bad for you?", answer: "Not all fats are bad. Healthy fats, like those in avocados, nuts, and olive oil, are essential for your body." },
      { question: "What are the benefits of omega-3 fatty acids?", answer: "Omega-3s support brain health, reduce inflammation, and promote heart health." },
      { question: "What should I eat before a workout?", answer: "A small meal with carbs and protein, like a banana with peanut butter, can fuel your workout." },
      { question: "What should I eat after a workout?", answer: "A combination of protein and carbs, like a protein shake or chicken with rice, helps with recovery." },
      { question: "How much sugar is too much?", answer: "The WHO recommends limiting added sugars to less than 10% of your daily caloric intake." },
      { question: "What are good sources of calcium?", answer: "Dairy products, leafy greens, almonds, and fortified foods are excellent sources of calcium." },
      { question: "What is intermittent fasting?", answer: "Intermittent fasting is an eating pattern where you cycle between periods of eating and fasting." },
      { question: "Is coffee good for you?", answer: "In moderation, coffee can improve focus and energy, but excessive consumption can lead to negative effects." },
      { question: "What are superfoods?", answer: "Superfoods like blueberries, salmon, and spinach are nutrient-dense and offer multiple health benefits." },
      { question: "How can I reduce bloating?", answer: "Drink water, avoid high-sodium foods, and eat slowly to reduce bloating." },
      { question: "What are probiotics?", answer: "Probiotics are live bacteria that promote gut health, found in foods like yogurt and kimchi." },
      { question: "What are prebiotics?", answer: "Prebiotics are fibers that feed good gut bacteria, found in foods like bananas, onions, and garlic." },
      { question: "How do I know if I have a food allergy?", answer: "Symptoms like rashes, swelling, or digestive issues after eating certain foods could indicate an allergy. Consult a doctor for testing." },
      { question: "What is gluten?", answer: "Gluten is a protein found in wheat, barley, and rye. It can cause issues for those with celiac disease or gluten sensitivity." },
      { question: "What are healthy breakfast options?", answer: "Oatmeal with fruit, Greek yogurt with nuts, and whole-grain toast with avocado are great options." },
      { question: "How much protein do I need daily?", answer: "The recommended daily intake is about 0.8 grams per kilogram of body weight, but it may vary based on activity level." },
      { question: "What are the dangers of processed foods?", answer: "Processed foods often contain high levels of sugar, salt, and unhealthy fats, which can lead to health issues." },
      { question: "What are antioxidants?", answer: "Antioxidants are compounds that protect your cells from damage caused by free radicals." },
      { question: "What foods help boost immunity?", answer: "Foods like citrus fruits, garlic, ginger, and yogurt can support your immune system." },
      { question: "How can I reduce cholesterol?", answer: "Eat more fiber, reduce saturated fats, and include heart-healthy foods like fish and nuts." },
      { question: "What is the keto diet?", answer: "The keto diet is a low-carb, high-fat diet that can help with weight loss and improve certain health conditions." },
      { question: "Are meal replacements healthy?", answer: "Meal replacements can be convenient but shouldn't replace whole, balanced meals regularly." },
      { question: "What are the benefits of green tea?", answer: "Green tea is rich in antioxidants and can support metabolism and brain health." },
      { question: "How do I avoid overeating?", answer: "Practice portion control, eat slowly, and avoid distractions while eating." },
      { question: "What is mindful eating?", answer: "Mindful eating involves being present and paying attention to your food, hunger, and fullness cues." },
      { question: "What are healthy fats?", answer: "Healthy fats include monounsaturated and polyunsaturated fats, found in foods like nuts, seeds, and fish." },
      { question: "Can I eat carbs and still lose weight?", answer: "Yes, as long as you're in a calorie deficit and focus on complex carbs like whole grains." },
      { question: "What are the signs of dehydration?", answer: "Signs include dark urine, dry mouth, fatigue, and dizziness." },
      { question: "How do I build muscle?", answer: "Consume sufficient protein, stay in a slight calorie surplus, and engage in strength training." },
      { question: "What is BMI?", answer: "BMI, or Body Mass Index, is a measure of body fat based on height and weight." },
      { question: "Are supplements necessary?", answer: "Supplements can help fill nutritional gaps but shouldn't replace a balanced diet." },
      { question: "What is the Mediterranean diet?", answer: "The Mediterranean diet focuses on fruits, vegetables, whole grains, olive oil, and lean proteins." },
      { question: "How do I manage cravings?", answer: "Distract yourself, drink water, and choose healthier alternatives to satisfy your cravings." },
      { question: "What are whole foods?", answer: "Whole foods are minimally processed and include fruits, vegetables, nuts, and whole grains." },
      { question: "What are empty calories?", answer: "Empty calories come from foods with little nutritional value, like sugary drinks and snacks." },
      { question: "What are the benefits of meal prepping?", answer: "Meal prepping saves time, reduces food waste, and helps with portion control." },
      { question: "What is the role of iron in the body?", answer: "Iron helps transport oxygen in the blood and supports energy production." },
      { question: "What are signs of vitamin D deficiency?", answer: "Symptoms include fatigue, bone pain, and frequent infections." },
      { question: "What is the role of magnesium?", answer: "Magnesium supports muscle function, energy production, and bone health." },
      { question: "What are good post-workout meals?", answer: "Grilled chicken with sweet potatoes, or a smoothie with protein powder and fruit, are great options." },
      { question: "What are plant-based proteins?", answer: "Plant-based proteins include lentils, chickpeas, tofu, quinoa, and nuts." },
      { question: "How can I eat healthy on a budget?", answer: "Focus on whole foods, buy in bulk, and plan meals ahead to reduce waste." },
      { question: "What are the benefits of turmeric?", answer: "Turmeric contains curcumin, which has anti-inflammatory and antioxidant properties." }
  ];

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add the user's message
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Generate Dr. Alice's response
    const botResponse = generateResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]); 

    setInput(""); // Clear the input field
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (form submission)
      handleSend();
    }
  };

  const generateResponse = (input) => {
    const normalizedInput = input.toLowerCase();
    const inputWords = normalizedInput.split(' '); // Declare inputWords

    // Check if the input is a greeting or common introductory phrase
    const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hi doctor"];
    if (greetings.some(greeting => normalizedInput.includes(greeting))) {
      return { sender: "bot", text: "I'm here to help! Could you please provide more details?" };
    }

    // Search for keywords in the input that match any question
    const matchedPairs = qaPairs.filter((qa) => {
      const questionWords = qa.question.toLowerCase().replace('?', '').split(' '); 
      return inputWords.some(word => questionWords.includes(word));
    });

    if (matchedPairs.length > 0) {
      // If multiple matches, prioritize the most relevant based on word count
      const sortedMatches = matchedPairs.sort((a, b) => {
        const aWordCount = a.question.split(' ').length;
        const bWordCount = b.question.split(' ').length;
        const aMatchingWords = a.question.toLowerCase().split(' ').filter(word => inputWords.includes(word)).length;
        const bMatchingWords = b.question.toLowerCase().split(' ').filter(word => inputWords.includes(word)).length;
        return (bMatchingWords / bWordCount) - (aMatchingWords / aWordCount); 
      });

      return { sender: "bot", text: sortedMatches[0].answer }; 
    }

    // Default response if no match found
    return { sender: "bot", text: "I'm here to help! Could you please provide more details?" };
  };

  return (
    <div className="chatbot-container">
      <h1>Chat with Our Doctor</h1>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for the Enter key
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;