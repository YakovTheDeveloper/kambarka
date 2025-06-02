<template>
  <div class="container">
    <header class="block row" :style="{ alignItems: 'center', gap: '40px' }">
      <button class="button" @click="router.back()" :style="{ borderRadius: '40px' }">
        <BackButtonIcon />
      </button>
      <p>{{ data?.title }}</p>
    </header>
    <div class="left block">
      <p class="sub_s" :style="{ marginBottom: '40px' }">
        {{ data?.name }}
      </p>
      <div class="col" :style="{ gap: '20px' }">
        <AnimalViewBlockOne :title="data?.blockOne[0].field1Name" :desc="data?.blockOne[0].field1Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field2Name" :desc="data?.blockOne[0].field2Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field3Name" :desc="data?.blockOne[0].field3Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field4Name" :desc="data?.blockOne[0].field4Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field5Name" :desc="data?.blockOne[0].field5Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field6Name" :desc="data?.blockOne[0].field6Description" />
        <AnimalViewBlockOne :title="data?.blockOne[0].field7Name" :desc="data?.blockOne[0].field7Description" />
        <AnimalViewBlockOne2 :title="data?.blockOne[0].field8Name" :desc="data?.blockOne[0].field8Description" />
        <AnimalViewBlockOne2 :title="data?.blockOne[0].field9Name" :desc="data?.blockOne[0].field9Description" />
        <AnimalViewBlockOne2 :title="data?.blockOne[0].field10Name" :desc="data?.blockOne[0].field10Description" />
      </div>
    </div>
    <div class="center-1 block">
      <div class="img"><img :src="getServerImageUrl(data?.image)" :style="{ borderRadius: '24px' }" alt="" /></div>
      <div class="col" v-if="data?.blockTwo[0].field11Name">
        <p class="sub">{{ data?.blockTwo[0].field11Name }}</p>
        <p>
          {{ data?.blockTwo[0].field11Description }}
        </p>
      </div>
      <div class="row" :style="{ gap: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr' }">
        <div class="col" v-if="data?.blockTwo[0].field12Name">
          <p class="sub_s">{{ data?.blockTwo[0].field12Name }}</p>
          <p>{{ data?.blockTwo[0].field12Description }}</p>
        </div>
        <div class="col" v-if="data?.blockTwo[0].field13Name">
          <p class="sub_s">{{ data?.blockTwo[0].field13Name }}</p>
          <p>{{ data?.blockTwo[0].field13Description }}</p>
        </div>
      </div>
    </div>
    <div class="center-2 block">
      <p class="sub">{{ data?.blockThree[0]?.field14Name }}</p>
      <p>
        {{ data?.blockThree[0]?.field14Description }}
      </p>
      <div class="col" :style="{ gap: '30px', marginTop: '40px' }">
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field15Name" :desc="data?.blockThree[0]?.field15Description"
          :img="data?.blockThreeMedia?.image15" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field16Name" :desc="data?.blockThree[0]?.field16Description"
          :img="data?.blockThreeMedia?.image16" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field17Name" :desc="data?.blockThree[0]?.field17Description"
          :img="data?.blockThreeMedia?.image17" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field18Name" :desc="data?.blockThree[0]?.field18Description"
          :img="data?.blockThreeMedia?.image18" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field19Name" :desc="data?.blockThree[0]?.field19Description"
          :img="data?.blockThreeMedia?.image19" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field20Name" :desc="data?.blockThree[0]?.field20Description"
          :img="data?.blockThreeMedia?.image20" />
        <AnimalViewBlockThree :title="data?.blockThree[0]?.field21Name" :desc="data?.blockThree[0]?.field21Description"
          :img="data?.blockThreeMedia?.image21" />
      </div>
    </div>
    <div class="center-1-bottom block">
      <img v-if="data?.blockTwoMedia.image2" :src="getServerImageUrl(data?.blockTwoMedia.image2)" class="radius" />
      <img v-if="data?.blockTwoMedia.image3" :src="getServerImageUrl(data?.blockTwoMedia.image3)" class="radius" />
    </div>
    <div class="center-2-bottom block">
      <div :style="{ position: 'relative', height: '100%' }">
        <video v-if="data?.blockThreeMedia.video" :src="getServerImageUrl(data?.blockThreeMedia?.video)" autoplay muted
          playsinline class="no-timeline" @click="togglePlay" @play="isPlaying = true" @pause="isPlaying = false"
          ref="videoRef">
        </video>
        <button class="video-button" v-if="!isPlaying" @click="togglePlay">
          <PlayIcon width="40px" />
        </button>
      </div>
    </div>
    <div class="right-top block row" :style="{ gap: '40px' }">
      <img v-if="data?.blockFourMedia?.image22" :src="getServerImageUrl(data?.blockFourMedia?.image22)" alt=""
        :style="{ width: '270px' }" class="round" />
      <div class="col" :style="{ width: '580px', justifyContent: 'center' }">
        <p class="sub">{{ data?.blockFour[0]?.field22Name }}</p>
        <p>
          {{ data?.blockFour[0]?.field22Description }}
        </p>
      </div>

      <div class="col" :style="{ gap: '20px', justifyContent: 'space-evenly' }">
        <div v-if="data?.blockFourMedia?.audio1" class="row" :style="{ gap: '20px', alignItems: 'center' }">
          <button src="" alt="" :style="{ width: '100px' }" class="round" @click="toggleAudio('audio1')">
            <PlaySoundIcon />
          </button>
          <p class="sub_s">{{ data?.blockFour[0]?.audio1Name }}</p>
          <audio ref="audioRef" :src="getServerImageUrl(data?.blockFourMedia?.audio1)"></audio>
        </div>
        <div v-if="data?.blockFourMedia?.audio2" class="row" :style="{ gap: '20px', alignItems: 'center' }">
          <button src="" alt="" :style="{ width: '100px' }" class="round" @click="toggleAudio('audio2')">
            <PlaySoundIcon />
          </button>
          <p class="sub_s">{{ data?.blockFour[0]?.audio2Name }}</p>
          <audio ref="audioRef2" :src="getServerImageUrl(data?.blockFourMedia?.audio2)"></audio>
        </div>
      </div>

    </div>
    <div class="center-3 block">
      <p class="sub_s" :style="{ marginBottom: '20px' }">
        {{ data?.blockFive[0]?.field23Name }}
      </p>
      <div class="row" :style="{ gap: '20px', alignItems: 'center' }">
        <img :src="getServerImageUrl(data?.blockFiveMedia?.image23)" alt="" :style="{ width: '150px', height: '150px' }"
          class="round" />
        <p>
          {{ data?.blockFive[0]?.field23Description }}
        </p>
      </div>
      <p class="sub" :style="{ margin: '40px 0 40px' }">
        {{ data?.blockFive[0]?.sectionTitle24 }}
      </p>
      <div class="col" :style="{ margin: '0 0 20px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field24Name }}</p>
        <p>
          {{ data?.blockFive[0]?.field24Description }}
        </p>
      </div>
      <div class="col" :style="{ margin: '0 0 20px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field24Name }}</p>
        <p>
          {{ data?.blockFive[0]?.field24Description }}
        </p>
      </div>

      <div :style="{ height: '20px' }"></div>

      <div v-if="data?.blockFive[0]?.field25Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field25Name }}</p>
        <p>{{ data?.blockFive[0]?.field25Description }}</p>
      </div>
      <div v-if="data?.blockFive[0]?.field26Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field26Name }}</p>
        <p>{{ data?.blockFive[0]?.field26Description }}</p>
      </div>
      <div v-if="data?.blockFive[0]?.field27Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field27Name }}</p>
        <p>{{ data?.blockFive[0]?.field27Description }}</p>
      </div>
      <div v-if="data?.blockFive[0]?.field28Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field28Name }}</p>
        <p>{{ data?.blockFive[0]?.field28Description }}</p>
      </div>
      <div v-if="data?.blockFive[0]?.field29Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field29Name }}</p>
        <p>{{ data?.blockFive[0]?.field29Description }}</p>
      </div>

      <div :style="{ height: '10px' }"></div>

      <div v-if="data?.blockFive[0]?.field30Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field30Name }}</p>
        <p class="fz-20">
          {{ data?.blockFive[0]?.field30Description }}
        </p>
      </div>
      <div v-if="data?.blockFive[0]?.field31Name" class="col" :style="{ margin: '0 0 30px' }">
        <p class="sub_s">{{ data?.blockFive[0]?.field31Name }}</p>
        <p class="fz-20">
          {{ data?.blockFive[0]?.field31Description }}
        </p>
      </div>
    </div>
    <div class="right block">
      <div class="row" :style="{ justifyContent: 'space-between' }">
        <div class="col" :style="{ width: '580px', justifyContent: 'center' }">
          <p class="sub" :style="{ fontSize: '56px' }">{{ data?.blockSix[0]?.field32Name }}</p>
          <p>
            {{ data?.blockSix[0]?.field32Description }}
          </p>
        </div>
        <img v-if="data?.blockSixMedia?.image32" :src="getServerImageUrl(data?.blockSixMedia?.image32)" alt=""
          :style="{ width: '210px', minWidth: '210px' }" class="round" />
      </div>
      <Space value="50" />
      <div class="row" :style="{ justifyContent: 'space-between' }">
        <div class="col" :style="{ width: '270px', gap: '10px' }">
          <p class="sub" :style="{ fontSize: '30px' }">{{ data?.blockSix[0]?.field33Name }}</p>
          <img v-if="data?.blockSixMedia?.image33" :src="getServerImageUrl(data?.blockSixMedia?.image33)" alt="" :style="{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minWidth: '210px',
            borderRadius: '24px',
          }" />
        </div>
        <div class="col" :style="{ width: '580px', gap: '10px' }">
          <p class="sub" :style="{ fontSize: '30px' }">{{ data?.blockSix[0]?.field34Name }}</p>
          <img v-if="data?.blockSixMedia?.image34" :src="getServerImageUrl(data?.blockSixMedia?.image34)" alt="" :style="{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minWidth: '210px',
            borderRadius: '24px',
          }" />
        </div>
      </div>

      <div :style="{ marginTop: 'auto' }">
        <div class="col" :style="{ justifyContent: 'center' }">
          <p class="sub" :style="{ fontSize: '56px' }">{{ data?.blockSix[0]?.field35Name }}</p>
          <p>
            {{ data?.blockSix[0]?.field35Description }}
          </p>
        </div>
        <Space value="40" />
        <div class="col" :style="{ justifyContent: 'center' }">
          <p class="sub" :style="{ fontSize: '56px' }">{{ data?.blockSix[0]?.field36Name }}</p>
          <div v-html="data?.blockSix[0]?.field36Description"></div>
        </div>
        <Space value="30" />
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr' }">
          <div class="column" v-if="data?.blockSix[0]?.field37Name">
            <p class="sub" :style="{ fontSize: '30px', lineHeight: '130%' }">
              {{ data?.blockSix[0]?.field37Name }}
            </p>
            <p>{{ data?.blockSix[0]?.field37Description }}</p>
          </div>
          <div class="column" v-if="data?.blockSix[0]?.field38Name">
            <p class="sub" :style="{ fontSize: '30px', lineHeight: '130%' }">
              {{ data?.blockSix[0]?.field38Name }}
            </p>
            <p>{{ data?.blockSix[0]?.field38Description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHabitatData } from '@/stores/habitatStore'
import { computed, onMounted, watchEffect, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AnimalViewBlockOne from './AnimalViewBlockOne.vue'
import AnimalViewBlockOne2 from './AnimalViewBlockOne2.vue'
import BackButtonIcon from '@/components/BackButtonIcon.vue'
import { getServerImageUrl } from '@/utils/getServerImageUrl'
import AnimalViewBlockThree from './AnimalViewBlockThree.vue'
import Space from '@/components/space/Space.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import PlaySoundIcon from '@/components/icons/PlaySoundIcon.vue'

const router = useRouter()
const store = useHabitatData()
const audioRef = ref(null)
const audioRef2 = ref(null)
const data = computed(() => store.getById(+router.currentRoute.value.params.id))


const toggleAudio = (which) => {
  let audio
  if (which === 'audio1') audio = audioRef.value
  else if (which === 'audio2') audio = audioRef2.value

  if (!audio) {
    console.warn('Audio element not found')
    return
  }

  if (audio.paused) {
    audio.play().catch(err => console.warn('Play error:', err))
  } else {
    audio.pause()
  }
}

watchEffect(() => {
  console.log(`output->data`, data.value)
})


const isPlaying = ref(false)
const videoRef = ref(null)


const togglePlay = () => {
  const video = videoRef.value;
  if (!video) return;

  if (video.paused) {
    video.play();
    isPlaying.value = true;
  } else {
    video.pause();
    isPlaying.value = false;
  }
};

onMounted(() => {
  const { id } = router.currentRoute.value.params;
  store.fetchHabitat(+id);

});
</script>

<style scoped lang="scss">
.fz-20 {
  font-size: 20px;
  line-height: 130%;
}

.radius {
  border-radius: 24px;
}

.grid-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

img {
  // background-color: red;
}

.container {
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: -0.02em;

  color: #ffffff;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

.sub {
  font-size: 56px;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 100%;

  &_s {
    font-weight: 600;
    font-size: 30px;
    line-height: 130%;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
}

.container {
  background: url('/images/areal/bg.png') center/cover no-repeat;
  padding: 80px;
  position: relative;
}

.block {
  // background-color: rebeccapurple;
  position: absolute;
}

header {
  width: 2130px;
  height: 160px;
  top: 80px;
  left: 80px;
  font-size: 80px;
  font-weight: 700;
  color: white;
}

.left {
  bottom: 80px;
  left: 80px;
  width: 580px;
  height: 1776px;
}

.center-1 {
  left: 700px;
  top: 304px;
  height: 1290px;
  width: 582px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  .img {
    height: 582px;
    width: 582px;
    border-radius: 24px;
    // background-color: red;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.center-2 {
  top: 304px;
  width: 890px;
  height: 1151px;
  left: 1320px;
}

.center-1-bottom {
  width: 891px;
  height: 446px;
  left: 700px;
  bottom: 80px;

  img {
    // border-radius: 50%;
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  * {
    border-radius: 24px;
    // background-color: #fff;
  }
}

.center-2-bottom {
  width: 580px;
  height: 580px;
  left: 1630px;
  bottom: 80px;

  .video-button {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(87, 155, 59, 1);
    border-radius: 50%;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    touch-action: manipulation;

    &.no-timeline::-webkit-media-controls-panel {
      background: transparent !important;
      /* Remove gradient */
    }

    &.no-timeline::-webkit-media-controls-timeline {
      display: none !important;
    }

    &.no-timeline::-webkit-media-controls-current-time-display,
    &.no-timeline::-webkit-media-controls-time-remaining-display {
      display: none !important;
    }

    &.no-timeline::-webkit-media-controls-play-button {
      filter: invert(1);
      /* optional: make play button visible if needed */
    }
  }
}

.right {
  width: 890px;
  height: 1690px;
  left: 2870px;
  bottom: 80px;
  flex-direction: column;
  display: flex;
}

.right-top {
  width: 1510px;
  height: 270px;
  left: 2250px;
  top: 80px;
}

.center-3 {
  width: 580px;
  height: 1690px;
  left: 2250px;
  bottom: 80px;
}

video {
  object-fit: cover;
}

/* Chrome-based browsers only */
video.no-timeline::-webkit-media-controls-timeline {
  display: none;
}

/* Firefox - very limited control */
video.no-timeline::-moz-media-controls {
  display: none;
}
</style>
