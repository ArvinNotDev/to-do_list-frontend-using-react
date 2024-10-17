import React, { useState, useEffect } from "react";


const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#fff5e6",
      borderRadius: "8px",
      maxWidth: "400px",
      margin: "auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      color: "#ff9800",
      fontSize: "24px",
      textAlign: "center",
      marginBottom: "20px",
    },
    categoryItem: {
      padding: "10px 15px",
      backgroundColor: "#ffcc80",
      border: "none",
      borderRadius: "5px",
      margin: "10px 0",
      cursor: "pointer",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
    },
    categoryItemHover: {
      backgroundColor: "#ff9800",
    },
  };

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/to-do-list/tasks/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Save category to local storage when clicked
  const handleCategoryClick = (category) => {
    localStorage.setItem("selectedCategory", category.name);
    window.location.href = "/to-do_list"
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Categories</h2>
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((category, index) => (
          <div
            key={category.id}
            style={{
              ...styles.categoryItem,
              ...(hoveredIndex === index ? styles.categoryItemHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
