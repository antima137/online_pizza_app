import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuildPizza.css';
import { useCart } from './CartContext';
function BuildPizza() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients data:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIngredients((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };
      const newTotalCost = Object.keys(newSelected)
        .filter((key) => newSelected[key])
        .reduce((total, key) => total + ingredients.find(ing => ing.id === parseInt(key)).price, 0);
      setTotalCost(newTotalCost);
      return newSelected;
    });
  };
  const handleBuildPizza = () => {
    const selectedItems = ingredients.filter(ing => selectedIngredients[ing.id]);
    if (selectedItems.length === 0) {
      alert("Please select at least one ingredient to build your pizza.");
      return;
    }
    selectedItems.forEach(item => {
      const itemToAdd = {
        id: item.id,
        name: item.tname, 
        price: item.price, 
        image: item.image,
        quantity: 1, 
      };
      addToCart(itemToAdd); 
    });

    alert(`You have built your pizza with a total cost of ₹${totalCost}`);
    setSelectedIngredients({});
    setTotalCost(0); 
  };

  return (
    <div className="build-pizza-container">
      <table className="ingredients-table">
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>
                <img src={ingredient.image} alt={ingredient.tname} className="ingredient-image" />
              </td>
              <td className="ingredient-info">
                <h4>{ingredient.tname}</h4>
                <p>₹{ingredient.price}</p>
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedIngredients[ingredient.id]}
                    onChange={() => handleCheckboxChange(ingredient.id)}
                  />
                  Add
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Cost: ₹{totalCost}</h3>
      <button className="build-pizza-button" onClick={handleBuildPizza}>Build Your Pizza</button>
    </div>
  );
}

export default BuildPizza;
