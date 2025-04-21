import messages from './messages';

import { useIntl } from 'react-intl';

export const PageDisplayerSchema = () => {
  const intl = useIntl();
  return {
    title: 'Page Displayer',
    block: 'pageDisplayer',

    fieldsets: [
      { id: 'default', title: 'Default', fields: ['url', 'showTitle'] },
    ],
    properties: {
      url: {
        title: intl.formatMessage(messages.urlLabel),
        widget: 'url',
        default: null,
      },
      showTitle: {
        title: intl.formatMessage(messages.showTitleLabel),
        type: 'boolean',
        default: false,
      },
    },
    required: ['url'],
  };
};
