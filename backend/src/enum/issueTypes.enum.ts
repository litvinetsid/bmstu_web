export enum IssueType {
  SALAD = 'salad',
  FIRST = 'starter',
  SECOND = 'main course',
  DRINK = 'drink',
  DESSERT = 'dessert',
}

export const IssueTypeOrder: IssueType[] = [
  IssueType.SALAD,
  IssueType.FIRST,
  IssueType.SECOND,
  IssueType.DRINK,
  IssueType.DESSERT,
];

export const isValidIssueType = (type: string): boolean => {
  return Object.values(IssueType).includes(type as IssueType);
};

export const getIssueTypeOrderIndex = (type: string): number => {
  return IssueTypeOrder.indexOf(type as IssueType);
};
