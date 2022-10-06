<script setup lang="ts">
import { createExtractorFromData } from 'node-unrar-js/esm'
import { ref } from 'vue'

let src = ref(null)

function uploadFile(drop) {
	if (drop.length == 0) return
	openComic(drop[0])
}

function openComic(file) {
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)

	reader.onload = async (event) => {
		var data = event.target.result as ArrayBuffer

		const wasmBinary = await (
			await fetch('./assets/unrar.wasm', { credentials: 'same-origin' })
		).arrayBuffer()

		const extractor = await createExtractorFromData({
			wasmBinary,
			data,
		})
		const list = extractor.getFileList()
		const fileHeaders = [...list.fileHeaders] // load the file headers
		const extracted = extractor.extract({
			files: fileHeaders.map((fh) => fh.name),
		})
		const files = [...extracted.files]
		files.forEach((f) => readPage(f.extraction))
	}
}

function readPage(page) {
	const blob = new Blob([page], { type: 'image/png' })
	src.value = URL.createObjectURL(blob)
}
</script>

<template>
	<img v-if="src" :src="src" />
	<input
		type="file"
		name="uploader"
		id="uploader"
		accept=".cbr,.cbz,.cbt"
		@change="uploadFile($event.target.files)"
	/>
</template>
