<template>
	<section class>
		<button @click="startSharing()" class="button">DIFFUSER</button>

		<div id="call-frame-container"></div>
	</section>
</template>

<script>
import { sendPrivatePost, deleteAPrivatePost } from "@/server/apiContest";
export default {
	data() {
		return {
			broadcastBabble: ""
		};
	},
	props: {},
	watch: {},
	mounted() {},
	methods: {
		startSharing() {
			var data = null;

			var xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", function() {
				if (this.readyState === this.DONE) {
					console.log(this.responseText);
				}
			});

			xhr.open(
				"DELETE",
				`https://api.daily.co/v1/rooms/${this.$auth.user._id}`
			);
			xhr.setRequestHeader(
				"authorization",
				"Bearer Ca77a6ff31174b7de971e457d95bdbf181a8d6a044e05a33033f341868750a6d"
			);

			xhr.send(data);
			let room = `https://footfoot.daily.co/${this.$auth.user._id}`;
			let user = this.$store.state.auth.user._id;
			let round = this.$route.params.contestId;
			var data = `{\"properties\":{\"owner_only_broadcast\":true,\"enable_chat\":false},\"name\":\"${this.$auth.user._id}\"}`;

			var xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", function() {
				if (this.readyState === this.DONE) {
					console.log(this.responseText);
					window.callFrame = window.DailyIframe.createFrame();
					callFrame.join({
						url: room
					});

					let babbleToSend = {};
					babbleToSend.privatePost = "Je diffuse en direct !";
					babbleToSend.postVideo = room;
					babbleToSend.user = user;
					babbleToSend.round = round;
					sendPrivatePost(babbleToSend).then(resp => {
						this.broadcastBabble = resp._id;
						console.log("rrrrrr", resp);
					});
				}
			});

			xhr.open("POST", "https://api.daily.co/v1/rooms");
			xhr.setRequestHeader("content-type", "application/json");
			xhr.setRequestHeader(
				"authorization",
				"Bearer Ca77a6ff31174b7de971e457d95bdbf181a8d6a044e05a33033f341868750a6d"
			);

			xhr.send(data);
		}
	},

	destroyed() {
		deleteAPrivatePost(this.broadcastBabble);
		var data = null;

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
			}
		});

		xhr.open("DELETE", `https://api.daily.co/v1/rooms/${this.$auth.user._id}`);
		xhr.setRequestHeader(
			"authorization",
			"Bearer Ca77a6ff31174b7de971e457d95bdbf181a8d6a044e05a33033f341868750a6d"
		);

		xhr.send(data);
	}
};
</script>
<style scoped>
button {
	display: block;
}

#page-blocks {
	height: 100%;
	display: flex;
	flex-direction: column;
}
#page-blocks > div {
	margin-top: 1em;
}
#create-a-room {
	flex: none;
}
#create-a-room > div {
	margin-top: 0.25em;
}
#meeting-info-row {
	flex: none;
	display: flex;
}
#meeting-info-row > div {
	flex: auto;
}
#buttons-row {
	flex: none;
	display: flex;
}
#buttons-row > div {
	flex: auto;
}
#call-frame-container {
	flex-grow: 1;
	/* set position and height so this is the "css container" for the iframe */
	position: relative;
	height: 100%;
	min-height: 300px;
}

.info > div {
	margin: 0.25em;
}
.info > div:nth-of-type(2) {
	font-size: 80%;
}
.info > div > div {
	margin: 0.25em;
}

.flex-bins {
	display: flex;
	flex-basis: auto;
}
.flex-bin {
	flex-basis: auto;
}
.disabled {
	pointer-events: none;
	opacity: 0.5;
}

@media (orientation: landscape) {
}
</style>