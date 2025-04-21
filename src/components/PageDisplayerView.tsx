import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { IncludeContext } from './IncludeContext';

import { getContent } from '@plone/volto/actions/content/content';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url.js';
import { useContext } from 'react';
import './PageDisplayer.less';
import messages from './messages';
import { useIntl } from 'react-intl';

type PageDisplayerProp = {
  data: {
    url: string | undefined;
    showTitle: boolean;
  };
  editMsg: string | undefined;
};

export const PageDisplayerView = (props: PageDisplayerProp) => {
  const { data, editMsg } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const storeContent = useSelector((state: any) => state.content);
  const includeContext = useContext(IncludeContext);

  const visited = new Set(includeContext.visited);

  if (storeContent !== undefined && storeContent.data !== undefined) {
    visited.add(flattenToAppURL(storeContent.data['@id']));
  }
  const flatten = (url: string) => flattenToAppURL(url) || '/';

  const sourcePageUrl = data.url;
  const noUrlSelected = sourcePageUrl === null || sourcePageUrl === undefined;

  const contentPath = flatten(sourcePageUrl);
  const storeContentPath = flatten(storeContent.data['@id']);

  const same = contentPath === storeContentPath;

  const loopDetected = visited.has(contentPath) || same;
  const thispage = same ? storeContent : storeContent.subrequests[contentPath];

  const contentLoaded = thispage !== undefined;

  useEffect(() => {
    if (!contentLoaded) {
      const blockAddress = getContent(contentPath, null, contentPath);
      dispatch(blockAddress);
    }
  }, [contentLoaded, contentPath, dispatch]);

  visited.add(sourcePageUrl);

  const editHeaderMsg = editMsg
    ? editMsg + ' ' + (noUrlSelected ? '' : contentPath)
    : '';
  const result = noUrlSelected ? (
    <p>{intl.formatMessage(messages.noUrlSelected)}</p>
  ) : !contentLoaded || thispage?.loading ? (
    <p>{intl.formatMessage(messages.stillLoading)} {contentPath}</p>
  ) : loopDetected ? (
    <p className="loop-detected warning">
      {intl.formatMessage(messages.loopWarning)}
    </p>
  ) : (
    <>
      <IncludeContext.Provider
        value={{
          url: sourcePageUrl,
          showTitle: data?.showTitle || false,
          visited: visited,
        }}
      >
        <RenderBlocks content={thispage.data} />
      </IncludeContext.Provider>
    </>
  );
  return (
    <div className="page-displayer-view">
      {editHeaderMsg !== '' ? (
        <p className="page-displayer-header">{editHeaderMsg}</p>
      ) : null}
      {result}
    </div>
  );
};
