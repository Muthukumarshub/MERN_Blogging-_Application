import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-filter">
            <button 
                className={!selectedCategory ? 'active' : ''} 
                onClick={() => onCategoryChange(null)}
            >
                All
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;