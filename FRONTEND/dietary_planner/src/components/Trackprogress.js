import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";


const TrackProgress = () => {
  // Sample Data for Charts
  const nutrientData = [
    { name: "Carbs", value: 50 },
    { name: "Proteins", value: 30 },
    { name: "Fats", value: 20 },
  ];

  const activityData = [
    { name: "Mon", steps: 4000, calories: 200 },
    { name: "Tue", steps: 7000, calories: 350 },
    { name: "Wed", steps: 6000, calories: 300 },
    { name: "Thu", steps: 8000, calories: 400 },
    { name: "Fri", steps: 10000, calories: 450 },
    { name: "Sat", steps: 5000, calories: 250 },
    { name: "Sun", steps: 3000, calories: 150 },
  ];

  const radarData = [
    { subject: "Carbs", A: 50, fullMark: 100 },
    { subject: "Proteins", A: 30, fullMark: 100 },
    { subject: "Fats", A: 20, fullMark: 100 },
    { subject: "Vitamins", A: 80, fullMark: 100 },
    { subject: "Minerals", A: 70, fullMark: 100 },
  ];

  const bpData = [
    { name: "Mon", systolic: 120, diastolic: 80 },
    { name: "Tue", systolic: 125, diastolic: 85 },
    { name: "Wed", systolic: 130, diastolic: 90 },
    { name: "Thu", systolic: 118, diastolic: 78 },
    { name: "Fri", systolic: 122, diastolic: 82 },
    { name: "Sat", systolic: 128, diastolic: 86 },
    { name: "Sun", systolic: 120, diastolic: 80 },
  ];

  const sugarData = [
    { name: "Mon", sugarLevel: 110 },
    { name: "Tue", sugarLevel: 115 },
    { name: "Wed", sugarLevel: 120 },
    { name: "Thu", sugarLevel: 125 },
    { name: "Fri", sugarLevel: 130 },
    { name: "Sat", sugarLevel: 110 },
    { name: "Sun", sugarLevel: 108 },
  ];

  const COLORS = ["#ff6384", "#36a2eb", "#ffce56"];

  return (
    <div className="track-progress-container">
      {/* Header */}
      <header className="header">
        <h1>Welcome to MealMate</h1>
        <p>Plan your meals, track your health, and stay fit!</p>
      </header>

      {/* Dashboard Layout */}
      <div className="dashboard-layout">
        {/* Pie Chart */}
        <div className="card">
          <h3>Nutrient Breakdown</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={nutrientData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {nutrientData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="card">
          <h3>Steps Over the Week</h3>
          <LineChart width={300} height={200} data={activityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#21865C" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3>Calories Burned</h3>
          <BarChart width={300} height={200} data={activityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#ffce56" />
          </BarChart>
        </div>

        {/* Blood Pressure Chart */}
        <div className="card">
          <h3>Blood Pressure (Systolic & Diastolic)</h3>
          <LineChart width={300} height={200} data={bpData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="systolic" stroke="#ff6384" />
            <Line type="monotone" dataKey="diastolic" stroke="#36a2eb" />
          </LineChart>
        </div>

        {/* Blood Sugar Chart */}
        <div className="card">
          <h3>Blood Sugar Level</h3>
          <LineChart width={300} height={200} data={sugarData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sugarLevel" stroke="#ffce56" />
          </LineChart>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <h3>Nutrition Radar</h3>
          <RadarChart cx={150} cy={125} outerRadius={80} width={300} height={250} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar name="Nutrition" dataKey="A" stroke="#21865C" fill="#21865C" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>
      </div>

      
    </div>
  );
};

export default TrackProgress;
