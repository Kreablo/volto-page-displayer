import TitleBlockView from '@plone/volto/components/manage/Blocks/Title/View';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url.js';

import { useContext } from 'react';
import { IncludeContext } from './IncludeContext';

export const Title = ({ properties, metadata }) => {
  const includeContext = useContext(IncludeContext);

  const u = flattenToAppURL(properties['@id']);

  const flattened = u !== '' ? u : '/';
  const correct = flattened === flattenToAppURL(includeContext.url);
  const hide = !includeContext.showTitle && correct;

  return hide ? null : <TitleBlockView {...{ properties, metadata }} />;
};
