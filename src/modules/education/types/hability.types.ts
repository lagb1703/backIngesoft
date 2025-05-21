export type HabilityType = {
  habilityId: number;
  name: string;
  weight: number;
};

export type AfinityType = {
  afinity: number;
};

export type UserHabilityType = {
  userHabilityId: number;
  userId: number;
  habilityId: number;
} & AfinityType;
