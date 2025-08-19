async function fetchData(recipe) {
  try{
      
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    let response = await fetch(url);
    let data = await response.json();
    let meal = data.meals[0]
    console.log(meal);
    let totalIngredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal['strIngredient' + i];
      const measure = meal['strMeasure' + i];

      // Only add if ingredient is valid (not null or empty string)
      if (ingredient && ingredient.trim() !== '') {
        totalIngredients.push({
          ing: ingredient.trim(),
          meas: measure ? measure.trim() : ''
        });
      }
    }
    document.querySelector('.down').style.display = 'flex';
    document.querySelector('.up').style.display = 'flex';
    document.querySelector('.not-found').style.display = 'none';
    console.log(totalIngredients);
    updateHTML(meal,totalIngredients);
  }catch(error){
    document.querySelector('.up').style.display = 'none';
    document.querySelector('.down').style.display = 'none';
    document.querySelector('.not-found').style.display = 'block';
  }
}

function updateHTML(meal,total){
  document.querySelector('.dish-img').src = meal.strMealThumb;
  document.querySelector('.name').textContent = meal.strMeal;
  document.querySelector('.country').textContent = `(${meal.strArea})`;
  document.querySelector('.recipe-text').innerHTML = meal.strInstructions;
  let html = '';
  total.forEach((t)=>{
    html += `
    <div class="ingredient">
      <div>${t.ing}</div>
      <p>${t.meas}</p>
    </div>
    `
  });
  document.querySelector('.ingredients').innerHTML = html;
}
const inputElement = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click',()=>{
  let inputValue = inputElement.value;
  if(inputValue.length!=0){
    fetchData(inputValue);
  }
});
document.querySelector('body').addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
    searchBtn.click();
  }
})
fetchData('biryani');