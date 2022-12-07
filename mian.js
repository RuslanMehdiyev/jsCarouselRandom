const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const imagesContainer = document.querySelector(".img-container");
const loading = document.querySelector(".loading");
const url = "https://source.unsplash.com/random/500×500";
let imgArray = [];

window.addEventListener("load", getRandomImage);

function getRandomImage() {
  imagesContainer.innerHTML = loading.innerHTML;
  fetch(url).then((res) => {
    imagesContainer.innerHTML = "";
    let imgUrl = res.url;
    imgArray.push(imgUrl);
    if (imgArray.length > 5) {
      imgArray.shift();
    }

    for (let i = 0; i < imgArray.length; i++) {
      let img = document.createElement("img");
      img.src = imgArray[i];
      img.id = i;
      imagesContainer.appendChild(img);
      if (i == imgArray.length - 1) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    }
  });
}

let imgTags;
let imgId;
let activeImage;
function getImg() {
  imgTags = document.querySelectorAll("img");
  activeImage = document.querySelector(".active");
  imgId = +activeImage.id;
  activeImage.classList.remove("active");
}

btnNext.addEventListener("click", () => {
  getImg();
  if (imgTags[imgId + 1]) {
    imgTags[imgId + 1].classList.add("active");
  } else {
    imgTags[0].classList.add("active");
  }
});

btnPrev.addEventListener("click", () => {
  getImg();
  if (imgTags[imgId - 1]) {
    imgTags[imgId - 1].classList.add("active");
  } else {
    imgTags[imgArray.length - 1].classList.add("active");
  }
});

setInterval(getRandomImage, 4000);
