<template>
  <div class="todo-actions">
    <button @click="addTodo" class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
      Add Todo
    </button>
  </div>
</template>

<script setup>
import { useNotesStore } from '~/store/notes';

defineProps({
  noteId: String,
});

const store = useNotesStore();

const addTodo = () => {
  store.addTodo(noteId, { text: 'New Task', completed: false });
};
</script>