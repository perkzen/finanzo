export const getGraphData = <T>(data: { Expense: any[] }[]) => {
  // get unique categories
  const categories = new Set();
  data.forEach((item) => {
    item.Expense.forEach((expense: { category: string }) => {
      categories.add(expense.category);
    });
  });

  const categoriesArray = Array.from(categories);
  // make map from categories
  const incomeByCategory = new Map();
  categoriesArray.forEach((category) => {
    const accessor = category as string;
    incomeByCategory.set(accessor, 0);
  });

  // get sum for each category
  data.forEach((dataItem) => {
    if (dataItem.Expense.length === 0) return;
    dataItem.Expense.forEach((item: { category: string; amount: number }) => {
      incomeByCategory.set(
        item.category,
        incomeByCategory.get(item.category) + item.amount
      );
    });
  });

  return incomeByCategory;
};
