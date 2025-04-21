import { PageDisplayerView } from './PageDisplayerView';
import { PageDisplayerSchema } from './PageDisplayerSchema';

import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';

import pageIcon from '@plone/volto/icons/page.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import messages from './messages';

import { useIntl } from 'react-intl';

export const PageDisplayerEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const intl = useIntl();
  const schema = PageDisplayerSchema(props);

  return (
    <>
      <PageDisplayerView
        {...props}
        editMsg={intl.formatMessage(messages.addonTitle)}
      />
      <SidebarPortal selected={selected}>
        {intl.formatMessage(messages.addonTitle)}
        <BlockDataForm
          icon={<Icon name={pageIcon} size="36px" />}
          intl={intl}
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};
