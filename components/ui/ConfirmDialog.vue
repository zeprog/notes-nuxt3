<template>
  <Modal :visible="visible" @close="close">
    <div class="text-center">
      <p class="text-lg font-semibold text-gray-800 mb-6">Are you sure?</p>
      <div class="flex justify-center gap-4">
        <button
          @click="confirm"
          class="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          title="Yes"
        >
          Yes
        </button>
        <button
          @click="close"
          class="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition"
          title="No"
        >
          No
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue';

defineProps({
  visible: Boolean,
});

const emit = defineEmits(['confirm', 'close']);

const confirm = () => {
  emit('confirm');
  close();
};

const close = () => {
  emit('close');
};
</script>
