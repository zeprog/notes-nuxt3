<template>
  <div class="note-actions flex gap-2">
    <button
      @click="editNote"
      class="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
    >
      Edit
    </button>

    <button
      @click="showConfirmDialog"
      class="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
    >
      Delete
    </button>

    <ConfirmDialog
      :visible="confirmVisible"
      @confirm="deleteNote"
      @close="closeConfirmDialog"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotesStore } from '~/store/notes';
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue';

defineProps({
  noteId: String,
});

const store = useNotesStore();
const router = useRouter();

const confirmVisible = ref(false);

const editNote = () => {
  router.push(`/note/${noteId}`);
};

const showConfirmDialog = () => {
  confirmVisible.value = true;
};

const closeConfirmDialog = () => {
  confirmVisible.value = false;
};

const deleteNote = () => {
  store.deleteNote(noteId);
  closeConfirmDialog();
};
</script>
