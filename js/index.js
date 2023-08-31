// Define UI variables
const categoryContainer = document.getElementById('category-container');
const loadCategories = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const trimedData = data.data;

    // loop through all the categories and show them in the UI
    trimedData.forEach((category)=>{
        const categoryId = category.category_id;
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn">${category.category}</button>
        `;
        categoryContainer.appendChild(div);

    })
}

// load Categoriee function
loadCategories();