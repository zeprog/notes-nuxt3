<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 py-8 px-6">
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-extrabold text-indigo-800">Notes</h1>
      <button
        @click="createNote"
        class="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
        title="+ Create New Note"
      >
        + Create New Note
      </button>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="note in notes"
        :key="note.id"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
      >
        <div class="p-4">
          <h2 class="font-bold text-xl text-gray-800 mb-2">{{ note.title }}</h2>
          <ul class="text-sm text-gray-600 space-y-1">
            <li
              v-for="(todo, index) in note.todos.slice(0, 3)"
              :key="todo.id"
              :class="{ 'line-through text-gray-400': todo.completed }"
            >
              {{ index + 1 }}. {{ todo.text }}
            </li>
          </ul>
        </div>
        <div class="flex justify-between items-center bg-gray-50 px-4 py-2 border-t">
          <button
            @click="editNote(note.id)"
            class="text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            Edit
          </button>
          <button
            @click="openConfirm(note.id)"
            class="text-red-600 font-medium hover:text-red-800 transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <ConfirmDialog :visible="confirmVisible" @confirm="deleteNote" @close="closeConfirm" />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useNotesStore } from '~/store/notes';
import { useRouter } from 'vue-router';
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue';


const store = useNotesStore();
const router = useRouter();

const confirmVisible = ref(false);
const noteToDelete = ref(null);

onMounted(() => {
  store.init();
});

const notes = computed(() => store.notes);

const createNote = () => {
  const newNote = { id: Date.now().toString(), title: 'New Note', todos: [] };
  store.addNote(newNote);
  router.push(`/note/${newNote.id}`);
};

const editNote = (id) => {
  router.push(`/note/${id}`);
};

const openConfirm = (id) => {
  noteToDelete.value = id;
  confirmVisible.value = true;
};

const deleteNote = () => {
  console.log(noteToDelete.value);
  
  store.deleteNote(noteToDelete.value);
  closeConfirm();
};
const closeConfirm = () => {
  noteToDelete.value = null;
  confirmVisible.value = false;
};
</script>
