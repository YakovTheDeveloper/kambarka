<template>
    <div :class="[
        styles.castomVideo,
        className,
        isFullscreen ? styles.fullscreen : ''
    ]" ref="containerRef" @mousemove="showControlsTemporarily" :key="key">
        <div v-if="isFullscreen" :class="[styles.fullscreenHeader, showControls ? styles.visible : styles.hidden]">
            <span :class="styles.castomVideo__title">{{ title }}</span>
            <button @click="exitFullscreen" :class="styles.closeBtn">
                <img :src="CrossVideo" alt="" />
            </button>
        </div>

        <video ref="videoRef" :class="[
            styles.videoPlayer,
            IconVideo && !isFullscreen ? styles.videoPlayerFit : ''
        ]" :src="src" :poster="poster" @click="onVideoClick" />

        <div v-if="IconVideo && !isFullscreen" @click="toggleFullscreen" :class="styles.iconVideoStart">
            <img :src="IconVideoStart" alt="" />
        </div>

        <div v-if="!IconVideo || isFullscreen"
            :class="[styles.controlsWrapper, showControls ? styles.visible : styles.hidden]">
            <div :class="styles.controls">
                <div :class="styles.volumeContainer">
                    <div @click="toggleMute">
                        <img :src="getVolumeIcon()" alt="Volume Icon" />
                    </div>

                    <div :class="styles.volumeBarContainer" @click="handleVolumeClick">
                        <div :class="styles.volumeBar">
                            <div :class="styles.volumeLevel" :style="{ width: isMuted ? '0%' : volume * 100 + '%' }" />
                        </div>
                    </div>
                </div>

                <span :class="styles.time">
                    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </span>
            </div>
            <div :class="styles.btn2">
                <div style="position: relative; display: inline-block;">
                    <div @click="togglePlay"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; cursor: pointer; z-index: 2; background: transparent;">
                    </div>
                    <div :class="styles.castomVideo__play_pause">
                        <img :src="isPlaying ? pausB_Svg : start_video_Svg" alt="Play/Pause" />
                    </div>
                </div>
                <!-- <div :class="styles.castomVideo__play_pause" style="pointer-events: none;">
                    <img :src="isPlaying ? pausB_Svg : start_video_Svg" alt="Play/Pause" />
                </div> -->

                <div :class="styles.progressBarBox" @click="handleProgressClick">
                    <div :class="styles.progressBar">
                        <div :class="styles.progress" :style="{ width: progressPercent + '%' }" />
                    </div>
                </div>

                <!-- <div @click="toggleFullscreen">
                    <img :src="isFullscreen ? Quit_Full : Full_Screen"
                        :alt="isFullscreen ? 'QuitFullscreen' : 'Fullscreen'" />
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

import styles from "./CastomVideo.module.scss";
const start_video_Svg = "/icons/Play.svg";
const pausB_Svg = "/icons/Pause.svg";
const Volume = "/icons/Volume Loud.svg";
const Full_Screen = "/icons/Full Screen.svg";
const CrossVideo = "/icons/CrossVideo.svg";
const Quit_Full = "/icons/Quit Full Screen.svg";
const Sound_mid = "/icons/Sound_mid.svg";
const Sound_off = "/icons/Sound_off.svg";
const IconVideoStart = "/icons/IconVideoStart.svg";
interface Props {
    src: string;
    poster?: string;
    title?: string;
    className?: string;
    IconVideo?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "modelActive", payload: { active: boolean }): void;
}>();

const key = ref('1')

const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isFullscreen = ref(false);
const volume = ref(1);
const isEnded = ref(false);
const showControls = ref(true);

let controlsTimeout: ReturnType<typeof setTimeout> | null = null;

function showControlsTemporarily() {
    showControls.value = true;
    if (controlsTimeout) clearTimeout(controlsTimeout);

    const video = videoRef.value;
    if (video && !video.paused && isFullscreen.value) {
        controlsTimeout = setTimeout(() => {
            showControls.value = false;
        }, 4000);
    }
}

function togglePlay() {
    const video = videoRef.value;
    if (!video) return;

    if (video.paused) {
        video.play();
        isPlaying.value = true;
        showControlsTemporarily();
    } else {
        video.pause();
        isPlaying.value = false;
        showControlsTemporarily();
    }
}

function toggleMute() {
    const video = videoRef.value;
    if (!video) return;

    video.muted = !video.muted;
    isMuted.value = video.muted;
}

function toggleFullscreen() {
    const container = containerRef.value;
    if (!container) return;

    if (document.fullscreenElement) {
        document.exitFullscreen();
        emit("modelActive", { active: true });
    } else {
        container.requestFullscreen();
        emit("modelActive", { active: false });
    }
}

function exitFullscreen() {
    document.exitFullscreen();
    emit("modelActive", { active: true });
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function handleProgressClick(e: MouseEvent) {
    const video = videoRef.value;
    if (!video) return;

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration.value;

    video.currentTime = newTime;
    currentTime.value = newTime;
    showControlsTemporarily();

    if (isEnded.value) {
        isEnded.value = false;
    }
}

function handleVolumeClick(e: MouseEvent) {
    const video = videoRef.value;
    if (!video) return;

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1);

    video.volume = newVolume;
    video.muted = newVolume === 0;

    volume.value = newVolume;
    isMuted.value = video.muted;
    showControlsTemporarily();
}

const progressPercent = computed(() =>
    duration.value ? (currentTime.value / duration.value) * 100 : 0
);

function getVolumeIcon() {
    if (isMuted.value || volume.value === 0) return Sound_off;
    if (volume.value > 0 && volume.value <= 0.5) return Sound_mid;
    return Volume;
}

function onVideoClick() {
    if (isFullscreen.value) showControlsTemporarily();
    togglePlay();
}

onMounted(() => {
    const video = videoRef.value;
    if (!video) return;

    let animationFrameId: number;
    let lastUpdateTime = 0;
    const updateInterval = 100;

    function handleTimeUpdate(timestamp: number) {
        if (!lastUpdateTime || timestamp - lastUpdateTime >= updateInterval) {
            currentTime.value = video.currentTime;
            lastUpdateTime = timestamp;
        }
        animationFrameId = requestAnimationFrame(handleTimeUpdate);
    }

    function handleLoadedMetadata() {
        duration.value = video.duration;
        animationFrameId = requestAnimationFrame(handleTimeUpdate);
    }

    function handleEnded() {
        const video = videoRef.value;
        if (!video) return;
        isPlaying.value = false;
        isEnded.value = true;
        showControls.value = true;
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    function fullscreenChange() {
        const isFs = !!document.fullscreenElement;
        isFullscreen.value = isFs;
        showControls.value = true;

        if (!isFs) {
            if (video && !video.paused) {
                video.pause();
                isPlaying.value = false;
            }
            if (controlsTimeout) clearTimeout(controlsTimeout);
        }

        if (isFs) {
            showControlsTemporarily();
        }
    }

    document.addEventListener("fullscreenchange", fullscreenChange);

    onUnmounted(() => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("ended", handleEnded);
        document.removeEventListener("fullscreenchange", fullscreenChange);

        if (controlsTimeout) clearTimeout(controlsTimeout);
        cancelAnimationFrame(animationFrameId);
    });
});
</script>
