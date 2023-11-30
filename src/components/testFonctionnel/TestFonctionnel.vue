<template>
  <div class="text-center" style="position: relative">
    <!-- Test -->

    <div
      :class="{ transY: showPanneau }"
      style="
        display: block;
        width: 100% !important;
        height: 95px !important;
        clear: none !important;
        float: none !important;
        left: 0px;
        margin: 0px !important;
        max-height: none !important;
        max-width: none !important;
        opacity: 1;
        overflow: visible !important;
        padding: 0px !important;
        position: fixed !important;
        bottom: -95px !important;
        right: auto !important;
        top: auto !important;
        visibility: visible !important;
        z-index: 2147483647;
        background: rgb(250, 250, 250) !important;
      "
    >
      <div>
        <div
          @click="showPanneau = !showPanneau"
          style="cursor:pointer;text-align:center !important; !important; clear: none !important; display: block !important; float: none !important; height: 5px !important; margin: 0 !important; max-height: none !important; max-width: none !important; opacity: 1 !important; overflow: visible !important; padding: 0px !important; position: relative !important;  vertical-align: baseline !important; visibility: visible !important; width: auto !important; z-index: 10 !important; background-color: rgb(250, 250, 250) !important; box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px !important;"
        >
          <svg
            viewBox="-6 0.999406 68 25"
            style="
              filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.2));
              position: absolute !important;
              bottom: 4px !important;
              left: 50% !important;
              width: 80px !important;
              height: 30px !important;
              display: block !important;
            "
          >
            <path
              d="M -6 26 C -4 25 0 27 0 20 L 0 6 A 6 6 90 0 1 6 1 L 50 1 A 6 6 90 0 1 56 6 L 56 20 A 6 6 90 0 0 62 26 Z"
              stroke="#FAFAFA"
              stroke-width="1"
              fill="#FAFAFA"
            ></path>
            <svg x="-5" y="0" viewBox="0 0 320 512">
              <path
                :class="{ rotateIcon: showPanneau }"
                style="position: absolute !important; fill: #616161 !important"
                d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
              />
            </svg>
          </svg>
        </div>
      </div>

      <div
        style="
          height: 100%;
          z-index: auto;
          padding: 10px !important;
          color: red;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <!-- content -->
        <video
          width="0"
          height="0"
          style="display: block"
          id="video"
          autoplay
        ></video>

        <input
          v-model="descriptif"
          type="text"
          placeholder="Descriptif du test"
          style="
            width: 250px;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #f0eded;
            height: 50px;
            margin-left: 10px;
          "
        />

        <textarea
          v-model="commentaire"
          v-if="comment && buttonStatut == 'play'"
          style="
            width: 250px;
            padding: 12px 20px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f0eded;
            resize: none;
            height: 50px;
            margin-left: 10px;
          "
          placeholder="Commentaire"
        ></textarea>

        <span
          @click="
            startVideo();
            buttonStatut = 'stop';
            download = false;
          "
          ><svg
            id="start"
            v-if="buttonStatut == 'play'"
            style="
              cursor: pointer;
              fill: red;
              width: 40px;
              height: auto;
              margin-left: 10px;
            "
            viewBox="0 0 512 512"
          >
            <path
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
            /></svg
        ></span>
        <span
          @click="
            stopVideo();
            buttonStatut = 'play';
            comment = true;
            download = true;
          "
          ><svg
            id="stop"
            v-if="buttonStatut == 'stop'"
            style="
              cursor: pointer;
              fill: black;
              width: 40px;
              height: auto;
              margin-left: 10px;
            "
            viewBox="0 0 512 512"
          >
            <path
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z"
            /></svg
        ></span>
        <a id="download" @click="zipSave()"
          ><svg
            v-if="download"
            style="
              cursor: pointer;
              fill: grey;
              width: 40px;
              height: auto;
              margin-left: 10px;
            "
            viewBox="0 0 512 512"
          >
            <path
              d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            /></svg
        ></a>

        <span @click="exit()" v-if="buttonStatut == 'play'"
          ><svg
            style="
              position: absolute !important;
              bottom: 25 !important;
              right: 15 !important;
              cursor: pointer;
              fill: grey;
              width: 40px;
              height: auto;
              margin-left: 10px;
            "
            viewBox="0 0 512 512"
          >
            <path
              d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
            /></svg
        ></span>
        <!-- content -->
      </div>
    </div>
    <!-- Test -->
  </div>
</template>
<script setup>
import { start, stop, zip } from "@/plugins/testFonctionnel/testFonctionnel.js";
import { ref } from "vue";
import { useTestStore } from "@/stores/testFonctionnel.js";
import { useRoute, useRouter } from "vue-router";
const test = useTestStore();

const dataLog = ref([]);
const dataWarn = ref([]);
const dataError = ref([]);
const dataInfo = ref([]);
const showPanneau = ref(false);
const buttonStatut = ref("play");
const comment = ref(false);
const download = ref(false);
const i = ref(0);
const descriptif = ref("");
const commentaire = ref("");
const route = useRoute();
const router = useRouter();
function exit() {
  test.exit = true;
  router.push({ name: route.name, params: { test: null } });
}
function consoleAll() {
  if (test.actif) {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    // let self = this;

    console.log = function () {
      dataLog.value.push({
        type: "log",
        datetime: Date().toLocaleString(),
        msg: arguments[0],
        value: arguments[1],
      });
    };

    console.warn = function () {
      dataWarn.value.push({
        type: "Warnning",
        datetime: now.toLocaleDateString("fr-FR", options),
        msg: arguments,
      });
    };

    console.error = function () {
      dataError.value.push({
        type: "Error",
        datetime: now.toLocaleDateString("fr-FR", options),
        msg: arguments[0],
      });
    };

    console.info = function () {
      dataInfo.value.push({
        type: "Info",
        datetime: now.toLocaleDateString("fr-FR", options),
        msg: arguments,
      });
    };
  }
}

function startVideo() {
  const videoElem = document.getElementById("video");
  const displayMediaOptions = {
    video: {
      cursor: "always",
      resizeMode: "crop-and-scale",
    },
    audio: false,
  };

  start(displayMediaOptions, videoElem);
  consoleAll();
}
function stopVideo() {
  const videoElem = document.getElementById("video");
  stop(videoElem);
}
function zipSave() {
  const loadZip = document.getElementById("download");

  zip(
    dataLog.value,
    dataWarn.value,
    dataError.value,
    dataInfo.value,
    loadZip,
    descriptif.value,
    commentaire.value
  );

  if (i.value <= 0) {
    setTimeout(() => {
      loadZip.click();
    }, 3000);
  }
  i.value++;
}
</script>
<style lang="scss">
.z-index-10 {
  z-index: 10;
}

.position {
  bottom: 0;
}

.transY {
  animation: animationPaneau 10s ease-in-out infinite;
}

@keyframes animationPaneau {
  0% {
    transform: translateY(-95px);
  }
  100% {
    transform: translateY(-95px);
  }
}

.rotateIcon {
  transform-origin: 50% 50%;
  animation: animationIcon 4s infinite;
}

@keyframes animationIcon {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
