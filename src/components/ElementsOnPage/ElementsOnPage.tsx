import React from 'react';

type Props = {
  elements: string[];
};

export const ElementsOnPage: React.FunctionComponent<Props> = ({
  elements,
}) => {
  const selectedElements = elements.map(item => (
    <li key={item} data-cy="item">
      {item}
    </li>
  ));

  return <ul>{selectedElements}</ul>;
};
