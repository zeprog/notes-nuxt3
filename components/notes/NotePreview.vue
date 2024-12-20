<template>
  <div class="note-preview">
    <h3>{{ note.title }}</h3>
    <ul>
      <li v-for="todo in note.todos.slice(0, 3)" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  note: Object,
});
</script>