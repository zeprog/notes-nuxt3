import { mount } from '@vue/test-utils';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';

describe('ConfirmDialog.vue', () => {
  it('renders confirmation dialog', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        visible: true,
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('emits confirm event', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        visible: true,
      },
    });

    // Находим кнопку "Yes" (зеленая кнопка)
    const yesButton = wrapper.find('button.bg-green-600'); // Исправляем класс
    expect(yesButton.exists()).toBe(true);

    // Триггерим клик
    await yesButton.trigger('click');

    // Проверяем, что событие confirm было вызвано
    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
});
