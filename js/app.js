console.log('connect Meal db');

const mealDb = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDBData(data.meals))
}

const displayMealDBData = (datas) =>{
    console.log(datas);
    const divContainer = document.getElementById('div-container');
    divContainer.innerHTML = ``;
    datas.forEach(data => {
        // console.log(data.strMeal);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =`
        <div" onclick="displayDetails(${data.idMeal})" class="card h-100">
           <img src="${data.strMealThumb}" class="card-img-top" alt="Image">
           <div class="card-body">
             <h5 class="card-title">${data.strMeal}</h5>
             <p class="card-text">${data.strInstructions.slice(0, 200)}</p>
           </div>
           <div class="card-footer border-0">
            <small class="text-body-secondary"></small>
           </div>
        </div>
        `;
        divContainer.appendChild(div)
    });
}
let searchFood = () =>{
  const inputFood = document.getElementById('input-food')
  const foods = inputFood.value
  console.log('search food', foods);
  mealDb(foods)
  inputFood.value = '';
}


const displayDetails = (idMeal) =>{
  console.log('clicked display details', idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = ( meal ) =>{
  console.log(meal);
  const modalDiv = document.getElementById('modal');
  modalDiv.innerHTML ='';
  const div = document.createElement('div');
  // div.classList.add('modal-content')
  div.innerHTML =`
  <div class="card mb-3" style="width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
  `;
  modalDiv.appendChild(div);
}
mealDb('');