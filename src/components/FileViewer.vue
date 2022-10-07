<script setup lang="ts">
import { useFileStore } from '../stores/file'
import { ref, computed, watch } from 'vue'

const store = useFileStore()

let src = ref(null)
let currentPage = ref(0)

const comicPages = computed(() => store.pages)

function readPage() {
	const page = comicPages.value[currentPage.value].extraction
	const blob = new Blob([page], { type: 'image/png' })
	src.value = URL.createObjectURL(blob)
}

function previousPage() {
	if (currentPage.value > 0) {
		currentPage.value = currentPage.value - 1
		readPage()
	}
}

function nextPage() {
	if (currentPage.value < comicPages.value.length - 1) {
		currentPage.value = currentPage.value + 1
		readPage()
	}
}

watch(comicPages, () => {
	currentPage.value = 0
	readPage()
})
</script>

<template>
	<img v-if="src" :src="src" />

	<button @click="previousPage">Previous page</button>

	<button @click="nextPage">Next page</button>
</template>

<style scoped>
img {
	max-width: 90%;
	max-height: 90%;
}
</style>
