import {UserInterface} from "../../users/interfaces/user.interface";

export interface TokenInterface {
    userId: number,
    refreshToken: string,
}

export interface TokenServiceInterface {
    generateToken : (payload : UserInterface) => Promise<{}>
}