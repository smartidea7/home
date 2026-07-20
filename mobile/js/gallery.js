/*==================================================
    Smart Idea Gallery Engine v2
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const page=document.body.dataset.gallery;

if(!page)return;

const config=galleryConfig[page];

if(!config)return;

const container=document.getElementById(
page==="products"
?
"productsContainer"
:
"projectsContainer"
);

const menu=document.querySelector(".category-nav");

if(!container||!menu)return;

const categories=config.categories;

const basePath=config.path;


/*==================================================
    Build Menu
==================================================*/

function buildMenu(){

menu.innerHTML=categories.map((cat,index)=>`

<a href="#${cat.id}"
class="cat-item ${index===0?"active":""}"
data-target="${cat.id}">

<div class="cat-icon">

<svg class="cat-svg">

<use href="images/icons.svg#${cat.icon}"></use>

</svg>

</div>

<span>${cat.menu}</span>

</a>

`).join("");

}


/*==================================================
    Build Gallery
==================================================*/

function buildGallery(){

container.innerHTML=categories.map(cat=>{

if(cat.count===0)return"";

let cards="";

for(let i=1;i<=cat.count;i++){

const file=String(i).padStart(3,"0")+".jpg";

const hidden=i>9?" hidden-image":"";

const caption=
cat.captions?.[i-1]
||
cat.title;

cards+=`

<a

class="product-card gallery-link${hidden}"

href="${basePath}${cat.folder}/${file}"

data-folder="${cat.folder}"

data-index="${i-1}"

data-caption="${caption}">

<img

loading="lazy"

decoding="async"

src="${basePath}${cat.folder}/${file}"

alt="${caption}"

draggable="false">

</a>

`;

}

                                   return`

<section
class="product-section fade"
id="${cat.id}">

<div class="section-title">

<div class="section-line"></div>

<div class="section-info">

<h2>${cat.title}</h2>

<span>${cat.en}</span>

<p class="section-description">

${cat.description}

</p>

</div>

<svg class="icon">

<use href="images/icons.svg#${cat.icon}"></use>

</svg>

</div>

<div class="product-grid">

${cards}

</div>

${cat.count>9?`

<button
class="show-more"
data-target="${cat.id}">

<span>نمایش بیشتر</span>

<span class="more-icon">+</span>

</button>

`:""}

</section>

`;

}).join("");

}

buildMenu();

buildGallery();

                          /*==================================================
    Fade Animation
==================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document
.querySelectorAll(".fade")
.forEach(item=>observer.observe(item));

                          /*==================================================
    Show More
==================================================*/

document.addEventListener("click",e=>{

const btn=e.target.closest(".show-more");

if(!btn)return;

const section=document.getElementById(
btn.dataset.target
);

if(!section)return;

const hidden=
section.querySelectorAll(".hidden-image");

const opened=
btn.classList.toggle("open");

hidden.forEach(img=>{

img.classList.toggle(
"show-image",
opened
);

});

btn.querySelector("span").textContent=
opened
?
"بستن تصاویر"
:
"نمایش بیشتر";

});

                          /*==================================================
    Scroll Spy
==================================================*/

const sections=[
...document.querySelectorAll(".product-section")
];

const navItems=[
...document.querySelectorAll(".cat-item")
];

function updateActiveMenu(){

const scrollPos=window.scrollY+180;

let current=sections[0]?.id;

sections.forEach(section=>{

if(scrollPos>=section.offsetTop){

current=section.id;

}

});

navItems.forEach(item=>{

item.classList.toggle(
"active",
item.dataset.target===current
);

});

centerActiveItem(current);

}

window.addEventListener(
"scroll",
updateActiveMenu,
{passive:true}
);

updateActiveMenu();

                          /*==================================================
    Center Active Menu
==================================================*/

function centerActiveItem(id){

const active=menu.querySelector(
`[data-target="${id}"]`
);

if(!active)return;

const left=
active.offsetLeft-
(menu.clientWidth/2)+
(active.clientWidth/2);

menu.scrollTo({

left,

behavior:"smooth"

});

}

                          /*==================================================
    Menu Click
==================================================*/

menu.addEventListener("click",e=>{

const item=e.target.closest(".cat-item");

if(!item)return;

e.preventDefault();

const section=document.getElementById(
item.dataset.target
);

if(!section)return;

window.scrollTo({

top:section.offsetTop-120,

behavior:"smooth"

});

});

                          /*==================================================
    Horizontal Scroll
==================================================*/

menu.addEventListener("wheel",e=>{

if(Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;

e.preventDefault();

menu.scrollLeft+=e.deltaY;

},{
passive:false
});


/*==================================================
    Touch Drag
==================================================*/

let touchX=0;
let startScroll=0;

menu.addEventListener("touchstart",e=>{

touchX=e.touches[0].clientX;

startScroll=menu.scrollLeft;

},{
passive:true
});

menu.addEventListener("touchmove",e=>{

const move=e.touches[0].clientX;

menu.scrollLeft=
startScroll-(move-touchX);

},{
passive:true
});


/*==================================================
    Keyboard
==================================================*/

document.addEventListener("keydown",e=>{

if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;

const current=navItems.findIndex(item=>
item.classList.contains("active")
);

if(current===-1)return;

let next=current;

if(e.key==="ArrowRight")
next=Math.min(current+1,navItems.length-1);

if(e.key==="ArrowLeft")
next=Math.max(current-1,0);

navItems[next]?.click();

});


/*==================================================
    Init
==================================================*/

window.addEventListener("load",()=>{

updateActiveMenu();

});

});

