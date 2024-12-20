import { ref } from 'vue';

export default function useUndoRedo() {
  const history = ref([]);
  const future = ref([]);

  const addState = (state) => {
    history.value.push(state);
    future.value = [];
  };

  const undo = () => {
    if (history.value.length > 1) {
      const lastState = history.value.pop();
      future.value.push(lastState);
      return history.value[history.value.length - 1];
    }
    return null;
  };

  const redo = () => {
    if (future.value.length > 0) {
      const nextState = future.value.pop();
      history.value.push(nextState);
      return nextState;
    }
    return null;
  };

  return { addState, undo, redo };
}
