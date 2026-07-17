<script>

/*==================================================
    Fade Animation
==================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});




/*==================================================
    Build Products
==================================================*/

const container=document.getElementById("productsContainer");

productCategories.forEach(cat=>{

let html=`

<section class="product-section fade" id="${cat.id}">

<div class="section-title">

<div class="section-line"></div>

<div class="section-info">

<h2>${cat.title}</h2>

<span>${cat.en}</span>

</div>

<svg class="icon">

<use href="images/icons.svg#${cat.icon}"></use>

</svg>

</div>

<div class="product-grid">

`;

for(let i=1;i<=cat.count;i++){

const file=String(i).padStart(3,"0");

html+=`

<a class="product-card gallery-link"

href="images/originals/${cat.folder}/${file}.jpg"

data-index="${i-1}"

data-folder="${cat.folder}">

<img

loading="lazy"

decoding="async"

src="images/originals/${cat.folder}/${file}.jpg"

alt="${cat.title}">

</a>

`;

}

html+=`

</div>

</section>

`;

container.insertAdjacentHTML("beforeend",html);

});


/*==================================================
    Fade Observer
==================================================*/

document
.querySelectorAll(".fade")
.forEach(item=>observer.observe(item));


/*==================================================
    Scroll Spy
==================================================*/

const sections=document.querySelectorAll(".product-section");

const navItems=document.querySelectorAll(".cat-item");

const sectionObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

navItems.forEach(item=>item.classList.remove("active"));

document
.querySelector(`.cat-item[data-target="${entry.target.id}"]`)
?.classList.add("active");

});

},{
rootMargin:"-90px 0px -50% 0px",
threshold:.25
});

sections.forEach(section=>{

sectionObserver.observe(section);

});


/*==================================================
    Equal Width Navigation
==================================================*/

navItems.forEach(item=>{

item.style.flex="1";

});

</script>
