const sortWithSubstring = (oldOrder: string[], phrase: string) => {
  const oldOrderCopy: string[] = [];
  const matchedOrder = oldOrder.filter(word => {
    if (word.includes(phrase)) {
      return true;
    }
    oldOrderCopy.push(word);
    return false;
  });

  return [matchedOrder, oldOrderCopy];
};

export default sortWithSubstring;
