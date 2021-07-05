<template>
  <div v-if="insiderwantAcall || (userTocall && iMakecall)">
    <div class="call">
      <main>
        <div class="user">
          <div class="user-photo">
            <div class="user-photo__wrap">
              <img v-if="insiderwantAcall" :src="insiderwantAcall.picProfile" />
              <img
                v-else-if="userTocall && iMakecall"
                :src="userTocall.picProfile"
              />
            </div>
          </div>
          <div v-if="insiderwantAcall" class="user-name">
            {{ insiderwantAcall.username }}
          </div>
          <div v-else-if="userTocall && iMakecall" class="user-name">
            {{ userTocall.username }}
          </div>
        </div>
        <div class="status">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle last"></div>
        </div>
        <div v-if="insiderwantAcall" class="buttons">
          <div @click="declineCall" class="col">
            <div class="button -decline js-decline">
              <img
                loading="lazy"
                class="declineCall"
                src="~assets/images/phone-hangup.svg"
                alt="decline"
              />
            </div>
          </div>
          <div class="col">
            <div @click="answerCall" class="button -accept js-accept">
              <img
                loading="lazy"
                class="acceptCall"
                src="~assets/images/phone.svg"
                alt="accept"
              />
            </div>
          </div>
        </div>
        <div v-else-if="userTocall && iMakecall" class="buttons wrapOnebut">
          <div @click="callAbortedbyinitiator" class="col">
            <div class="button -decline js-decline">
              <img
                loading="lazy"
                class="declineCall"
                src="~assets/images/phone-hangup.svg"
                alt="decline"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    insiderwantAcall: "",
    userTocall: "",
    iMakecall: "",
  },
  methods: {
    callAbortedbyinitiator() {
      this.$nuxt.$emit("callAbortedbyinitiator");
    },
    answerCall() {
      this.$nuxt.$emit("answerCall");
    },
    declineCall() {
      this.$nuxt.$emit("declineCall");
    },
  },
};
</script>

<style lang="scss" scoped>
$color1: #ff7d00;
$color2: #192b41;
$color3: #0084a4;

$bg: $color1;

@keyframes calling {
  from {
    background: rgba(255, 255, 255, 0.1);
  }
  to {
    background: rgba(255, 255, 255, 0.9);
  }
}
@keyframes calling2 {
  to {
    border-color: red;
  }
}
@keyframes declined {
  to {
    -webkit-filter: grayscale(0.1) blur(1px)
      drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.7));
    -moz-filter: grayscale(0.1) blur(1px)
      drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.7));
    opacity: 0.5;
  }
}
@keyframes go {
  0% {
    opacity: 0.5;
  }
  95% {
    transform: scale(0.2);
  }
  100% {
    opacity: 0;
  }
}

* {
  box-sizing: border-box;
}
.wrapOnebut {
  display: flex;
  justify-content: center !important;
}
.declineCall {
  filter: invert(8%) sepia(98%) saturate(7109%) hue-rotate(358deg)
    brightness(105%) contrast(122%);
}
.acceptCall {
  filter: invert(53%) sepia(30%) saturate(5996%) hue-rotate(92deg)
    brightness(99%) contrast(117%);
}
.call {
  width: 200px;
  height: auto;
  position: absolute;
  margin: auto;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: darken($bg, 5%);
  &.is-declined {
    animation: declined 0.4s forwards, go 0.3s 0.8s forwards;
    .circle {
      background: rgba(255, 255, 255, 0.1);
    }
    .user-photo__wrap,
    .circle {
      animation-play-state: paused;
    }
  }
  &.is-accepted {
    .circle {
      opacity: 0;
      animation-play-state: paused;
    }
    .user-photo__wrap {
      border: none;
      animation-play-state: paused;
      > img {
        transform: scale(1.2);
      }
    }
  }
}

main {
  height: 280px;
  border: 1px solid lighten($bg, 15%);
  background-image: linear-gradient(lighten($bg, 20%), darken($bg, 5%));
  border-radius: 10px;
}

.user {
  margin-top: 20px;
  width: 100%;
}
.user-photo {
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 100%;
  background: darken($bg, 10%);
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8),
    inset 1px 1px 1px rgba(0, 0, 0, 0.3), inset -1px -1px 1px rgba(0, 0, 0, 0.3),
    inset 2px 2px 1px rgba(0, 0, 0, 0.3), inset 1px 3px 1px rgba(0, 0, 0, 0.3);
}
.user-photo__wrap {
  background: lighten($bg, 10%);
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 5px solid lighten($bg, 10%);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.6);
  animation: calling2 1.3s linear infinite;
  > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: transform 0.2s;
  }
}

.user-name {
  margin: 15px 0;
  text-align: center;
  color: white;
  text-shadow: 0px 1px 1px #444;
}

.status {
  width: 100px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
  .circle {
    float: left;
    margin-right: 12px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.1);
    animation: calling 1s backwards infinite;
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.2 + s;
      }
    }
    &.last {
      margin-right: 0;
    }
  }
}

.buttons {
  width: 90%;
  margin: 20px auto;
  .col {
    width: 50%;
    float: left;
  }
  .button {
    margin: 0 auto;
    width: 80%;
    display: block;
    text-align: center;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    color: white;
    text-decoration: none;
    &.-decline {
      border-color: #cc0f35;
      background: rgba(203, 0, 18, 0.14);
      &:hover {
        background: lighten(#cc0f35, 1%);
      }
    }
    &.-accept {
      border-color: #69c915;
      background: rgba(169, 228, 114, 0.12);
      &:hover {
        background: lighten(#69c915, 1%);
      }
    }
  }
}
</style>
