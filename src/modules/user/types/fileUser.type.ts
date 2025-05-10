export type FileUserTypeType = {
  fileTypeId: number;
  fileType: string;
  isMandatory: boolean;
};

export type FileUserType = {
  fileUserId?: number;
  fileTypeId: number;
  fileType?: string;
  fileId: string;
  userId: number;
};
