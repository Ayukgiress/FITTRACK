import React, { useState } from 'react';
import { toast } from 'sonner';
import { API_URL } from '../../constants';
import { useAuth } from '../Pages/AuthContext';

const API_NINJAS_API_KEY = 'i5ORPhMoNonDHKhIgeMqDg==JsqKQFZNTkyT7lNO';
const API_NINJAS_NUTRITION_URL = 'https://api.api-ninjas.com/v1/nutrition';

const MealsCalculatorModal = ({ isOpen, onClose, onMealSaved }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [foodQuery, setFoodQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchNutritionData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_NINJAS_NUTRITION_URL}?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_NINJAS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data');
      }

      const data = await response.json();
      console.log('Raw API Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      toast.error('Failed to fetch nutrition data. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addFoodItem = async () => {
    if (!foodQuery.trim()) {
      toast.error('Please enter a food description');
      return;
    }

    const nutritionData = await fetchNutritionData(foodQuery);
    console.log('API Response:', nutritionData); // Debug log

    if (nutritionData && Array.isArray(nutritionData) && nutritionData.length > 0) {
      // Log the first item to see its structure
      console.log('First item structure:', nutritionData[0]);
      
      // API-Ninjas returns an array, sum all items
      const totalNutrition = nutritionData.reduce((acc, item) => {
        console.log('Processing item:', item);
        
        // Parse values as floats and ensure they're numbers
        const calories = parseFloat(item.calories) || 0;
        const protein = parseFloat(item.protein_g) || 0;
        const carbs = parseFloat(item.carbohydrates_total_g) || 0;
        const fats = parseFloat(item.fat_total_g) || 0;
        
        console.log('Parsed values:', { calories, protein, carbs, fats });
        
        return {
          calories: acc.calories + calories,
          protein: acc.protein + protein,
          carbs: acc.carbs + carbs,
          fats: acc.fats + fats,
        };
      }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

      console.log('Total nutrition calculated:', totalNutrition);

      // Round to 1 decimal place for better accuracy
      const newItem = {
        name: foodQuery,
        calories: Math.round(totalNutrition.calories * 10) / 10,
        protein: Math.round(totalNutrition.protein * 10) / 10,
        carbs: Math.round(totalNutrition.carbs * 10) / 10,
        fats: Math.round(totalNutrition.fats * 10) / 10,
        quantity: 1,
      };
      
      console.log('New item to add:', newItem);
      
      setFoodItems([...foodItems, newItem]);
      setFoodQuery('');
      toast.success(`Added ${foodQuery}`);
    } else {
      console.log('No valid nutrition data found');
      toast.error('No nutrition data found for this food');
    }
  };

  const updateFoodItem = (index, field, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index][field] = value;
    setFoodItems(updatedItems);
  };

  const removeFoodItem = (index) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const calculateTotalCalories = () => {
    const total = foodItems.reduce((sum, item) => {
      const itemCalories = (parseFloat(item.calories) || 0) * (parseFloat(item.quantity) || 1);
      return sum + itemCalories;
    }, 0);
    return Math.round(total * 10) / 10;
  };

  const handleSaveMeal = async () => {
    if (!mealName.trim()) {
      toast.error('Please enter a meal name');
      return;
    }

    if (foodItems.length === 0) {
      toast.error('Please add at least one food item');
      return;
    }

    if (!currentUser) {
      toast.error('Please log in to save meals');
      return;
    }

    const totalCalories = calculateTotalCalories();
    const mealData = {
      name: mealName,
      type: mealType,
      items: foodItems,
      totalCalories,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }

      const response = await fetch(`${API_URL}/api/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...mealData,
          userId: currentUser._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save meal: ${response.status}`);
      }

      const savedMeal = await response.json();
      console.log('Meal saved successfully:', savedMeal);

      toast.success(`Meal "${mealName}" saved with ${totalCalories} calories!`);

      if (onMealSaved) {
        onMealSaved(mealData);
      }

      // Reset form
      setMealName('');
      setMealType('breakfast');
      setFoodItems([]);
      setFoodQuery('');
      onClose();
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error('Failed to save meal. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Meals Calories Calculator</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Meal Name
            </label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., Breakfast, Lunch..."
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Add Food Item
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="e.g., 1 apple, 2 eggs, 100g chicken..."
                value={foodQuery}
                onChange={(e) => setFoodQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && addFoodItem()}
                className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                onClick={addFoodItem}
                disabled={loading || !foodQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {loading ? '...' : 'Add'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Meal Items ({foodItems.length})
            </label>
            {foodItems.length === 0 ? (
              <p className="text-gray-400 text-sm">No items added yet</p>
            ) : (
              foodItems.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3 mb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <div className="text-gray-300 text-sm">
                        {item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fats}g
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="Qty"
                        value={item.quantity || ''}
                        onChange={(e) => updateFoodItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                        className="w-16 bg-gray-600 text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeFoodItem(index)}
                        className="text-red-400 hover:text-red-300 text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Total Calories:</span>
              <span className="text-yellow-400 font-bold text-xl">
                {calculateTotalCalories()} kcal
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveMeal}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Save Meal
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsCalculatorModal;