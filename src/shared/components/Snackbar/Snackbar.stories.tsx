import { ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { ISnackbarAnchorOrigin } from './Snackbar.interfaces';
import Alert from '../Alert/Alert';
import Snackbar from './Snackbar';

export default {
  component: Snackbar,
  argTypes: {
    open: { control: 'boolean', defaultValue: false },
    autoHideDuration: { control: 'number' },
    message: { control: 'string' },
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

const Template: ComponentStory<typeof Snackbar> = () => {
  const [
    {
      open,
      onClose,
      'anchorOrigin.horizontal': horizontal,
      'anchorOrigin.vertical': vertical,
      ...args
    },
    setArgs
  ] = useArgs();

  const anchorOrigin: ISnackbarAnchorOrigin = {
    horizontal,
    vertical
  };

  return (
    <>
      <Snackbar
        {...args}
        open={open}
        onClose={() => {
          setArgs({ open: false });
          onClose();
        }}
        anchorOrigin={anchorOrigin}
      />
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  message: 'Basic snackbar'
};
