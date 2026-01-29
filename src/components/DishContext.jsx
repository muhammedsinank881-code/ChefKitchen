import { createContext, useContext, useEffect, useState } from "react";
import noodle from '../assets/mainPage/noodle.svg'
import images from '../assets/mainPage/images.svg'
import fryedRice from '../assets/mainPage/fried-rice.svg'
import img10 from '../assets/mainPage/img10.svg'
import noodleWithOmlet from '../assets/mainPage/noodle-with-omlet.svg'

const DishesContext = createContext();

export const DishesProvider = ({ children }) => {

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "today" },
      { id: 2, name: "special" },
      { id: 3, name: "south" },
    ];
  });

  // Save categories
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem("dishes");

    const defaultDishes = [
      { id: 1, name: 'Healthy noodle with spinach leaf', img: noodle, price: { S: 12, M: 15, L: 18 }, bowls: 22, categories: ["today", "special"] },
      { id: 2, name: 'Hot spicy fried rice with omelet', img: images, price: { S: 12, M: 15, L: 18 }, bowls: 13, categories: ['today', 'south'] },
      { id: 3, name: 'Spicy noodle with special omelette', img: fryedRice, price: { S: 12, M: 15, L: 18 }, bowls: 17, categories: ['today'] },
      { id: 4, name: 'Healthy noodle with spinach leaf', img: img10, price: { S: 22, M: 25, L: 28 }, bowls: 22, categories: ['today', 'special'] },
      { id: 5, name: 'Hot spicy fried rice with omelet', img: noodleWithOmlet, price: { S: 22, M: 25, L: 28 }, bowls: 13, categories: ['today', 'special'] },
      { id: 6, name: 'Spicy noodle with special omelette', img: noodle, price: { S: 22, M: 25, L: 28 }, bowls: 17, categories: ['special', 'today'] },
      { id: 7, name: 'Spicy seasoned seafood noodles', img: images, price: { S: 22, M: 25, L: 28 }, bowls: 20, categories: ['today', 'special'] },
      { id: 8, name: 'Salted pasta with mushroom sauce', img: fryedRice, price: { S: 22, M: 25, L: 28 }, bowls: 11, categories: ['today'] },
      { id: 9, name: 'Beef dumpling in hot and sour soup', img: img10, price: { S: 22, M: 25, L: 28 }, bowls: 16, categories: ['south', 'today'] },
    ];
    const data = saved ? JSON.parse(saved) : defaultDishes;

    // Auto-migrate if old dishes exist
    return data.map(d => {
      if (Array.isArray(d.categoryIds)) return d;

      const mappedIds = (d.categories || []).map(catName => {
        const match = categories.find(
          c => c.name.toLowerCase() === catName.toLowerCase()
        );
        return match ? match.id : null;
      }).filter(Boolean);

      return {
        ...d,
        categoryIds: mappedIds,
      };
    });
  });

  // Save dishes
  useEffect(() => {
    localStorage.setItem("dishes", JSON.stringify(dishes));
  }, [dishes, categories]);


  const addDish = (dish) =>
    setDishes(prev => [...prev, dish]);

  const updateDish = (id, updated) =>
    setDishes(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updated } : d))
    );

  const deleteDish = (id) =>
    setDishes(prev => prev.filter(d => d.id !== id));

  // ----------------------------------------------------
  // CRUD — CATEGORIES
  // ----------------------------------------------------
  const addCategory = (name) => {
    // prevent duplicates
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase()))
      return alert("Category already exists!");

    const newCat = { id: Date.now(), name };

    setCategories(prev => [...prev, newCat]);
  };

  const editCategory = (id, newName) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, name: newName } : c))
    );
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));

    // Remove category from all dishes
    setDishes(prev =>
      prev.map(d => ({
        ...d,
        categoryIds: (d.categoryIds || []).filter(cid => cid !== id)
      }))
    );
  };

  return (
    <DishesContext.Provider
      value={{
        dishes,
        addDish,
        updateDish,
        deleteDish,

        categories,
        addCategory,
        editCategory,
        deleteCategory,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
};

export const useDishes = () => useContext(DishesContext);
