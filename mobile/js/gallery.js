/*==================================================
    Smart Idea
    Gallery Engine
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*==================================================
    Detect Page
==================================================*/


const pageType =
document.body.dataset.gallery;


if(!pageType) return;



const container =
document.getElementById(
pageType==="products"
?
"productsContainer"
:
"projectsContainer"
);


const menu =
document.querySelector(".category-nav");



if(!container || !menu) return;



const data =
galleryConfig[pageType];



if(!data) return;



const categories =
data.categories;



const basePath =
data.path;



/*==================================================
    Build Category Menu
==================================================*/


function buildMenu(){


let html="";


categories.forEach((cat,index)=>{


html += `


<a

href="#${cat.id}"

class="cat-item ${index===0?"active":""}"

data-target="${cat.id}"


>


<div class="cat-icon">


<svg class="cat-svg">

<use href="images/icons.svg#${cat.icon}"></use>

</svg>


</div>


<span>

${cat.menu}

</span>


</a>


`;



});


menu.innerHTML=html;


}




buildMenu();




/*==================================================
    Build Gallery
==================================================*/


function buildGallery(){



let html="";



categories.forEach(cat=>{


if(cat.count===0) return;



html += `


<section

class="product-section gallery-section fade"

id="${cat.id}"

>


<div class="section-title">


<div class="section-line"></div>



<div class="section-info">


<h2>

${cat.title}

</h2>


<span>

${cat.en}

</span>


<p class="section-description">

${cat.description || ""}

</p>


</div>



<svg class="icon">


<use href="images/icons.svg#${cat.icon}"></use>


</svg>


</div>



<div class="product-grid">


`;



for(
let i=1;
i<=cat.count;
i++
){


const file =
String(i).padStart(3,"0")+".jpg";



const hidden =
i>9
?
"hidden-image"
:
"";



const caption =
cat.captions?.[file]
||
cat.title;



html += `



<a

class="product-card gallery-link ${hidden}"

href="${basePath}${cat.folder}/${file}"


data-folder="${cat.folder}"

data-index="${i-1}"

data-caption="${caption}"

>


<img


src="${basePath}${cat.folder}/${file}"

alt="${caption}"

loading="lazy"

decoding="async"


>


</a>



`;

}



html += `


</div>


${cat.count>9?


`

<button

class="show-more"

data-target="${cat.id}"

>

+ نمایش همه تصاویر

</button>


`
:""}



</section>



`;



});



container.innerHTML=html;


}



buildGallery();




/*==================================================
    Show More Button
==================================================*/


document.addEventListener(
"click",
e=>{


if(
!e.target.classList.contains("show-more")
)
return;



const id =
e.target.dataset.target;



const section =
document.getElementById(id);



const hidden =
section.querySelectorAll(
".hidden-image"
);



hidden.forEach(img=>{

img.classList.toggle("show-image");

});



e.target.classList.toggle("open");



e.target.textContent =
e.target.classList.contains("open")
?
"- بستن تصاویر"
:
"+ نمایش همه تصاویر";



});




/*==================================================
    Fade Animation
==================================================*/


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}


});


},
{
threshold:.15
}
);



document
.querySelectorAll(".fade")
.forEach(el=>
observer.observe(el)
);




/*==================================================
    Scroll Spy
==================================================*/


const sections =
document.querySelectorAll(
".gallery-section"
);


const navItems =
document.querySelectorAll(
".cat-item"
);



function updateActiveMenu(){


const scrollPos =
window.scrollY + 150;



let current =
sections[0]?.id;



sections.forEach(section=>{


if(
scrollPos >= section.offsetTop
){

current=section.id;

}


});



navItems.forEach(item=>{


item.classList.toggle(

"active",

item.dataset.target===current

);


});



}



window.addEventListener(
"scroll",
updateActiveMenu
);



updateActiveMenu();



});

/*==================================================
    Build Category Menu
==================================================*/

function buildMenu(){

let html="";

categories.forEach((cat,index)=>{

html+=`

<a
href="#${cat.id}"
class="cat-item ${index===0?"active":""}"
data-target="${cat.id}">

<div class="cat-icon">

<svg class="cat-svg">
<use href="images/icons.svg#${cat.icon}"></use>
</svg>

</div>

<span>${cat.menu}</span>

</a>

`;

});

menu.innerHTML=html;

}

buildMenu();

/*==================================================
    Build Gallery
==================================================*/

function buildGallery(){

let html="";

categories.forEach(cat=>{

if(cat.count<=0)return;

html+=`

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

`;

for(let i=1;i<=cat.count;i++){

const file=
String(i).padStart(3,"0")+".jpg";

const hidden=i>9?"hidden-image":"";

const caption=
cat.captions[file]||cat.title;

html+=`

<a
class="product-card gallery-link ${hidden}"

href="${basePath}${cat.folder}/${file}"

data-folder="${cat.folder}"

data-index="${i-1}"

data-caption="${caption}">

<img

loading="lazy"

decoding="async"

src="${basePath}${cat.folder}/${file}"

alt="${caption}">

</a>

`;

}

html+=`

</div>

${cat.count>9?

`

<button
class="show-more"
data-target="${cat.id}">

نمایش بیشتر

</button>

`

:""}

</section>

`;

});

container.innerHTML=html;

}

buildGallery();

/*==================================================
    Show More
==================================================*/

document.addEventListener("click",e=>{

const btn=e.target.closest(".show-more");

if(!btn)return;

const section=document.getElementById(btn.dataset.target);

if(!section)return;

const images=section.querySelectorAll(".hidden-image");

const opened=btn.classList.toggle("open");

images.forEach(img=>{

img.classList.toggle("show-image",opened);

});

btn.textContent=opened
?
"بستن تصاویر"
:
"نمایش بیشتر";

});

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
active.offsetLeft
-
(menu.clientWidth/2)
+
(active.clientWidth/2);

menu.scrollTo({

left,

behavior:"smooth"

});

}

/*==================================================
    Category Menu Click
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
    Horizontal Wheel Scroll
==================================================*/

menu.addEventListener("wheel",e=>{

if(Math.abs(e.deltaY)<=Math.abs(e.deltaX)) return;

e.preventDefault();

menu.scrollLeft+=e.deltaY;

},{
passive:false
});

/*==================================================
    Touch Swipe Menu
==================================================*/

let startX=0;
let scrollStart=0;

menu.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;
scrollStart=menu.scrollLeft;

},{
passive:true
});

menu.addEventListener("touchmove",e=>{

const x=e.touches[0].clientX;

menu.scrollLeft=
scrollStart-(x-startX);

},{
passive:true
});

/*==================================================
    Keyboard Navigation
==================================================*/

document.addEventListener("keydown",e=>{

if(e.key!=="ArrowLeft" && e.key!=="ArrowRight") return;

const activeIndex=navItems.findIndex(item=>
item.classList.contains("active")
);

if(activeIndex===-1) return;

let nextIndex=activeIndex;

if(e.key==="ArrowRight"){
nextIndex=Math.min(activeIndex+1,navItems.length-1);
}

if(e.key==="ArrowLeft"){
nextIndex=Math.max(activeIndex-1,0);
}

const nextItem=navItems[nextIndex];

if(!nextItem) return;

nextItem.click();

});

/*==================================================
    Init
==================================================*/

window.addEventListener("load",()=>{

updateActiveMenu();

});

});

