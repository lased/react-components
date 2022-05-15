import { ComponentStory } from '@storybook/react';

import Alert from './Alert';

export default {
  component: Alert
};

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  children: 'Error'
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  children: 'Info'
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Success'
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'Warning'
};

export const WithAction = Template.bind({});
WithAction.args = {
  ...Error.args,
  action: <button>X</button>
};
