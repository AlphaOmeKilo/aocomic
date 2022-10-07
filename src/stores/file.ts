import { defineStore } from 'pinia'
import type { ArcFile } from 'node-unrar-js'

export const useFileStore = defineStore('file', {
  state: () => ({ pages: [] as ArcFile<Uint8Array>[] }),

  actions: {
    setPagesFromFiles(files: ArcFile<Uint8Array>[]) {
      this.pages = files
    },
  },
})
