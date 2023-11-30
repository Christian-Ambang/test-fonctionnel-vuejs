import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import storeTestFonctionnel from "@/stores/testFonctionnel.js";
import { useTestStore } from "@/stores/testFonctionnel.js";
import { reactive, toRaw } from "vue";

// const test = useTestStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about/:test?",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:test?",
      name: "home",
      component: HomeView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  //test-fct  Autoriser les tests fonctionnels
  let test = useTestStore();
  const { actif, exit } = toRaw(test);
  if (to.params.test == "test" && exit.value == false) {
    test.setActif(true);
    next();
  } else if (from.params.test == "test" && exit.value == false) {
    test.setActif(true);
    next({ ...to, params: { ...from.params } });
  } else {
    test.setActif(false);
    test.setExit(false);
    next();
  }
});

export default router;
