<template>
	<div v-if="pdf">
		<client-only>
			<pdf id="imageToUpload" :src="pdf" />
		</client-only>
	</div>
</template>
<script>
export default {
	props: {
		pdf: ""
	}
};
</script>
<style scoped>
</style>