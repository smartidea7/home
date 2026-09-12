/*==================================================
    Smart Idea Gallery Engine v3
    Optimized
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


const page = document.body.dataset.gallery;


/* اگر صفحه گالری نیست */
if(!page && !document.body.dataset.galleryAssets)
    return;



/*==================================================
    Desktop Mode
==================================================*/

if(page==="desktop"){

    buildDesktopGallery();

    return;

}



/*==================================================
    Mobile Gallery
==================================================*/


const config = galleryConfig[page];

if(!config)
    return;



const container =
document.getElementById(
    page==="products"
    ?
    "productsContainer"
    :
    "projectsContainer"
);


const menu =
document.querySelector(".category-nav");


if(!container || !menu)
    return;



const categories =
config.categories;



const thumbPath =
config.thumbpath;



const imagePath =
config.imagepath;





/*==================================================
    Build Menu
==================================================*/


function buildMenu(){


menu.innerHTML =
categories.map((cat,index)=>{


return `

<a href="#${cat.id}"
class="cat-item ${index===0?"active":""}"
data-target="${cat.id}">


<div class="cat-icon">

<svg class="cat-svg">

<use href="images/icons.svg#${cat.icon}">
</use>

</svg>

</div>


<span>
${cat.menu}
</span>


</a>

`;


}).join("");

}




/*==================================================
    Build Gallery
==================================================*/


function buildGallery(){


container.innerHTML =


categories.map(cat=>{


if(cat.count===0)
return "";



let cards="";



for(let i=1;i<=cat.count;i++){



const file =
String(i).padStart(3,"0")
+".webp";



const hidden =
i>9
?
" hidden-image"
:
"";



const caption =
cat.captions?.[i-1]
||
cat.title;



cards += `


<a

class="product-card gallery-link${hidden}"

href="${imagePath}${cat.folder}/${file}"


data-folder="${cat.folder}"

data-index="${i-1}"


data-caption="${caption}"

>



<img

loading="lazy"

decoding="async"

src="${thumbPath}${cat.folder}/${file}"

alt="${caption}"

draggable="false"

>


</a>


`;



}




return `



<section

class="product-section fade"

id="${cat.id}">


<div class="section-title">


<div class="section-line"></div>



<div class="section-info">


<h2>
${cat.title}
</h2>


<span>
${cat.en}
</span>


</div>



<svg class="icon">


<use href="images/icons.svg#${cat.icon}">
</use>


</svg>


</div>




<p class="section-description">

${cat.description}

</p>





<div class="product-grid">

${cards}

</div>





${
cat.count>9
?

`

<button

class="show-more"

data-target="${cat.id}"

>

<span>
نمایش بیشتر
</span>


<span class="more-icon">
↓
</span>


</button>

`

:

""

}


</section>


`;



}).join("");

}



buildMenu();

buildGallery();



document.dispatchEvent(
new Event("galleryUpdated")
);


 
/*==================================================
    Fade Animation
==================================================*/


const observer =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


observer.unobserve(entry.target);


}


});


},{
threshold:.15
});



document
.querySelectorAll(".fade")
.forEach(el=>observer.observe(el));





/*==================================================
    Show More
==================================================*/


document.addEventListener("click",e=>{


const btn =
e.target.closest(".show-more");


if(!btn)
return;



const section =
document.getElementById(
btn.dataset.target
);



if(!section)
return;




const images =
section.querySelectorAll(
".hidden-image"
);



const opened =
btn.classList.toggle("open");



images.forEach((img,index)=>{


setTimeout(()=>{


img.classList.toggle(
"show-image",
opened
);



},index*40);



});




btn.querySelector("span")
.textContent =

opened
?
"بستن تصاویر"
:
"نمایش بیشتر";



});







/*==================================================
    Scroll Spy
==================================================*/


const sections =
[
...document.querySelectorAll(
".product-section"
)
];



const navItems =
[
...document.querySelectorAll(
".cat-item"
)
];




function updateActiveMenu(){



const scrollPos =
window.scrollY + 180;



let current =
sections[0]?.id;



const bottom =
window.innerHeight + window.scrollY
>=
document.documentElement.scrollHeight-10;



if(bottom){


current =
sections.at(-1)?.id;


}
else{


sections.forEach(section=>{


if(scrollPos >= section.offsetTop){

current =
section.id;

}


});


}




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
{
passive:true
}
);



updateActiveMenu();








/*==================================================
    Center Active Category
==================================================*/


function centerActiveItem(id){



const active =
menu.querySelector(
`[data-target="${id}"]`
);



if(!active)
return;



const left =
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
    Category Click
==================================================*/


menu.addEventListener("click",e=>{


const item =
e.target.closest(".cat-item");



if(!item)
return;



e.preventDefault();



const section =
document.getElementById(
item.dataset.target
);



if(!section)
return;



window.scrollTo({

top:
section.offsetTop-120,

behavior:"smooth"

});



});







/*==================================================
    Horizontal Wheel Scroll
==================================================*/


menu.addEventListener(
"wheel",
e=>{


if(
Math.abs(e.deltaY)
<=
Math.abs(e.deltaX)
)
return;



e.preventDefault();



menu.scrollLeft += e.deltaY;



},
{
passive:false
}
);






/*==================================================
    Touch Drag Menu
==================================================*/


let startX=0;

let startScroll=0;



menu.addEventListener(
"touchstart",
e=>{


startX =
e.touches[0].clientX;


startScroll =
menu.scrollLeft;


},
{
passive:true
}
);




menu.addEventListener(
"touchmove",
e=>{


const move =
e.touches[0].clientX;



menu.scrollLeft =
startScroll -
(move-startX);



},
{
passive:true
}
);






/*==================================================
    Keyboard Navigation
==================================================*/


document.addEventListener(
"keydown",
e=>{


if(
e.key!=="ArrowLeft"
&&
e.key!=="ArrowRight"
)
return;



const current =
navItems.findIndex(
item=>
item.classList.contains("active")
);



if(current<0)
return;



let next=current;



if(e.key==="ArrowRight")

next =
Math.min(
current+1,
navItems.length-1
);



if(e.key==="ArrowLeft")

next =
Math.max(
current-1,
0
);



navItems[next]?.click();



});







/*==================================================
    Image Protection
==================================================*/


document.addEventListener(
"contextmenu",
e=>{


if(
e.target.closest("img")
)

e.preventDefault();


}
);







/*==================================================
    Init
==================================================*/


window.addEventListener(
"load",
()=>{

updateActiveMenu();

}
);



/*==================================================
    DESKTOP GALLERY
==================================================*/


function buildDesktopGallery(){



const productsContainer =
document.getElementById(
"products-container"
);



const projectsContainer =
document.getElementById(
"projects-container"
);



if(
!productsContainer &&
!projectsContainer
)
return;





function renderCategories(
config,
container,
type
){



if(!container)
return;



const thumbPath =
config.thumbpath;



const imagePath =
config.imagepath;





container.innerHTML =


config.categories.map(cat=>{



if(cat.count===0)
return "";



let cards="";



for(
let i=1;
i<=cat.count;
i++
){



const file =
String(i).padStart(3,"0")
+
".webp";



const hidden =
i>4
?
" hidden"
:
"";



const caption =
cat.captions?.[i-1]
||
cat.title;





cards += `


<a

class="thumb gallery-link${hidden}"

href="${imagePath}${cat.folder}/${file}"

data-folder="${type}-${cat.folder}"

data-index="${i-1}"

data-caption="${caption}"

>


<img

loading="lazy"

decoding="async"

src="${thumbPath}${cat.folder}/${file}"

alt="${caption}"

draggable="false"

>


</a>


`;



}




return `


<section

class="category fade"

id="${cat.id}"

>



<div class="category-head">



<div class="category-info">



<div class="category-icon">


<svg class="icon">

<use href="images/icons.svg#${cat.icon}">
</use>

</svg>


</div>




<div>


<h3>

${cat.title}

</h3>



<p>

${cat.description}

</p>



</div>



</div>



</div>





<div

class="gallery"

id="gallery-${cat.id}"

>


${cards}


</div>





${
cat.count>4
?

`

<button

class="more-btn"

data-gallery="${cat.id}"

>

نمایش بیشتر +

</button>

`

:

""

}



</section>


`;




}).join("");







container
.querySelectorAll(".more-btn")
.forEach(btn=>{



btn.addEventListener(
"click",
()=>{



const id =
btn.dataset.gallery;



const gallery =
container.querySelector(
`#gallery-${id}`
);



if(!gallery)
return;




const hidden =
gallery.querySelectorAll(
".hidden"
);



const opened =
gallery.classList.toggle(
"expanded"
);





hidden.forEach(item=>{


item.classList.toggle(
"show",
opened
);



});




btn.textContent =

opened
?
"نمایش کمتر −"
:
"نمایش بیشتر +";




});



});



}





renderCategories(
galleryConfig.products,
productsContainer,
"products"
);



renderCategories(
galleryConfig.projects,
projectsContainer,
"projects"
);






/*==================================================
    Desktop Fade
==================================================*/


const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);



observer.unobserve(
entry.target
);



}


});


},
{
threshold:.12
}
);





document
.querySelectorAll(".fade")
.forEach(el=>
observer.observe(el)
);





document.dispatchEvent(
new Event("galleryUpdated")
);



}

    
                        
