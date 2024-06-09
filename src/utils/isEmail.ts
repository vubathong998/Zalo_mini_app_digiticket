import { EMAIL_ADDRESS } from './regexConstant';
import regexValidation from './regexValidation';

const isEmail = (value: string): boolean =>
    regexValidation({
        value,
        regex: EMAIL_ADDRESS,
        trim: true,
    });
export default isEmail;
