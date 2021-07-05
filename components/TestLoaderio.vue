<template>
	<div>{{loaderio}}</div>
</template>
<script>
export default {
	auth: false,
	async asyncData({ params }) {
		let [loaderio] = await Promise.all([
			"loaderio-783cba52080945e6c89659df476933cd",
		]);
		return {
			loaderio: loaderio,
		};
	},
	data() {
		return {};
	},
};
</script>