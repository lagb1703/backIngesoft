export type PaysheetTypeType = {
  paysheetTypeId: number;
  paysheet: string;
  payDay: number;
};

export type PaysheetType = {
  paysheetId: number;
  salary: number;
  fileId: string;
  paysheetTypeId: number;
  contractTypeId: number;
  jobPositionId: number;
  requestId: string;
  userId: number;
};
