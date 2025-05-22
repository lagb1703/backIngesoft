export type EducationType = {
    educationId: string;
    name: string;
    startDate: string;
    endDate: string;
    habilities: number[];
}

export type EducationPersonType = {
    id: string;
    userId: number;
    educationId: number;
}