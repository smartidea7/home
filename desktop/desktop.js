/* ============================
   Smart Idea Desktop
============================ */

const productCategories = [
{
id:"con",
title:"تجهیزات پزشکی مصرفی",
desc:"Medical Consumables",
folder:"images/con/"
},
{
id:"hos",
title:"تجهیزات هتلینگ بیمارستانی",
desc:"Hospital Equipment",
folder:"images/hos/"
},
{
id:"gas",
title:"کنسول و گازهای طبی",
desc:"Medical Gas Systems",
folder:"images/gas/"
},
{
id:"lead",
title:"حفاظت پرتویی",
desc:"Lead Shielding",
folder:"images/lead/"
},
{
id:"spe",
title:"تجهیزات تخصصی",
desc:"Special Products",
folder:"images/spe/"
}
];

const projectCategories=[
{
id:"interior",
title:"دکوراسیون داخلی",
desc:"Interior Design",
folder:"images/interior/"
},
{
id:"office",
title:"فضاهای اداری",
desc:"Office Design",
folder:"images/office/"
},
{
id:"kitchen",
title:"آشپزخانه",
desc:"Kitchen",
folder:"images/kitchen/"
},
{
id:"exhibition",
title:"غرفه نمایشگاهی",
desc:"Exhibition",
folder:"images/exhibition/"
},
{
id:"camper",
title:"کلینیک سیار",
desc:"Mobile Clinic",
folder:"images/camper/"
}
];


/* ========================= */

async function loadCategory(container,data){

const txt=await fetch(data.folder+"index.txt");

const files=(await txt.text())
.split("\n")
.map(v=>v.trim())
.filter(v=>v!="");

const card=document.createElement("div");

card.className="category-card";

card.innerHTML=`

<div class="category-header">

<div>

<h3>${data.title}</h3>

<p>${data.desc}</p>

</div>

</div>

<div class="gallery"></div>

<div class="more-images"></div>

<button class="more-btn">

+ مشاهده تصاویر بیشتر

</button>

`;

container.appendChild(card);

const gallery=card.querySelector(".gallery");

const more=card.querySelector(".more-images");

const btn=card.querySelector(".more-btn");

/* سه تصویر اول */

files.slice(0,3).forEach(file=>{

gallery.appendChild(createImage(data.folder+file));

});

/* بقیه */

files.slice(3).forEach(file=>{

more.appendChild(createImage(data.folder+file));

});

if(files.length<=3){

btn.style.display="none";

}

btn.onclick=function(){

more.classList.toggle("show");

btn.innerHTML=

more.classList.contains("show")

?

"− بستن"

:

"+ مشاهده تصاویر بیشتر";

};

}


/* ========================= */

function createImage(src){

const img=document.createElement("img");

img.src=src;

img.loading="lazy";

img.onclick=()=>openLightbox(src);

return img;

}


/* ========================= */

(async()=>{

const productBox=

document.getElementById("products-container");

for(const item of productCategories){

await loadCategory(productBox,item);

}

const projectBox=

document.getElementById("projects-container");

for(const item of projectCategories){

await loadCategory(projectBox,item);

}

})();


/* ============================
        LIGHTBOX
============================ */

const lightbox=document.querySelector(".lightbox");

const lightboxImg=document.getElementById("lightboxImage");

const closeBtn=document.querySelector(".lightbox-close");

let currentImages=[];

let currentIndex=0;

function openLightbox(src){

currentImages=[

...document.querySelectorAll(".gallery img,.more-images img")

];

currentIndex=currentImages.findIndex(i=>i.src===new URL(src,location.href).href);

lightboxImg.src=src;

lightbox.classList.add("active");

}

function show(index){

if(index<0)

index=currentImages.length-1;

if(index>=currentImages.length)

index=0;

currentIndex=index;

lightboxImg.src=currentImages[currentIndex].src;

}

document.querySelector(".lightbox-next").onclick=()=>{

show(currentIndex+1);

};

document.querySelector(".lightbox-prev").onclick=()=>{

show(currentIndex-1);

};

closeBtn.onclick=()=>{

lightbox.classList.remove("active");

};

lightbox.onclick=e=>{

if(e.target===lightbox)

lightbox.classList.remove("active");

};

document.addEventListener("keydown",e=>{

if(!lightbox.classList.contains("active")) return;

if(e.key==="ArrowRight")show(currentIndex-1);

if(e.key==="ArrowLeft")show(currentIndex+1);

if(e.key==="Escape")lightbox.classList.remove("active");

});
