export type ConceptTypeType = {
  conceptTypeId: number;
  conceptType: string;
  minValue?: number;
  maxValue?: number;
  percentage: number;
};

export type ConceptType = {
  conceptId: number;
  conceptTypeId: number;
  cityId: string;
  companyId: string;
};
