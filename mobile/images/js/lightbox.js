/*==============================
    LIGHTBOX
==============================*/

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxLoader = document.querySelector(".lightbox-loader");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");

const btnPrev = document.querySelector(".lightbox-prev");
const btnNext = document.querySelector(".lightbox-next");
const btnClose = document.querySelector(".lightbox-close");

let galleryItems = [];

let activeGallery = [];

let currentIndex = 0;

let currentFolder = "";
let scale = 1;

let translateX = 0;
let translateY = 0;

let isDragging = false;

let startX = 0;
let startY = 0;

/* ---------- Loading Helpers ---------- */

function startLoading() {

    lightbox.classList.add("loading");
    lightboxLoader.style.display = "block";
    lightboxImage.style.opacity = "0";

}

function finishLoading() {

    lightbox.classList.remove("loading");
    lightboxLoader.style.display = "none";
    lightboxImage.style.opacity = "1";

}

function imageError() {

    finishLoading();

    lightboxImage.src = "images/no-image.png";

    lightboxCaption.textContent =
        "تصویر در دسترس نیست";

}




/* ---------- Refresh Gallery ---------- */

function refreshGallery(){

    galleryItems = [...document.querySelectorAll(".gallery-link")];

}

refreshGallery();

/* ---------- Build Folder Galleries ---------- */

const galleries = {};

document.querySelectorAll(".gallery-link").forEach(item=>{

    const folder = item.dataset.folder;

    if(!galleries[folder]){

        galleries[folder] = [];

    }

    galleries[folder].push(item);

});





/* ---------- Show Image ---------- */
function preloadImage(src){

    const img = new Image();

    img.src = src;

}
function showImage(index){

    if(!activeGallery || activeGallery.length===0)
        return;


    if(index<0)
        index=activeGallery.length-1;


    if(index>=activeGallery.length)
        index=0;


    currentIndex=index;


    const item=activeGallery[currentIndex];
    if(lightboxImage.src.endsWith(item.href.split("/").pop())){

    return;

}

  startLoading();

lightboxImage.onload = finishLoading;
    
lightboxImage.onerror = imageError;
    

lightboxImage.src = item.href;




  const imageName = item.href.split("/").pop();


const captionText =
    (typeof captions !== "undefined" &&
     captions[currentFolder] &&
     captions[currentFolder][imageName])
     ||
     item.querySelector("img").alt;

console.log("Folder:", currentFolder);
console.log("Image:", imageName);
console.log("Caption:", captionText);
lightboxCaption.textContent = captionText;
    


    lightboxCounter.textContent =
        (currentIndex+1)+" / "+activeGallery.length;
const nextItem =
activeGallery[(currentIndex+1)%activeGallery.length];

const prevItem =
activeGallery[
(currentIndex-1+activeGallery.length)
%activeGallery.length
];

preloadImage(nextItem.href);

preloadImage(prevItem.href);
    
    
   preloadAdjacentImages();

   function preloadAdjacentImages(){

    if(activeGallery.length < 2) return;

    const prev =
        activeGallery[
            (currentIndex - 1 + activeGallery.length) % activeGallery.length
        ];

    const next =
        activeGallery[
            (currentIndex + 1) % activeGallery.length
        ];

    [prev, next].forEach(item => {

        const img = new Image();

        img.src = item.href;

    });

}

}



/* ---------- Open ---------- */

galleryItems.forEach((item)=>{

    item.addEventListener("click",function(e){

        e.preventDefault();


        const folder = item.dataset.folder;


        activeGallery = galleries[folder];


        currentFolder = folder;


        currentIndex = activeGallery.indexOf(item);


        showImage(currentIndex);


        lightbox.classList.add("active");


        document.body.style.overflow="hidden";


    });

});



/* ---------- Close ---------- */

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

btnClose.addEventListener("click",closeLightbox);


/* ---------- Background ---------- */

lightbox.addEventListener("click",function(e){

    if(e.target===lightbox){

        closeLightbox();
        scale=1;

translateX=0;
translateY=0;

updateTransform();

    }

});


/* ---------- Next ---------- */

btnNext.addEventListener("click",()=>{

    showImage(currentIndex+1);

});


/* ---------- Prev ---------- */

btnPrev.addEventListener("click",()=>{

    showImage(currentIndex-1);

});


/* ---------- Keyboard ---------- */

document.addEventListener("keydown",function(e){

    if(!lightbox.classList.contains("active"))
        return;

    if(e.key==="Escape")
        closeLightbox();

if(e.key==="ArrowRight")
    showImage(currentIndex-1);


if(e.key==="ArrowLeft")
    showImage(currentIndex+1);

    
});


/* ---------- Swipe ---------- */

let touchStartX=0;

lightbox.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].clientX;

});

lightbox.addEventListener("touchend",(e)=>{

    let touchEndX=e.changedTouches[0].clientX;

    let diff=touchStartX-touchEndX;

    if(Math.abs(diff)<50) return;

    if(diff>0){

        showImage(currentIndex+1);

    }else{

        showImage(currentIndex-1);

    }

});

function clampPan() {

    if (scale <= 1) {

        translateX = 0;
        translateY = 0;
        return;

    }

function updateTransform() {

    clampPan();

    lightboxImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;

}



    const rect = lightboxImage.getBoundingClientRect();

    const maxX = (rect.width * (scale - 1)) / 2;
    const maxY = (rect.height * (scale - 1)) / 2;

    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

}



const zoomLevels = [1, 1.5, 2, 3];

function resetTransform() {

    scale = 1;
    translateX = 0;
    translateY = 0;

    updateTransform();

}

function nextZoomLevel() {

    const index = zoomLevels.indexOf(scale);

    if (index === zoomLevels.length - 1) {

        resetTransform();
        return;

    }

    scale = zoomLevels[index + 1];

    updateTransform();

}

lightboxImage.addEventListener("dblclick", nextZoomLevel);



lightboxImage.addEventListener("mousedown",(e)=>{

    if(scale===1)return;

    isDragging=true;

    startX=e.clientX-translateX;
    startY=e.clientY-translateY;

});

window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    updateTransform();

});



window.addEventListener("mouseup",()=>{

    isDragging=false;

});
/* ---------- Mouse Wheel Zoom ---------- */

lightbox.addEventListener("wheel", (e) => {

    if (!lightbox.classList.contains("active"))
        return;

    e.preventDefault();

    if (e.deltaY < 0) {

        scale = Math.min(scale + 0.25, 3);

    } else {

        scale = Math.max(scale - 0.25, 1);

        if (scale === 1) {

            translateX = 0;
            translateY = 0;

        }

    }

    updateTransform();

}, { passive: false });




