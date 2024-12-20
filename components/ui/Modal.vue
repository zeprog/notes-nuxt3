<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>
