const container =
document.getElementById("projectsContainer");


projectCategories.forEach(cat=>{


let html = `

<section class="product-section fade"
id="${cat.id}">


<div class="section-title">


<div class="section-line"></div>


<div class="section-info">

<h2>${cat.title}</h2>

<span>${cat.en}</span>

</div>


<svg class="icon">

<use href="images/icons.svg#${cat.icon}">
</use>

</svg>


</div>


<div class="product-grid">

`;


for(let i=1;i<=cat.count;i++){


let file =
String(i).padStart(3,"0");


html += `


<a class="product-card gallery-link"

href="images/projects/${cat.folder}/${file}.jpg"

data-folder="${cat.folder}">


<img

loading="lazy"

decoding="async"

src="images/projects/${cat.folder}/${file}.jpg"

alt="${cat.title}">


</a>


`;


}



html += `

</div>

</section>

`;


container.insertAdjacentHTML(
"beforeend",
html
);


});





/* Fade */

const observer =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting)

entry.target.classList.add("show");


});


},{
threshold:.15
});



document
.querySelectorAll(".fade")
.forEach(el=>
observer.observe(el)
);




/* Scroll Spy */


const sections =
document.querySelectorAll(".product-section");


const navItems =
document.querySelectorAll(".cat-item");



const sectionObserver =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(!entry.isIntersecting)
return;


navItems.forEach(item=>
item.classList.remove("active")
);


document
.querySelector(
`.cat-item[data-target="${entry.target.id}"]`
)
?.classList.add("active");


});


},{
rootMargin:"-90px 0px -50% 0px"
});



sections.forEach(section=>
sectionObserver.observe(section)
);