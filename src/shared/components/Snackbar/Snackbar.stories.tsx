import { ComponentStory } from '@storybook/react';
import Alert from '../Alert/Alert';

import Snackbar from './Snackbar';
import { ISnackbarAnchorOrigin } from './Snackbar.interfaces';

export default {
  component: Snackbar,
  argTypes: {
    open: { control: 'boolean', defaultValue: true },
    'anchorOrigin.vertical': {
      control: 'radio',
      options: ['top', 'bottom'],
      defaultValue: 'bottom'
    },
    'anchorOrigin.horizontal': {
      control: 'radio',
      options: ['left', 'center', 'right'],
      defaultValue: 'center'
    }
  }
};

const Template: ComponentStory<typeof Snackbar> = (args: any) => {
  const anchorOrigin: ISnackbarAnchorOrigin = {
    vertical: args['anchorOrigin.vertical'],
    horizontal: args['anchorOrigin.horizontal']
  };

  return (
    <div style={{ position: 'relative' }}>
      <Snackbar {...args} anchorOrigin={anchorOrigin} />
    </div>
  );
};

export const Position = Template.bind({});
Position.args = {
  message: 'Position'
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: (
    <Alert variant="error" action={<button>X</button>}>
      Error
    </Alert>
  )
};
