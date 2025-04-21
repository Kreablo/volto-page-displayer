import { defineMessages } from 'react-intl';

const messages = defineMessages({
  addonTitle: {
    id: 'addonTitle',
    defaultMessage: 'Page Displayer',
  },
  showTitleLabel: {
    id: 'showTitleLabel',
    defaultMessage: 'Show Title',
  },
  urlLabel: {
    id: 'urlLabel',
    defaultMessage: 'Select url',
  },
  loopWarning: {
    id: 'loopWarning',
    defaultMessage: 'This page is trying to display itself.',
  },
  stillLoading: {
    id: 'loading',
    defaultMessage: 'Loading..',
  },
  noUrlSelected: {
    id: 'noUrlSelected',
    defaultMessage: 'Select URL to the page you want to display.',
  },
});

export default messages;
