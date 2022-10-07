<script setup lang="ts">
import Uploader from '../components/Uploader.vue'
import FileViewer from '../components/FileViewer.vue'
</script>

<template>
	<main>
		<div class="ao-flex ao-height-100">
			<div
				class="ao-width-50 ao-height-100 ao-flex ao-flex-column ao-align-center ao-justify-center"
			>
				<uploader />
			</div>
			<div
				class="ao-width-50 ao-height-100 ao-flex ao-flex-column ao-align-left ao-justify-center"
			>
				<file-viewer />
			</div>
		</div>
	</main>
</template>
