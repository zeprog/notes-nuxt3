import { useNotesStore } from '~/store/notes';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) {
    const store = useNotesStore();
    await store.init();

    const noteExists = store.notes.some((note) => note.id === to.params.id);

    if (!noteExists) {
      return navigateTo('/');
    }
  }
});
