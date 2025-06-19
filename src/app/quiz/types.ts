export type FragranceType = "Terra" | "Ignis" | "Aqua";

export type Vote = {
  [key in FragranceType]: number;
};

export type Votes = Vote[];

export type AnswerOption = {
  text: string;
  value: FragranceType;
};

export type Winner = {
  fragranceType: FragranceType;
  title: string;
  uid?: string;
};
