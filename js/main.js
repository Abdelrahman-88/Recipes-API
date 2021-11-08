"use strict"

let recipes = [];
let row = document.querySelector(".row");
let recipeDetails;
let modalBody = document.querySelector(".modal-body");

$(".navbar a").click(function (e) {
    let navHref = $(e.target).attr("href");
    let offcet = $(navHref).offset().top;
    $("html,body").animate({ scrollTop: offcet }, 1500);
});


$("#loading").ready(function () {
    $(".sk-circle").fadeOut(500, function () {
        $("#loading").fadeOut(500, function () {
            $("body").removeClass("overflow-hidden");
            $("body").addClass("overflow-auto");
            $("#loading").remove();
        });
    });
});

$(".btn-danger,.btn-close").click(function () {
    $("body").removeClass("overflow-hidden");
    $("body").addClass("overflow-auto");
});

function addOverflow() {
    $("body").removeClass("overflow-auto");
    $("body").addClass("overflow-hidden");
}

$(".nav-link").click(function (e) {
    $(".nav-link").removeClass("active");
    $(e.target).addClass("active");
})

$(".nav-item").click(function (e) {
    let recipe = e.target.text;
    getrecipes(recipe);
})

async function getrecipes(recipe = "pizza") {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
    let recipesDetails = await response.json();
    recipes = recipesDetails.recipes;
    if (response.status == 200) {
        displayrecipes();
    }
}
getrecipes();

function displayrecipes() {
    let cols = ``;
    for (let i = 0; i < recipes.length; i++) {
        cols += `
    <div class="col-xl-3 col-lg-4 col-md-6 content">
     <div class="recipe text-center my-3">
     <a onclick="getrecipe(\`${recipes[i].recipe_id}\`),addOverflow()" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="details mx-1" href="">
     <img class="w-100 recipe" src="${recipes[i].image_url}" alt="${recipes[i].title}"></a>
        <p class="mt-2 title" >
        <a target="_blank" class="mx-1 source" href="${recipes[i].source_url}"><i class="fas fa-link"></i></a>
        ${recipes[i].title}</p>
        
        

     </div>
    </div>`
    }
    row.innerHTML = cols;

}

async function getrecipe(id) {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await response.json();
    if (response.status == 200) {
        getIngredients();
        displayrecipe();
    }
}
let lis = "";
function getIngredients() {

    for (let i = 0; i < recipeDetails.recipe.ingredients.length; i++) {
        lis += `<li>${recipeDetails.recipe.ingredients[i]}</li>`
    }
}

function displayrecipe() {
    let divs = `<div>
    <img class="w-100" src="${recipeDetails.recipe.image_url}" alt="${recipeDetails.recipe.title}">
    <h4 class="my-3">${recipeDetails.recipe.title}</h4>
    <ul class="fw-bolder">${lis}</ul>
  </div>`;
    modalBody.innerHTML = divs;
    lis = ""
}
