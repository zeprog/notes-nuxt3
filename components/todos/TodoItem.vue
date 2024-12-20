<template>
  <div class="todo-item flex items-center gap-4">
    <input
      type="checkbox"
      v-model="todo.completed"
      @change="toggleCompletion"
      class="w-5 h-5"
    />
    <input
      v-model="todo.text"
      @blur="updateTodo"
      class="p-2 border rounded flex-1"
      placeholder="Task description"
    />
    <button
      @click="deleteTodo"
      class="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import { useNotesStore } from '~/store/notes';

defineProps({
  todo: Object,
  noteId: String,
});

const store = useNotesStore();

const toggleCompletion = () => {
  store.toggleTodoCompletion(noteId, todo.id);
};

const updateTodo = () => {
  store.editTodo(noteId, todo.id, todo);
};

const deleteTodo = () => {
  store.deleteTodo(noteId, todo.id);
};
</script>