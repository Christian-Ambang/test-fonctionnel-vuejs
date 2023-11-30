import { defineStore } from "pinia";

export const useTestStore = defineStore("testFonctionnel", {
  state: () => ({
    actif: false,
    exit: false,
  }),
  actions: {
    setActif(value) {
      this.actif = value;
    },
    setExit(value) {
      this.exit = value;
    },
  },
});
