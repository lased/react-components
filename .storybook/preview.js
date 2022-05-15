import '!style-loader!css-loader!../src/styles/reset.css';
import '!style-loader!css-loader!../src/styles/global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: 'requiredFirst'
  }
};
