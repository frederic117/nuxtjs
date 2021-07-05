<template>
	<video-js
		v-if="srcVideo && videoIndex"
		:id="videoIndex"
		class="vjs-default-skin vjs-16-9 vjs-fluid"
		controls
		preload="auto"
		width="100%"
		height="350"
	>
		<source :src="srcVideo" type="application/x-mpegURL" />
	</video-js>
</template>
<script>
export default {
	data() {
		return {
			player: "",
		};
	},
	mounted() {
		this.player = videojs(this.videoIndex, {
			html5: {
				hls: {
					overrideNative: true,
				},
			},
		});
		window.playerEvents = this;
		this.playerSetupEvents();
	},

	props: {
		srcVideo: "",
		videoIndex: "",
	},
	methods: {
		playerDispose() {
			this.player.dispose();
		},

		playerPlay() {
			this.player.play();
		},
		playerPause() {
			this.player.pause();
		},

		playerSetVolume(float) {
			this.player.volume(float);
		},
		playerSetPoster(srcVideo) {
			this.player.poster(srcVideo);
		},
		playerSetTime(time) {
			this.player.currentTime(time);
		},

		playerEventVolume() {
			this.volume = this.player.volume();
		},

		playerGetPaused() {
			return this.player.paused();
		},
		playerGetTime() {
			return this.player.currentTime();
		},
		playerGetError() {
			return this.player.error().message;
		},

		playerSetupEvents() {
			this.player.on("ended", function () {
				var a = window.playerEvents.playerEventEnded();
			});
			this.player.on("volumechange", function () {
				window.playerEvents.playerEventVolume();
			});
			this.player.on("error", function () {
				window.playerEvents.playerEventError();
			});
		},
	},
	beforeDestroy() {
		this.playerDispose();
	},
};
</script>
<style scoped>
</style>