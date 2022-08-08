<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'GhostWhoops',
  props: {
    error: {
      type: Object,
      default: () => null
    },
    title: {
      type: String,
      default: () => '404 Page Not Found'
    },
    description: {
      type: String,
      default: () => `It seems like we couldn't find the page you were looking for`
    },
  }
})
</script>

<template>
  <div class="d-flex h-100 justify-content-center align-items-center">
    <div class="box">
      <div class="ghost">
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>

        <div class="ghost-container">
          <div class="ghost-eyes">
            <div class="eye-left"></div>
            <div class="eye-right"></div>
          </div>
          <div class="ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="ghost-shadow"></div>
      </div>
      <div class="description">
        <div class="description-container">
          <div>
            <h1 class="description-title">
              <strong v-show="!!error">Whoops!</strong> <small v-text="title" />
            </h1>
            <p class="description-text" v-text="description" />
          </div>
          <!-- <div>
            <h1 class="description-title">
              <strong>Whoops!</strong> <small>404 Page Not Found</small>
            </h1>
            <p class="description-text">
              It seems like we couldn't find the page you were looking for
            </p>
          </div>
          <div>
            <h1 class="description-title">
              <strong>Whoops!</strong> <small>500 Internal Server Error</small>
            </h1>
            <p class="description-text">Something went wrong.</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ghost {
  --gh-purple: #9b9aa1;
  --gh-l-purple: #7a75ad;
  --gh-t-purple: #dbdbdb;
  --gh-white: #28254c;
}
@media (prefers-color-scheme: dark) {
  .ghost {
    --gh-purple: #28254c;
    --gh-l-purple: #332f63;
    --gh-t-purple: #1f1d35;
    --gh-white: #fff;
  }
}
@media (max-width: 576px) {
  .box {
    > .description {
      width: 90vw;
      bottom: 115px !important;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 576px) {
  .box {
    > .description {
      width: 90vw;
    }
  }
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .box {
    width: 700px;
    width: 150px;
  }
}

.box {
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
          background: var(--gh-white);
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
        border-color: var(--gh-white);
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
          background: var(--gh-white);
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
          background: var(--gh-white);
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
        border-color: var(--gh-white);
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
          background: var(--gh-white);
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
      background: var(--gh-white);
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
          background: var(--gh-l-purple);
          border-radius: 50%;
          position: absolute;
          left: 0;
        }
        > .eye-right {
          width: 18px;
          height: 18px;
          background: var(--gh-l-purple);
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
          background-color: var(--gh-white);

          &:nth-child(2n) {
            top: -12px;
            margin: 0 -0px;
            border-top: 15px solid var(--gh-l-purple);
            background: transparent;
          }
        }
      }
    }

    > .ghost-shadow {
      height: 40px;
      box-shadow: 0 60px 15px 5px var(--gh-t-purple);
      border-radius: 50%;
      margin: 0 auto;
      animation: smallnbig 3s ease-in-out infinite;
    }
  }

  > .description {
    position: absolute;
    bottom: -190px;
    left: 50%;
    transform: translateX(-50%);

    > .description-container {
      color: var(--gh-white);
      text-align: center;
      // width: 200px;
      font-size: 16px;
      margin: 0 auto;

      > .description-title {
        font-size: 24px;
        letter-spacing: 0.5px;
      }

      > .description-text {
        color: var(--gh-t-purple);
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
