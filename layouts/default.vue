<script>
import Vue from 'vue'
import MainNavbar from '~/components/main-navbar.vue'
import MainFooter from '~/components/main-footer.vue'

export default Vue.extend({
    name: "DefaultLayout",
    components: { MainNavbar, MainFooter }
})
</script>

<template>
  <div>
    <MainNavbar />
    <div class="container main-container">
      <Nuxt />
    </div>
    <MainFooter />
  </div>
</template>

<style lang="scss">
$purple: #28254c;
$l-purple: #332f63;
$t-purple: #8c8aa7;
$pink: #ff5e65;
$white: #fff;

.box {
  width: 620px;
  height: 450px;
  min-width: 150px;
  max-height: 600px;
  min-height: 350px;
  position: absolute;
  padding: 30px 50px;

  > .ghost {
    padding: 15px 25px 25px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);

    .symbol {
      &:nth-child(1) {
        opacity: 0.2;
        animation: shine 4s ease-in-out 3s infinite;

        &:before,
        &:after {
          content: '';
          width: 12px;
          height: 4px;
          background: $white;
          position: absolute;
          border-radius: 5px;
          bottom: 65px;
          left: 0;
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
      &:nth-child(2) {
        position: absolute;
        left: -5px;
        top: 30px;
        height: 18px;
        width: 18px;
        border: 4px solid;
        border-radius: 50%;
        border-color: $white;
        opacity: 0.2;
        animation: shine 4s ease-in-out 1.3s infinite;
      }
      &:nth-child(3) {
        opacity: 0.2;
        animation: shine 3s ease-in-out 0.5s infinite;

        &:before,
        &:after {
          content: '';
          width: 12px;
          height: 4px;
          background: $white;
          position: absolute;
          border-radius: 5px;
          top: 5px;
          left: 40px;
        }
        &:before {
          transform: rotate(90deg);
        }
        &:after {
          transform: rotate(180deg);
        }
      }
      &:nth-child(4) {
        opacity: 0.2;
        animation: shine 6s ease-in-out 1.6s infinite;

        &:before,
        &:after {
          content: '';
          width: 15px;
          height: 4px;
          background: $white;
          position: absolute;
          border-radius: 5px;
          top: 10px;
          right: 30px;
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
      &:nth-child(5) {
        position: absolute;
        right: 5px;
        top: 40px;
        height: 12px;
        width: 12px;
        border: 3px solid;
        border-radius: 50%;
        border-color: $white;
        opacity: 0.2;
        animation: shine 1.7s ease-in-out 7s infinite;
      }
      &:nth-child(6) {
        opacity: 0.2;
        animation: shine 2s ease-in-out 6s infinite;

        &:before,
        &:after {
          content: '';
          width: 15px;
          height: 4px;
          background: $white;
          position: absolute;
          border-radius: 5px;
          bottom: 65px;
          right: -5px;
        }
        &:before {
          transform: rotate(90deg);
        }
        &:after {
          transform: rotate(180deg);
        }
      }
    }

    > .ghost-container {
      background: $white;
      width: 160px;
      height: 160px;
      border-radius: 100px 100px 0 0;
      position: relative;
      margin: 0 auto;
      animation: upndown 3s ease-in-out infinite;

      > .ghost-eyes {
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -45%);
        height: 18px;
        width: 70px;

        > .eye-left {
          width: 18px;
          height: 18px;
          background: $l-purple;
          border-radius: 50%;
          position: absolute;
          left: 0;
        }
        > .eye-right {
          width: 18px;
          height: 18px;
          background: $l-purple;
          border-radius: 50%;
          position: absolute;
          right: 0;
        }
      }

      > .ghost-bottom {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;

        div {
          flex-grow: 1;
          position: relative;
          top: -10px;
          height: 20px;
          border-radius: 100%;
          background-color: $white;

          &:nth-child(2n) {
            top: -12px;
            margin: 0 -0px;
            border-top: 15px solid $l-purple;
            background: transparent;
          }
        }
      }
    }

    > .ghost-shadow {
      height: 40px;
      box-shadow: 0 60px 15px 5px #3b3769;
      border-radius: 50%;
      margin: 0 auto;
      animation: smallnbig 3s ease-in-out infinite;
    }
  }

  > .description {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);

    > .description-container {
      color: $white;
      text-align: center;
      // width: 200px;
      font-size: 16px;
      margin: 0 auto;

      > .description-title {
        font-size: 24px;
        letter-spacing: 0.5px;
      }

      > .description-text {
        color: $t-purple;
        line-height: 20px;
        margin-top: 20px;
      }
    }
  }
}

//keyframes
@keyframes upndown {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes smallnbig {
  0% {
    width: 90px;
  }
  50% {
    width: 100px;
  }
  100% {
    width: 90px;
  }
}
@keyframes shine {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
