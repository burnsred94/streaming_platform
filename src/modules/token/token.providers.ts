import { Token } from "./token.entity";
import { TOKEN_REPOSITORY } from "../../core/constants";

export const TokenProviders = [{
    provide: TOKEN_REPOSITORY,
    useValue: Token
}]