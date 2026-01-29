import { createContext, useContext, useEffect, useState } from "react";

const DishesContext = createContext();

export const DishesProvider = ({ children }) => {
  // ----------------------------------------------------
  // LOAD CATEGORIES
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // LOAD DISHES + AUTO-MIGRATE old dishes
  // ----------------------------------------------------
  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem("dishes");
    const data = saved ? JSON.parse(saved) : [];

    // Auto-migrate if old dishes exist
    return data.map(d => {
      // If already using categoryIds → nothing to migrate
      if (Array.isArray(d.categoryIds)) return d;

      // Old: d.categories = ["south", "today"]
      // New: need IDs
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

  // ----------------------------------------------------
  // CRUD — DISHES
  // ----------------------------------------------------
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
