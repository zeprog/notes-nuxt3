<template>
  <div class="min-h-screen bg-gradient-to-r from-green-50 to-green-100 py-8 px-6">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-green-800">Edit Note</h1>
    </div>
    <div class="mb-6">
      <label for="note-title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        id="note-title"
        v-model="noteDraft.title"
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="Enter Note Title"
        @input="trackChange"
      />
    </div>
    <ul class="space-y-4">
      <li
        v-for="(todo, index) in noteDraft.todos"
        :key="todo.id"
        class="flex items-center bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          @change="trackChange"
          class="w-5 h-5 text-green-600 focus:ring-green-500"
        />
        <input
          v-model="todo.text"
          :class="{ 'line-through text-gray-400': todo.completed }"
          class="flex-1 ml-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Task description"
          @input="trackChange"
        />
        <button
          @click="removeTodo(index)"
          class="ml-4 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition"
        >
          Remove
        </button>
      </li>
    </ul>
    <div class="mt-6">
      <button
        @click="addTodo"
        class="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        + Add Task
      </button>
    </div>
    <div class="mt-10 flex flex-wrap justify-center gap-4">
  <button
    @click="saveNote"
    class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition flex items-center justify-center w-full md:w-auto"
  >
    Save
  </button>
  <button
    @click="cancelEdit"
    class="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition flex items-center justify-center w-full md:w-auto"
  >
    Cancel
  </button>
  <button
    @click="undoState"
    class="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition flex items-center justify-center w-full md:w-auto"
    title="Undo"
  >
    <svg width="32" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 561.131 561.131" style="enable-background:new 0 0 561.131 561.131;" xml:space="preserve"><g><g><path d="M6.684,373.604l205.993,24.55c5.033,0.601,6.909-2.38,4.189-6.658l-39.245-61.689c-2.72-4.278-1.457-9.948,2.876-12.583 c2.549-1.548,5.19-3.146,7.867-4.804c4.327-2.843,9.137-5.113,14.03-7.764c2.463-1.307,4.966-2.635,7.509-3.983 c1.276-0.68,2.561-1.362,3.858-2.054c1.328-0.603,2.668-1.209,4.015-1.817c5.429-2.467,11.007-4.997,16.708-7.586 c5.792-2.39,11.827-4.557,17.953-6.946c6.099-2.546,12.525-4.256,18.997-6.368c3.253-1.028,6.527-2.059,9.816-3.1 c3.342-0.832,6.701-1.671,10.077-2.512c6.769-1.659,13.616-3.592,20.611-4.707l10.518-1.977c3.522-0.691,7.06-1.358,10.615-1.723 c7.108-0.854,14.271-1.919,21.441-2.628c7.212-0.49,14.395-0.979,21.521-1.463c7.148-0.211,14.263-0.168,21.35-0.269 c3.553-0.113,7.057,0.049,10.539,0.25c3.498,0.171,6.971,0.343,10.413,0.511c3.442,0.217,6.913,0.227,10.282,0.612 c3.381,0.364,6.731,0.726,10.046,1.083c6.64,0.747,13.228,1.27,19.492,2.488c6.337,1.062,12.503,2.096,18.464,3.094 c5.912,1.346,11.625,2.647,17.111,3.895c2.662,0.603,5.27,1.197,7.818,1.775c2.638,0.799,5.217,1.576,7.729,2.335 c5.024,1.518,9.792,2.959,14.271,4.314c4.435,1.42,8.776,2.476,12.445,3.942c3.715,1.438,7.127,2.757,10.208,3.95 c4.363,1.692,8.075,3.13,11.056,4.287c4.728,1.833,5.19,0.976,1.025-1.919c-2.653-1.845-5.967-4.149-9.868-6.863 c-2.81-1.943-5.915-4.095-9.3-6.438c-3.394-2.393-7.24-4.364-11.255-6.812c-4.036-2.372-8.329-4.893-12.854-7.552 c-2.265-1.331-4.584-2.693-6.962-4.091c-2.592-1.3-5.244-2.631-7.953-3.99c-5.278-2.622-10.777-5.355-16.469-8.186 c-5.859-2.506-11.919-5.098-18.146-7.763c-6.218-2.831-12.834-5.021-19.575-7.479c-3.384-1.215-6.805-2.442-10.26-3.681 c-3.461-1.261-7.041-2.154-10.618-3.265c-3.599-1.062-7.228-2.133-10.885-3.21c-3.659-1.107-7.365-2.182-11.145-2.986 c-7.536-1.732-15.195-3.623-22.986-5.267c-7.861-1.355-15.787-2.72-23.743-4.088c-8.008-1.132-16.107-1.897-24.247-2.846 c-4.073-0.539-8.148-0.765-12.23-0.958c-4.095-0.217-8.186-0.438-12.271-0.655c-8.204-0.618-16.353-0.376-24.502-0.358 c-4.082,0.031-8.148,0.064-12.197,0.095c-4.036,0.257-8.054,0.514-12.044,0.771c-7.99,0.594-15.998,0.845-23.724,2.004 c-7.757,1.007-15.468,1.86-22.968,3.014c-7.47,1.401-14.78,2.775-21.895,4.109c-1.787,0.343-3.562,0.683-5.324,1.022 c-1.735,0.431-3.458,0.859-5.168,1.285c-3.43,0.86-6.805,1.707-10.128,2.54c-6.634,1.729-13.176,3.158-19.195,5.227 c-12.188,3.917-23.284,7.102-33.636,11.484c-0.08,0.03-0.156,0.061-0.232,0.092c-0.128,0.052-2.439-3.375-5.159-7.653 l-38.033-59.798c-2.721-4.278-6.215-3.843-7.806,0.97L0.447,363.799C-1.144,368.612,1.646,373.004,6.684,373.604z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></g></svg>
  </button>
  <button
    @click="redoState"
    class="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition flex items-center justify-center w-full md:w-auto"
    title="Redo"
  >
    <svg width="32" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 561.129 561.128" style="enable-background:new 0 0 561.129 561.128;" xml:space="preserve"><g><g><path d="M560.684,363.805l-65.062-196.984c-1.591-4.813-5.086-5.248-7.806-0.97l-38.033,59.783 c-2.721,4.278-5.03,7.705-5.159,7.653c-0.076-0.03-0.153-0.061-0.232-0.092c-10.352-4.382-21.447-7.567-33.636-11.484 c-6.019-2.069-12.562-3.498-19.195-5.227c-3.32-0.833-6.698-1.68-10.129-2.54c-1.71-0.425-3.433-0.854-5.168-1.285 c-1.763-0.339-3.537-0.679-5.324-1.022c-7.114-1.334-14.422-2.708-21.895-4.109c-7.5-1.154-15.208-2.004-22.968-3.014 c-7.73-1.163-15.735-1.414-23.725-2.004c-3.993-0.254-8.008-0.511-12.044-0.771c-4.046-0.031-8.112-0.061-12.197-0.095 c-8.149-0.019-16.294-0.26-24.501,0.358c-4.082,0.217-8.173,0.435-12.271,0.655c-4.082,0.196-8.158,0.422-12.231,0.958 c-8.14,0.949-16.239,1.714-24.248,2.846c-7.956,1.371-15.878,2.735-23.743,4.088c-7.791,1.643-15.45,3.534-22.986,5.266 c-3.779,0.805-7.482,1.879-11.145,2.987c-3.657,1.077-7.283,2.148-10.885,3.21c-3.577,1.111-7.16,2.007-10.618,3.265 c-3.455,1.239-6.875,2.466-10.26,3.681c-6.741,2.457-13.357,4.651-19.575,7.479c-6.227,2.666-12.286,5.257-18.146,7.763 c-5.692,2.828-11.19,5.56-16.469,8.186c-2.708,1.359-5.361,2.69-7.953,3.99c-2.378,1.396-4.697,2.76-6.961,4.091 c-4.526,2.659-8.819,5.184-12.855,7.552c-4.011,2.448-7.861,4.418-11.254,6.812c-3.384,2.344-6.494,4.495-9.299,6.438 c-3.902,2.715-7.216,5.016-9.869,6.863c-4.162,2.895-3.7,3.752,1.025,1.919c2.98-1.157,6.689-2.595,11.056-4.287 c3.081-1.193,6.493-2.513,10.208-3.95c3.669-1.466,8.011-2.521,12.445-3.941c4.48-1.355,9.248-2.794,14.272-4.314 c2.512-0.759,5.089-1.54,7.729-2.335c2.549-0.579,5.156-1.169,7.818-1.775c5.483-1.249,11.197-2.549,17.112-3.896 c5.964-1,12.126-2.032,18.464-3.094c6.264-1.214,12.852-1.741,19.492-2.487c3.314-0.358,6.665-0.719,10.046-1.083 c3.369-0.386,6.836-0.395,10.282-0.612c3.442-0.168,6.916-0.34,10.413-0.511c3.482-0.202,6.986-0.364,10.539-0.251 c7.087,0.101,14.202,0.062,21.35,0.27c7.127,0.483,14.309,0.973,21.521,1.462c7.173,0.71,14.333,1.778,21.441,2.629 c3.559,0.364,7.096,1.031,10.615,1.723l10.517,1.977c6.995,1.117,13.84,3.048,20.612,4.707c3.372,0.841,6.732,1.677,10.077,2.512 c3.289,1.037,6.563,2.071,9.816,3.1c6.472,2.115,12.897,3.822,18.996,6.369c6.13,2.393,12.161,4.559,17.953,6.945 c5.701,2.589,11.279,5.119,16.708,7.586c1.347,0.609,2.687,1.215,4.015,1.818c1.294,0.688,2.582,1.373,3.858,2.053 c2.543,1.35,5.046,2.678,7.51,3.984c4.893,2.652,9.7,4.924,14.029,7.764c2.678,1.66,5.318,3.256,7.868,4.803 c4.332,2.633,5.597,8.305,2.876,12.584l-39.244,61.689c-2.721,4.277-0.848,7.258,4.188,6.658l205.993-24.551 C559.481,373.01,562.271,368.62,560.684,363.805z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></g></svg>
  </button>
</div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '~/store/notes';
import useUndoRedo from '~/hooks/useUndoRedo';

definePageMeta({
  middleware: 'check-notes',
});

const route = useRoute();
const router = useRouter();
const store = useNotesStore();

const { addState, undo, redo } = useUndoRedo();

const note = computed(() => store.notes.find((n) => n.id === route.params.id));

const noteDraft = reactive({
  id: note.value?.id || '',
  title: note.value?.title || '',
  todos: note.value?.todos.map((todo) => ({ ...todo })) || [],
});

addState(JSON.stringify(noteDraft));

const addTodo = () => {
  noteDraft.todos.push({ id: Date.now().toString(), text: '', completed: false });
  trackChange();
};

const removeTodo = (index) => {
  noteDraft.todos.splice(index, 1);
  trackChange();
};

const trackChange = () => {
  addState(JSON.stringify(noteDraft));
};

const undoState = () => {
  const previousState = undo();
  if (previousState) Object.assign(noteDraft, JSON.parse(previousState));
};

const redoState = () => {
  const nextState = redo();
  if (nextState) Object.assign(noteDraft, JSON.parse(nextState));
};

const saveNote = () => {
  store.editNote(noteDraft.id, JSON.parse(JSON.stringify(noteDraft)));
  router.push('/');
};

const cancelEdit = () => {
  router.push('/');
};
</script>
