/*==============================
    LIGHTBOX
==============================*/

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageWrapper = document.querySelector(".lightbox-image-wrapper");
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
let touchStartX = 0;
let touchStartY = 0;

let lastTouchX = 0;
let lastTouchY = 0;

let isTouchDragging = false;
let lastTap = 0;

let initialDistance = 0;

let initialScale = 1;

let isPinching = false;


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

function buildGalleryMap(){

galleryItems=[
...document.querySelectorAll(".gallery-link")
];

Object.keys(galleries).forEach(key=>delete galleries[key]);

galleryItems.forEach(item=>{

const folder=item.dataset.folder;

(galleries[folder]??=[]).push(item);

});

}

const galleries={};

buildGalleryMap();





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


   currentIndex = index;

const item = activeGallery[currentIndex];

if(lightboxImage.src.endsWith(item.href.split("/").pop())){
    return;
}

setZoom(1);

  startLoading();

lightboxImage.onload = finishLoading;
    
lightboxImage.onerror = imageError;
    

lightboxImage.src = item.href;

lightboxImage.alt=
item.dataset.caption||"";




  const imageName = item.href.split("/").pop();

const captionText=
item.dataset.caption
||
item.querySelector("img").alt
||
"";
    

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

document.addEventListener("click",e=>{

const item=e.target.closest(".gallery-link");

if(!item)return;

e.preventDefault();

buildGalleryMap();

const folder=item.dataset.folder;

activeGallery=galleries[folder];

currentFolder=folder;

currentIndex=activeGallery.indexOf(item);

showImage(currentIndex);

lightbox.classList.add("active");

document.body.style.overflow="hidden";

});




/* ---------- Close ---------- */

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    setZoom(1);

}




btnClose.addEventListener("click",closeLightbox);


/* ---------- Background ---------- */

lightbox.addEventListener("click",function(e){

    if(e.target===lightbox){

        closeLightbox();
       setZoom(1);
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



/* ---------- Touch Zoom + Drag + Swipe ---------- */


lightbox.addEventListener("touchstart", (e)=>{


    if(e.touches.length === 2){

        isPinching = true;

        initialDistance =
        getDistance(e.touches);

        initialScale = scale;

        return;

    }


    const touch = e.touches[0];


    touchStartX = touch.clientX;
    touchStartY = touch.clientY;


    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;


    isTouchDragging = scale > 1;


},{passive:true});





lightbox.addEventListener("touchmove",(e)=>{


    /* Pinch Zoom */

    if(e.touches.length === 2){


        const distance =
        getDistance(e.touches);


        const newScale =
        initialScale *
        (distance / initialDistance);



        setZoom(
            Math.min(MAX_SCALE,newScale)
        );


        e.preventDefault();

        return;

    }




    /* Drag Zoom */

    if(isTouchDragging){


        const touch =
        e.touches[0];


        translateX +=
        touch.clientX -
        lastTouchX;


        translateY +=
        touch.clientY -
        lastTouchY;



        lastTouchX =
        touch.clientX;


        lastTouchY =
        touch.clientY;



        updateTransform();


        e.preventDefault();

    }


},{passive:false});







lightbox.addEventListener("touchend",(e)=>{
const now = Date.now();

if(now - lastTap < 300){

    if(scale >= MAX_SCALE){

        setZoom(MIN_SCALE);

    }else{

        zoomIn();

    }

    lastTap = 0;

    return;

}

lastTap = now;

    if(isPinching){

        isPinching=false;

        return;

    }



    if(isTouchDragging){

        isTouchDragging=false;

        return;

    }



    // Swipe فقط در حالت عادی

    if(scale !== 1)
        return;



    const endX =
    e.changedTouches[0].clientX;



    const diff =
    touchStartX - endX;



    if(Math.abs(diff)<50)
        return;



    if(diff>0){

        showImage(currentIndex+1);

    }
    else{

        showImage(currentIndex-1);

    }


});



function clampPan() {

    if (scale <= 1) {

        translateX = 0;
        translateY = 0;
        return;

    }

   const rect = imageWrapper.getBoundingClientRect();

    const maxX = (rect.width * (scale - 1)) / 2;
    const maxY = (rect.height * (scale - 1)) / 2;

    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

}

function updateTransform() {

    clampPan();

    if(!imageWrapper) return;

    imageWrapper.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;

}

function getDistance(touches){

    const dx =
    touches[0].clientX -
    touches[1].clientX;


    const dy =
    touches[0].clientY -
    touches[1].clientY;


    return Math.sqrt(
        dx*dx + dy*dy
    );

}

/* ---------- Zoom Engine ---------- */




const MIN_SCALE = 1.6;
const MAX_SCALE = 3.2;
const STEP = 0.8;

function setZoom(newScale) {

    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));


    if(imageWrapper){

        imageWrapper.style.transition =
        scale===1
        ?
        "transform .25s ease"
        :
        "none";

    }


    if (scale === MIN_SCALE) {

        translateX = 0;
        translateY = 0;

    }

    updateTransform();

}

function zoomIn() {

    setZoom(scale + STEP);

}

function zoomOut() {

    setZoom(scale - STEP);

}

imageWrapper.addEventListener("mousedown",(e)=>{
    if (scale >= MAX_SCALE) {

        setZoom(MIN_SCALE);

    } else {

        zoomIn();

    }

});





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

    zoomIn();

} else {

    zoomOut();

}

    

}, { passive: false });

lightboxImage.draggable = false;

document.addEventListener("dragstart", e => {
    e.preventDefault();
});

lightbox.addEventListener("contextmenu", e => {
    e.preventDefault();
});


document.addEventListener("galleryUpdated",()=>{

buildGalleryMap();

});





