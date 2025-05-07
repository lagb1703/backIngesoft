export type UserAcountType = {
    userId: number,
    email: string,
    password?: string,
    rol?: string;
}

export type User = {
    name: string,
    lastName: string,
    dates: Date,
    phone: number,
    identification: string,
    isVirtual: boolean,
    acount: string,
    address: string,
    roleId?: number,
    identificationId: number,
    branchOficeId: number,
    personStateId: number,
    meansOfPayment: number,
} & UserAcountType;