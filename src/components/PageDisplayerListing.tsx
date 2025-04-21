import { PageDisplayerView } from './PageDisplayerView';
import { PageDisplayerEdit } from './PageDisplayerEdit';

export const PageDisplayerListing = ({ items, isEditMode, showTitle }) => {
  const toData = (item) => {
    return {
      url: item['@id'],
      showTitle: showTitle,
    };
  };

  const result = items.map((item) => {
    return isEditMode ? (
      <PageDisplayerEdit key={item['@id']} data={toData(item)} />
    ) : (
      <PageDisplayerView
        key={item['@id']}
        data={toData(item)}
        editMsg={undefined}
      />
    );
  });
  return <> {result} </>;
};

export default PageDisplayerListing;
