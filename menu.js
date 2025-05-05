document.addEventListener('DOMContentLoaded', loadMenu);

function loadMenu() {
    const menuContainer = document.getElementById('menuContainer');
    const categoryTabs = document.getElementById('categoryTabs');
    const storedMenu = JSON.parse(localStorage.getItem('menuItems')) || [];

    menuContainer.innerHTML = '';
    categoryTabs.innerHTML = '';

    const categories = {};
    storedMenu.forEach(item => {
        const category = item.category || 'أخرى';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(item);
    });

    const categoryNames = Object.keys(categories);
    categoryNames.forEach(categoryName => {
        const button = document.createElement('button');
        button.textContent = categoryName;
        button.addEventListener('click', () => showCategory(categoryName));
        categoryTabs.appendChild(button);
    });

    function showCategory(selectedCategory) {
        menuContainer.innerHTML = '';

        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        grid.style.gap = '20px';

        categories[selectedCategory].forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.border = "1px solid #ddd";
            card.style.borderRadius = "12px";
            card.style.overflow = "hidden";
            card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            card.style.background = "#fff";
            card.style.transition = "transform 0.2s";

            card.onmouseover = () => card.style.transform = "scale(1.03)";
            card.onmouseout = () => card.style.transform = "scale(1)";

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 15px;">
                    <h3 style="margin: 0 0 10px;">${item.name}</h3>
                    <p style="margin: 0 0 10px; color: #555;">${item.description}</p>
                    <strong style="color: #E91E63;">${item.price.toFixed(2)} ريال</strong>
                </div>
            `;
            grid.appendChild(card);
        });

        menuContainer.appendChild(grid);
        triggerScrollAnimations();
    }

    if (categoryNames.length > 0) {
        showCategory(categoryNames[0]);
    }

    window.addEventListener('scroll', triggerScrollAnimations);
}

function triggerScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight - 100) &&
        rect.bottom >= 0
    );
}
