<template>
  <div class="container-loader" style="background: #1a1810;">
    <div class="left column">
      <div class="header-loader">
        <p>boundary supply /</p>
        <p>
          better than brand new second hand clothing / focus by sick apparel
          everyday,
        </p>
        <p>home of (23-29)</p>
      </div>
      <div class="link"><a href="#">all products</a></div>
    </div>
    <div class="right column">
      <div class="images row w-100">
        <div class="img-1 img col-3"></div>
        <div class="img-2 img col-3"></div>
        <div class="img-3 img col-3"></div>
        <div class="img-4 img col-3"></div>
      </div>
      <div class="header-loader">
        <h1 class="ml12">gorgeoushe</h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import gsap, { Power2, SteppedEase, Expo } from 'gsap'
import anime from 'animejs'

const showLoader = ref(true)

onMounted(() => {
  const alreadyShown = localStorage.getItem('loaderShown')
  if (alreadyShown) {
    showLoader.value = false
    return
  }

  // Chạy animation
  const textWrapper = document.querySelector('.ml12')
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  )

  anime.timeline()
    .add({
      targets: '.ml12 .letter',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (el, i) => 2000 + 60 * i,
    })

    console.log(2);
    

  gsap.from('.left', {
    duration: 3,
    left: '-50%',
    ease: Expo.easeInOut,
    delay: 3.4,
  })

  gsap.from('.header-loader h1', {
    duration: 3,
    left: '-140%',
    ease: Expo.easeInOut,
    delay: 3.4,
  })

  gsap.from('.header-loader > p', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: Power2.easeOut,
    delay: 5.6,
    stagger: 0.2,
  })

  gsap.from('.images > div', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: Power2.easeOut,
    delay: 6,
    stagger: 0.2,
  })

  gsap.from('.link', {
    duration: 1,
    opacity: 0,
    ease: SteppedEase.config(1),
    repeat: -1,
    repeatDelay: 0.2,
    delay: 7.8,
  })

  localStorage.setItem('loaderShown', 'true')

  // Ẩn loader sau một khoảng thời gian
  setTimeout(() => {
    showLoader.value = false
  }, 9000)
})
</script>

<style>
.container-loader {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.column {
  width: 50%;
  height: 100vh;
}

.left {
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url("https://picsum.photos/200/300") no-repeat 50% 50%;
  background-size: cover;
  padding: 20px;
}

.right {
  display: flex;
  padding: 120px 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.img {
  height: 200px;
  margin: 6px;
}

.img-1 {
  background: url("https://picsum.photos/200/300") no-repeat 50% 50%;
  background-size: cover;
}

.img-2 {
  background: url("https://picsum.photos/200/300") no-repeat 50% 50%;
  background-size: cover;
}

.img-3 {
  background: url("https://picsum.photos/200/300") no-repeat 50% 50%;
  background-size: cover;
}

.img-4 {
  background: url("https://picsum.photos/200/300") no-repeat 50% 50%;
  background-size: cover;
}

.header-loader {
  color: #a77a3f;
  text-transform: uppercase;
  font-size: 40px;
}

.header-loader h1 {
  position: relative;
}

.ml12 .letter {
  display: inline-block;
  line-height: 1em;
}

.link a {
  color: red;
  text-transform: uppercase;
  font-size: 40px;
  font-family: "Neutral Face";
}

@media (min-width: 900px) {
  .container-loader {
    display: flex;
  }

  .images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 900px) {
  .column {
    width: 100%;
  }

  .img {
    width: 400px;
    height: 400px;
  }

  .header-loader {
    font-size: 20px;
    padding: 80px 0;
  }
}
</style>