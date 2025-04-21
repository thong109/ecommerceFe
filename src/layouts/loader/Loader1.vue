<template>
  <div class="container-lo">
    <div class="container-loader" style="background: #141414">
      <div class="col-loader c-1">
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/0.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/1.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/2.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/3.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/4.jpg?1" alt="">
        </div>
      </div>
      <div class="col-loader c-2">
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/5.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/6.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/7.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/8.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/9.jpg?1" alt="">
        </div>
      </div>
      <div class="col-loader c-3">
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/10.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/11.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="../../assets/hero/hero-1.jpg" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/13.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/14.jpg?1" alt="">
        </div>
      </div>
      <div class="col-loader c-4">
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/15.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/16.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/17.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/18.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/19.jpg?1" alt="">
        </div>
      </div>
      <div class="col-loader c-5">
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/20.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/21.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/22.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/23.jpg?1" alt="">
        </div>
        <div class="item">
          <img src="https://camillemormal.com/static/media/d/load/24.jpg?1" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['loader-finished'])

onMounted(() => {
  let tl = gsap.timeline({ delay: 0 })

  tl.to('.col-loader', {
    top: 0,
    duration: 3,
    ease: 'power4.inOut'
  })

  tl.to('.c-1 .item', {
    top: 0,
    stagger: .25,
    duration: 3,
    ease: 'power4.inOut'
  }, "-=2")

  tl.to('.c-2 .item', {
    top: 0,
    stagger: -.25,
    duration: 3,
    ease: 'power4.inOut'
  }, "-=4")

  tl.to('.c-3 .item', {
    top: 0,
    stagger: .25,
    duration: 3,
    ease: 'power4.inOut'
  }, "-=4")

  tl.to('.c-4 .item', {
    top: 0,
    stagger: -.25,
    duration: 3,
    ease: 'power4.inOut'
  }, "-=4")

  tl.to('.c-5 .item', {
    top: 0,
    stagger: .25,
    duration: 3,
    ease: 'power4.inOut'
  }, "-=4")

  tl.to('.container-loader', {
    scale: 6,
    duration: 5,
    ease: 'power4.inOut',
    onComplete: () => {
      emit('loader-finished')
    }
  }, "-=2")
})


</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

nav {
  position: fixed;
  width: 100%;
  padding: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
}

.header {
  opacity: 0;
}

.nav-item {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  a {
    position: relative;
    top: 20px;
    text-decoration: none;
    color: #fff;
    opacity: .35;

    #active {
      opacity: 1;
    }
  }
}

.hero {
  position: absolute;
  width: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  color: #fff;
}

.icon,
.icon-2 {
  flex: 0.5;
  padding: 0 5em;
  font-size: 30px;
  opacity: 0.5;

  ion-icon {
    transform: scale(0);
  }
}

.icon-2 {
  text-align: right;
}

.title {
  flex: 2;
  text-align: center;
  font-size: 40px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  p {
    position: relative;
    top: 50px;
  }
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.preview {
  position: absolute;
  bottom: 2em;
  right: 2em;
  display: flex;
  gap: .3em;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  img {
    position: relative;
    top: 100px;
    width: 80px;
    height: 50%;
  }
}

.slide-num {
  margin: 3em 0;
  text-align: center;
  color: #fff;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  p {
    position: relative;
    top: 30px;
  }
}

.container-lo {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.container-loader {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1em;

  .col-loader {
    position: relative;
    flex: 1;
    display: flex;
    width: calc(100% / 5);
    flex-direction: column;
    gap: 1em;
  }
}

.col-loader .item {
  position: relative;
  flex: 1;
  width: 100%;
  background: gray;
  overflow: hidden;
}

.c-1,
.c-3,
.c-5 {
  top: 100%;

  .item {
    top: 100%;
  }
}

.c-2,
.c-4 {
  .item {
    top: -100%;
  }
}

@media(max-width: 900px) {
  .slide-num {
    text-align: left;
    padding-left: 2em;
    margin-bottom: 2.5em;
  }

  .title {
    font-size: 30px;
  }

  .icon,
  .icon-2 {
    padding: 0 1em;
    font-size: 16px;
  }

  .preview img {
    width: 60px;
    height: 40px;
  }
}
</style>