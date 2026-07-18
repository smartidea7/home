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
count:30
},

{
title:"تجهیزات هتلینگ",
desc:"ترالی‌ها و تجهیزات هتلینگ بیمارستانی.",
folder:"../mobile/images/originals/hospital/",
link:"products.html#hospital",
icon:"icon-hospital",
count:18
},

{
title:"گازهای طبی",
desc:"کنسول و تجهیزات گازهای پزشکی.",
folder:"../mobile/images/originals/gas/",
link:"products.html#gas",
icon:"icon-gas",
count:14
},

{
title:"حفاظت پرتویی",
desc:"سرب کوبی و تجهیزات حفاظت اشعه.",
folder:"../mobile/images/originals/lead/",
link:"products.html#lead",
icon:"icon-lead",
count:12
},

{
title:"محصولات تخصصی",
desc:"تجهیزات سفارشی پروژه‌های مهندسی.",
folder:"../mobile/images/originals/special/",
link:"products.html#special",
icon:"icon-special",
count:9
}

];

const PROJECTS=[

{

title:"دکوراسیون داخلی",

desc:"طراحی و اجرای پروژه‌های داخلی.",

folder:"../mobile/images/projects/interior/",

link:"projects.html#interior",

icon:"icon-interior",

count:24

},

{

title:"فضاهای اداری",

desc:"دفاتر و فضاهای تجاری.",

folder:"../mobile/images/projects/office/",

link:"projects.html#office",

icon:"icon-office",

count:16

},

{

title:"آشپزخانه",

desc:"طراحی آشپزخانه مدرن.",

folder:"../mobile/images/projects/kitchen/",

link:"projects.html#kitchen",

icon:"icon-kitchen",

count:20

},

{

title:"غرفه نمایشگاهی",

desc:"نمایشگاه و غرفه.",

folder:"../mobile/images/projects/exhibition/",

link:"projects.html#exhibition",

icon:"icon-exhibition",

count:14

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


buildGallery(
PRODUCTS,
"products-container"
);

buildGallery(
PROJECTS,
"projects-container"
);


/*==================================================
BUILD GALLERY
==================================================*/

function buildGallery(data, containerId){

const container=document.getElementById(containerId);

data.forEach((cat,index)=>{

let html=`

<section class="category fade">

<div class="category-head">

<div class="category-info">

<div class="category-icon">

<svg class="icon">

<use href="../mobile/images/icons.svg#${cat.icon}"></use>

</svg>

</div>

<div>

<h3>${cat.title}</h3>

<p>${cat.desc}</p>

</div>

</div>

<button
class="more-btn"
data-target="gallery-${containerId}-${index}">

نمایش بیشتر +

</button>

</div>

<div
class="gallery"
id="gallery-${containerId}-${index}">

`;

for(let i=1;i<=cat.count;i++){

const hidden=i>3 ? "hidden":"";

html+=`

<div
class="thumb ${hidden}"

data-group="${containerId}-${index}"

data-index="${i-1}"

data-src="${cat.folder}${i}.jpg">

<img

loading="lazy"

src="${cat.folder}${i}.jpg"

alt="${cat.title} ${i}">

</div>

`;

}

html+=`

</div>

</section>

`;

container.insertAdjacentHTML("beforeend",html);

});

}


/*==================================================
SHOW MORE
==================================================*/

document.addEventListener("click",e=>{

if(!e.target.classList.contains("more-btn")) return;

const gallery=document.getElementById(

e.target.dataset.target

);

gallery

.querySelectorAll(".hidden")

.forEach(img=>{

img.classList.remove("hidden");

img.classList.add("show");

});

e.target.remove();

});


buildGallery(

PRODUCTS,

"products-container"

);

buildGallery(

PROJECTS,

"projects-container"

);


/*==================================================
LIGHTBOX
==================================================*/

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const counter=document.getElementById("counter");

let currentGroup=[];
let currentIndex=0;

document.addEventListener("click",function(e){

const thumb=e.target.closest(".thumb");

if(!thumb)return;

const group=thumb.dataset.group;

currentGroup=[

...document.querySelectorAll(

'.thumb[data-group="'+group+'"]'

)

];

currentIndex=currentGroup.indexOf(thumb);

openLightbox();

});

function openLightbox(){

lightbox.classList.add("active");

showImage();

}

function showImage(){

const item=currentGroup[currentIndex];

lightboxImage.src=item.dataset.src;

counter.textContent=

(currentIndex+1)+" / "+currentGroup.length;

}

function closeLightbox(){

lightbox.classList.remove("active");

}

function nextImage(){

currentIndex++;

if(currentIndex>=currentGroup.length)

currentIndex=0;

showImage();

}

function prevImage(){

currentIndex--;

if(currentIndex<0)

currentIndex=currentGroup.length-1;

showImage();

}

document
.getElementById("nextBtn")
.onclick=nextImage;

document
.getElementById("prevBtn")
.onclick=prevImage;

document
.getElementById("closeBtn")
.onclick=closeLightbox;

lightbox.onclick=function(e){

if(e.target===lightbox)

closeLightbox();

};


document.addEventListener("keydown",function(e){

if(!lightbox.classList.contains("active")) return;

if(e.key==="ArrowRight") prevImage();

if(e.key==="ArrowLeft") nextImage();

if(e.key==="Escape") closeLightbox();

});


const observer=new IntersectionObserver(entries=>{

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


const form=document.getElementById("contactForm");

if(form){

form.addEventListener("submit",async function(e){

e.preventDefault();

const mobile=form.mobile.value;

const message=form.message.value;

const status=document.getElementById("status");

status.innerHTML="در حال ارسال...";

try{

await fetch(

form.action,

{

method:"POST",

body:new FormData(form)

}

);

status.innerHTML="✅ پیام با موفقیت ارسال شد.";

form.reset();

}catch(err){

status.innerHTML="❌ ارسال انجام نشد.";

}

});

}


function preload(index){

const img=new Image();

img.src=currentGroup[index].dataset.src;

}

function showImage(){

const item=currentGroup[currentIndex];

lightboxImage.src=item.dataset.src;

counter.innerHTML=(currentIndex+1)+" / "+currentGroup.length;

if(currentIndex>0)

preload(currentIndex-1);

if(currentIndex<currentGroup.length-1)

preload(currentIndex+1);

}



