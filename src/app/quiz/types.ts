export type FragranceType = "Terra" | "Ignis" | "Aqua";

export type AnswerOption = {
  text: string;
  value: FragranceType;
};

export type Votes = {
  [key in FragranceType]: number;
};

export type Winner = {
  fragranceType: FragranceType;
  title: string;
  uid?: string;
};
