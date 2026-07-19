/* ===========================================
   Smart Idea Desktop
=========================================== */

const PRODUCTS = [

{
title:"تجهیزات پزشکی مصرفی",
desc:"تجهیزات مصرفی بیمارستانی و کلینیکی مطابق استانداردهای روز.",
folder:"../mobile/images/originals/consumables/",
link:"products.html#consumables",
icon:"icon-consumables",
count:46
},

{
title:"تجهیزات هتلینگ بیمارستانی",
desc:"ترالی‌ها و تجهیزات هتلینگ بیمارستانی.",
folder:"../mobile/images/originals/hospital/",
link:"products.html#hospital",
icon:"icon-hospital",
count:20
},

{
title:"گازهای طبی",
desc:"کنسول و تجهیزات گازهای پزشکی.",
folder:"../mobile/images/originals/gas/",
link:"products.html#gas",
icon:"icon-gas",
count:9
},

{
title:"سرب",
desc:"شمش سرب و رول سرب خلوص 99.99.",
folder:"../mobile/images/originals/lead/",
link:"products.html#lead",
icon:"icon-lead",
count:4
},

{
title:"محصولات تخصصی",
desc:"تجهیزات سفارشی پروژه‌های مهندسی.",
folder:"../mobile/images/originals/special/",
link:"products.html#special",
icon:"icon-special",
count:0
}

];

const PROJECTS=[

{

title:"دکوراسیون داخلی",

desc:"طراحی و اجرای پروژه‌های داخلی.",

folder:"../mobile/images/projects/interior/",

link:"projects.html#interior",

icon:"icon-interior",

count:18

},

{

title:"دکوراسیون اداری و فروشگاهی",

desc:"دکور دفتر و فضاهای اداری و تجاری",

folder:"../mobile/images/projects/office/",

link:"projects.html#office",

icon:"icon-office",

count:23

},

{

title:"دکوراسیون آشپزخانه",

desc:"طراحی و اجرای دکور آشپزخانه .",

folder:"../mobile/images/projects/kitchen/",

link:"projects.html#kitchen",

icon:"icon-kitchen",

count:26

},

{

title:"دکور نمایشگاهی",

desc:"نمایشگاه و غرفه سازی.",

folder:"../mobile/images/projects/exhibition/",

link:"projects.html#exhibition",

icon:"icon-exhibition",

count:10

},

{

title:"کلینیک سیار",

desc:"خودروهای تخصصی پزشکی.",

folder:"../mobile/images/projects/camper/",

link:"projects.html#camper",

icon:"icon-camper",

count:18

},

{

title:"سایر",

desc:"سایر پروژه ها.",

folder:"../mobile/images/projects/other/",

link:"projects.html#camper",

icon:"icon-other",

count:9

}

];


function buildGallery(data,target){

const container=document.getElementById(target);

data.forEach((item,index)=>{

let html=`

<section class="category fade">

<div class="category-head">

<div class="category-info">

<div class="category-icon">

<svg class="icon">

<use href="../mobile/images/icons.svg#${item.icon}"></use>

</svg>

</div>

<div>

<h3>${item.title}</h3>

<p>${item.desc}</p>

</div>

</div>

<button

class="more-btn"

data-gallery="${target}-${index}">

نمایش بیشتر +

</button>

</div>



<div

class="gallery"

id="${target}-${index}"

data-group="${target}-${index}">

`;



for(let i=1;i<=item.count;i++){

const file = String(i).padStart(3,'0');

html+=`

<div
class="thumb ${i>3?'hidden':''}"
data-src="${item.folder}${file}.jpg"
data-group="${target}-${index}">

<img
loading="lazy"
src="${item.folder}${file}.jpg"
alt="">

</div>

`;

}


html+=`

</div>

</section>

`;

container.insertAdjacentHTML(

"beforeend",

html

);

});

}






buildGallery(

PRODUCTS,

"products-container"

);



buildGallery(

PROJECTS,

"projects-container"

);





/*====================================================*/

document.addEventListener("click",e=>{

if(!e.target.classList.contains("more-btn"))

return;

const gallery=document.getElementById(

e.target.dataset.gallery

);

gallery

.querySelectorAll(".hidden")

.forEach(el=>{

el.classList.remove("hidden");

});

e.target.remove();

});


/*=====================================================
LIGHTBOX
=====================================================*/

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const counter=document.getElementById("counter");

const closeBtn=document.getElementById("closeBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");

let currentImages=[];
let currentIndex=0;

/* ---------- باز کردن ---------- */

document.addEventListener("click",function(e){

const thumb=e.target.closest(".thumb");

if(!thumb) return;

const group=thumb.dataset.group;

currentImages=[

...document.querySelectorAll(

'.thumb[data-group="'+group+'"]'

)

];

currentIndex=currentImages.indexOf(thumb);

openLightbox();

});

/* ---------- */

function openLightbox(){

lightbox.classList.add("active");

showImage();

}

/* ---------- */

function closeLightbox(){

lightbox.classList.remove("active");

}

/* ---------- */

function showImage(){

const img=currentImages[currentIndex];

lightboxImage.src=img.dataset.src;

counter.innerHTML=

(currentIndex+1)+" / "+currentImages.length;

/* preload */

preload(currentIndex-1);

preload(currentIndex+1);

}

/* ---------- */

function preload(i){

if(i<0) return;

if(i>=currentImages.length) return;

const image=new Image();

image.src=currentImages[i].dataset.src;

}

/* ---------- */

function nextImage(){

currentIndex++;

if(currentIndex>=currentImages.length)

currentIndex=0;

showImage();

}

/* ---------- */

function prevImage(){

currentIndex--;

if(currentIndex<0)

currentIndex=currentImages.length-1;

showImage();

}

/* ---------- */

if(nextBtn){
    nextBtn.onclick=nextImage;
}

if(prevBtn){
    prevBtn.onclick=prevImage;
}

if(closeBtn){
    closeBtn.onclick=closeLightbox;
}


/* ---------- */

if(lightbox){

lightbox.onclick=function(e){

if(e.target===lightbox)

closeLightbox();

};

}

/* ---------- Keyboard ---------- */

document.addEventListener("keydown",function(e){

if(!lightbox.classList.contains("active"))

return;

switch(e.key){

case"Escape":

closeLightbox();

break;

case"ArrowRight":

prevImage();

break;

case"ArrowLeft":

nextImage();

break;

}

});

/* ---------- Touch ---------- */

let startX=0;

lightbox.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});

if(lightbox){

lightbox.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});


lightbox.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;

let diff=startX-endX;

if(Math.abs(diff)<40) return;


if(diff>0)

nextImage();

else

prevImage();

});

}

/*=====================================================
CONTACT FORM (Google Sheet)
=====================================================*/



const form=document.getElementById("contactForm");

form.addEventListener("submit",async function(e){

e.preventDefault();

const btn=document.getElementById("sendBtn");
const status=document.getElementById("status");

btn.disabled=true;
btn.innerHTML="در حال ارسال...";

const mobile=document.getElementById("mobile").value.trim();
const message=document.getElementById("message").value.trim();

if(!/^09\d{9}$/.test(mobile)){

status.style.color="#d32f2f";
status.innerHTML="شماره موبایل صحیح نیست.";

btn.disabled=false;
btn.innerHTML="ارسال پیام";

return;

}

try{

await fetch("https://script.google.com/macros/s/AKfycbxbCFFoh_0Cgf3jMqPDFujPXTo2lswPJOEQQzGWR1X_J44gJInxZeAFXmlvr53Gq7EaYQ/exec",{

method:"POST",

body:JSON.stringify({

mobile:mobile,

message:message

})

});

status.style.color="#2e7d32";
status.innerHTML="پیام شما با موفقیت ثبت شد.";

form.reset();

}

catch(err){

status.style.color="#d32f2f";
status.innerHTML="خطا در ارسال. دوباره تلاش کنید.";

}

btn.disabled=false;
btn.innerHTML="ارسال پیام";

});



/*=====================================================
SCROLL ANIMATION
=====================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

observer.unobserve(entry.target);

}

});

},{

threshold:.12

});

document.querySelectorAll(".fade").forEach(el=>{

observer.observe(el);

});


/*=====================================================
SMOOTH MENU
=====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

const id=this.getAttribute("href");

if(id==="#" || id.length<2)return;

const target=document.querySelector(id);

if(!target)return;

e.preventDefault();

window.scrollTo({

top:target.offsetTop-95,

behavior:"smooth"

});

});

});


/*=====================================================
HEADER SHADOW
=====================================================*/

const header=document.querySelector(".top-header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40)

header.classList.add("shadow");

else

header.classList.remove("shadow");

});


/*=====================================================
LAZY LOAD IMAGE
=====================================================*/

const lazyImages=document.querySelectorAll("img[loading='lazy']");

const lazyObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src || img.src;

lazyObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

lazyObserver.observe(img);

});


/*=====================================================
PRELOAD HERO
=====================================================*/

[
"../mobile/images/products.jpg",
"../mobile/images/projects.jpg",
"../mobile/images/about.jpg"
].forEach(src=>{

const img=new Image();

img.src=src;

});


/*=====================================================
INIT
=====================================================*/

console.log("Smart Idea Desktop Ready");


/*=====================================================
PROTECT CONTENT
=====================================================*/

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});


document.addEventListener("dragstart", function(e){
    e.preventDefault();
});


document.addEventListener("selectstart", function(e){
    e.preventDefault();
});

document.addEventListener("keydown",function(e){

// Ctrl + S
if(e.ctrlKey && e.key==="s"){
    e.preventDefault();
}

// Ctrl + U
if(e.ctrlKey && e.key==="u"){
    e.preventDefault();
}

// F12
if(e.key==="F12"){
    e.preventDefault();
}

// Print Screen
if(e.key==="PrintScreen"){

    navigator.clipboard.writeText("");

    alert("Screenshot disabled");

}

});




