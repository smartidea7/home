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
    Categories
==================================================*/

const productCategories=[

{
id:"consumables",
title:"تجهیزات پزشکی مصرفی",
en:"Medical Consumables",
icon:"icon-consumables",
folder:"consumables",
count:3
},

{
id:"hospital",
title:"ترالی و تجهیزات هتلینگ بیمارستانی",
en:"Hospital Equipment",
icon:"icon-hospital",
folder:"hospital",
count:2
},

{
id:"gas",
title:"کنسول و تجهیزات گازهای طبی",
en:"Medical Gas Systems",
icon:"icon-gas",
folder:"gas",
count:2
},

{
id:"lead",
title:"سرب و تجهیزات حفاظتی",
en:"Lead Shielding Materials",
icon:"icon-lead",
folder:"lead",
count:2
},

{
id:"special",
title:"سایر کالاهای تخصصی",
en:"Specialized Products",
icon:"icon-special",
folder:"special",
count:0
}

];


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
