import messages from './messages';

export const PageDisplayerListingSchemaEnhancer = (props) => {
  const { intl, schema } = props;

  return {
    ...schema,
    fieldsets: [
      ...schema.fieldsets,
      {
        id: 'showTitle',
        title: intl.formatMessage(messages.addonTitle),
        fields: ['showTitle'],
      },
    ],
    properties: {
      ...schema.properties,
      showTitle: {
        title: intl.formatMessage(messages.showTitleLabel),
        type: 'boolean',
        default: true,
      },
    },
  };
};
