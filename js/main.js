// Set Random Image

let arrayImages = ["Landing-Image-1.jpg", "Landing-Image-2.jpg", "Landing-Image-3.jpg", "Landing-Image-4.jpg", "Landing-Image-5.jpg"];

document.querySelector(".settings-box > .settings-toggle").onclick = () => {
  document.querySelector(".settings-box").classList.toggle("open");
  document.querySelector(".settings-box > .settings-toggle i").classList.toggle("fa-spin")
}

document.querySelector(".landing .overlay").onclick = () => {
  document.querySelector(".settings-box").classList.remove("open")
}

// Set Main Color

document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));


for (i = 0; i < document.querySelectorAll(".settings-box .settings-content .colors .color").length; i++) {
  if (window.localStorage.getItem("color") != null) {
    document.querySelectorAll(".settings-box .settings-content .colors .color")[i].classList.remove("active");
  }
  if (document.querySelectorAll(".settings-box .settings-content .colors .color")[i].dataset.color == window.localStorage.getItem("color")) {
    document.querySelectorAll(".settings-box .settings-content .colors .color")[i].classList.add("active")
  }
}

  
  document.querySelectorAll(".settings-box .settings-content .colors .color").forEach(function (ele) {
    ele.onclick = (e) => {
      for (i = 0; i < document.querySelectorAll(".settings-box .settings-content .colors .color").length; i++) {
        document.querySelectorAll(".settings-box .settings-content .colors .color")[i].classList.remove("active");
      }
      e.target.classList.add("active");
      document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
      window.localStorage.setItem("color", e.target.dataset.color)
  }
})

// Set background Image Random Choice 

if (window.localStorage.getItem("random") == null) {
  window.localStorage.setItem("random", "yes");
}

if (window.localStorage.getItem("random") == "yes") {
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(1)").classList.add("active");
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(2)").classList.remove("active");
} else if (window.localStorage.getItem("random") == "no") {
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(1)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(2)").classList.add("active");
}

document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(1)").onclick = () => {
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(2)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(1)").classList.add("active");
  window.localStorage.setItem("random", "yes");
  checkRandomImage()
}

document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(2)").onclick = () => {
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(1)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .random-image .btns .btn:nth-child(2)").classList.add("active");
  window.localStorage.setItem("random", "no");
  checkRandomImage()
}

if (window.localStorage.getItem("random") == "yes") {
  randomImage = setInterval(() => {
    document.querySelector(".landing").style.backgroundImage = `url(imgs/${arrayImages[Math.floor(Math.random() * arrayImages.length)]})`
  }, 7_000)    
}

function checkRandomImage() {
  if (window.localStorage.getItem("random") == "yes") {
    randomImage = setInterval(() => {
      document.querySelector(".landing").style.backgroundImage = `url(imgs/${arrayImages[Math.floor(Math.random() * arrayImages.length)]})`
    }, 7_000)    
  } else if (window.localStorage.getItem("random") == "no") {
    clearInterval(randomImage)
  }
}

// Set Skills Animation

window.onscroll = () => {
  if (window.pageYOffset > (document.querySelector(".skills").offsetHeight + document.querySelector(".skills").offsetTop - window.innerHeight)) {
    document.querySelectorAll(".skills .skills-box .skill .skill-progress span").forEach( skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}

// Set Image Pop Up

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", e => {
    overlayPopup = document.createElement("div");
    overlayPopup.classList.add("gallery-overlay");
    document.body.appendChild(overlayPopup);
    imagePopup = document.createElement("div");
    imagePopup.classList.add("image-popup");
    titlePopup = document.createElement("h3");
    titlePopup.classList.add("title-popup");
    titlePopuptext = document.createTextNode(img.alt);
    titlePopup.appendChild(titlePopuptext)
    imagePopup.appendChild(titlePopup)
    image = document.createElement("img");
    image.src = img.src;
    imagePopup.appendChild(image);
    document.body.appendChild(imagePopup);
    closePopup = document.createElement("div");
    closePopup.classList.add("close-popup");
    closePopupShape = document.createElement("i");
    closePopupShape.classList.add("fa-times");
    closePopupShape.classList.add("fas");
    closePopup.appendChild(closePopupShape);
    imagePopup.appendChild(closePopup);
    overlayPopup.addEventListener("click", function () {
      overlayPopup.remove()
      imagePopup.remove()
    })
    closePopup.addEventListener("click", function () {
      overlayPopup.remove()
      imagePopup.remove()
    })
  })
})

// Create Nav Bullets 

let navBullets = document.createElement("div");
navBullets.classList.add("nav-bullets");

document.querySelectorAll(".add-bullet").forEach(sec => {
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.dataset.section = sec.getAttribute("id");
  let tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.textContent = sec.dataset.name;
  bullet.appendChild(tooltip);
  navBullets.appendChild(bullet);
})

document.body.prepend(navBullets)

// Show / Hide Nav Bullets  

if (window.localStorage.getItem("bullets") == null) {
  window.localStorage.setItem("bullets", "yes");
}

function navBulletsChoice() {
  if (window.localStorage.getItem("bullets") == "yes") {
    navBullets.style.display = "block";
  } else if (window.localStorage.getItem("bullets") == "no") {
    navBullets.style.display = "none";
  }
}

navBulletsChoice()

document.querySelectorAll(".settings-box .settings-content .show-bullets .btns .btn").forEach(ele => {
  ele.classList.remove("active");
  ele.addEventListener("click", e => {
    e.target.classList.add("active");
    window.localStorage.setItem("bullets", e.target.dataset.choice);
  })
})

if (window.localStorage.getItem("bullets") == "yes") {
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(1)").classList.add("active");
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(2)").classList.remove("active");
} else if (window.localStorage.getItem("random") == "no") {
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(1)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(2)").classList.add("active");
}

document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(1)").onclick = () => {
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(2)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(1)").classList.add("active");
  window.localStorage.setItem("bullets", "yes");
  navBulletsChoice()
}

document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(2)").onclick = () => {
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(1)").classList.remove("active");
  document.querySelector(".settings-box .settings-content .show-bullets .btns .btn:nth-child(2)").classList.add("active");
  window.localStorage.setItem("bullets", "no");
  navBulletsChoice()
}

// Select Bullets

document.querySelectorAll(".bullet").forEach(bullet => {
  bullet.addEventListener("click", e => {
    document.querySelector(`#${e.target.dataset.section}`).scrollIntoView({
      behavior: 'smooth'
    })
  })
})

// Toggle List Icon 

$(document).ready(() => {
  $(".landing .header i").click( () => {
    $(".landing .header ul").toggle(400, function () {
      if (this.style.display == "block") {
        this.style.display = "flex";
      }
    })
  })
})


// window.pageYOffset
// .offsetHeight 
// .offsetTop
// window.innerHeight
