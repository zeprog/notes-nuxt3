<template>
  <ul class="todo-list space-y-4">
    <li v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" :note-id="noteId" />
    </li>
    <TodoActions :note-id="noteId" />
  </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TodoActions from './TodoActions.vue';

defineProps({
  todos: Array,
  noteId: String,
});
</script>