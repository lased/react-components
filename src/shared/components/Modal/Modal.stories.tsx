import { ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Modal from './Modal';

import './Modal.stories.css';

export default {
  component: Modal,
  argTypes: {
    open: { defaultValue: true },
    onClose: { action: 'closed' }
  }
};

const Template: ComponentStory<typeof Modal> = (args) => {
  const [{ open, onClose }, setArgs] = useArgs();

  return (
    <>
      <Modal
        {...args}
        open={open}
        onClose={(event) => {
          setArgs({ open: false });
          onClose(event);
        }}
      />
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: 'Modal content'
};

export const Scroll = Template.bind({});
Scroll.args = {
  className: 'modal-scroll',
  children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio a error eius, odit voluptatum nemo architecto, cupiditate distinctio illum corrupti magni debitis necessitatibus, vitae libero blanditiis laboriosam aliquid sequi.
  Nisi molestiae veritatis iste culpa quo sit distinctio iure debitis error facere. Aspernatur ab deleniti reprehenderit impedit officia deserunt dignissimos ullam ratione sed. Doloribus architecto at illum ea nihil inventore?
  Illum nihil mollitia dolor blanditiis natus iste, quis incidunt? Inventore animi explicabo qui deleniti a totam nemo eveniet delectus. Officiis excepturi laboriosam cumque itaque nisi quod, dignissimos facere quis soluta!`
};
