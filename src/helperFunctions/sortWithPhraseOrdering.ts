const sortWithPhraseOrdering = (
  oldOrder: string[],
  phrase: string,
): [string[], string[]] => {
  let newNestedOrder = new Array<string[]>(phrase.length).fill([]);
  let oldOrderCopy = oldOrder;

  let phraseIndex = phrase.length - 1;
  const updateNestedOrderIndex = (nestIndex: number, newItem: string) => {
    newNestedOrder = newNestedOrder.map((item, index) =>
      nestIndex === index ? item.concat(newItem) : item,
    );
  };
  const filterMatchedItems = (item: string) => {
    if (item.slice(0, phraseIndex + 1) === phrase.slice(0, phraseIndex + 1)) {
      updateNestedOrderIndex(phrase.length - 1 - phraseIndex, item);
      return false;
    }
    return true;
  };

  while (oldOrderCopy.length > 0 && phraseIndex >= 0) {
    oldOrderCopy = oldOrderCopy.filter(filterMatchedItems);
    phraseIndex -= 1;
  }

  const matchedOrder = newNestedOrder.reduce(
    (prev, cur) => prev.concat(cur),
    [],
  );

  return [matchedOrder, oldOrderCopy];
};

export default sortWithPhraseOrdering;
