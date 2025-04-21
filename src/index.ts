import { PageDisplayerEdit } from './components/PageDisplayerEdit';
import { PageDisplayerView } from './components/PageDisplayerView';
import pageIcon from '@plone/volto/icons/page.svg';
import { Title } from './components/Title';
import { PageDisplayerListing } from './components/PageDisplayerListing';
import { PageDisplayerListingSchemaEnhancer } from './components/PageDisplayerListingSchemaEnhancer';

const applyConfig = (config) => {
  const pageDisplayer = {
    id: 'pageDisplayer',
    title: 'Page Displayer',
    icon: pageIcon,
    group: 'common',
    view: PageDisplayerView,
    edit: PageDisplayerEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.pageDisplayer = pageDisplayer;
  config.blocks.blocksConfig.title.view = Title;

  const variations = config.blocks.blocksConfig.listing.variations;

  const newTemplate = {
    id: 'pageDisplayer',
    title: 'Page Displayer',
    template: PageDisplayerListing,
    schemaEnhancer: PageDisplayerListingSchemaEnhancer,
  };

  config.blocks.blocksConfig.listing.variations = [...variations, newTemplate];

  return config;
};

export default applyConfig;
