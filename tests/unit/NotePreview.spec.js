import { mount } from '@vue/test-utils';
import NotePreview from '@/components/notes/NotePreview.vue';

describe('NotePreview.vue', () => {
  it('renders note title and todos', () => {
    const note = {
      title: 'Test Note',
      todos: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: true }
      ]
    };

    const wrapper = mount(NotePreview, {
      props: { note }
    });

    expect(wrapper.text()).toContain('Test Note');
    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain('Task 2');
  });
});
