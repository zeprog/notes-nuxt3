<template>
  <div class="note-list">
    <ul>
      <li v-for="note in notes" :key="note.id">
        <NotePreview :note="note" />
        <NoteActions :note-id="note.id" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNotesStore } from '~/store/notes';
import NotePreview from './NotePreview.vue';
import NoteActions from './NoteActions.vue';

const store = useNotesStore();
const notes = computed(() => store.notes);
</script>