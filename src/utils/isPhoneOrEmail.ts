import { EMAIL_ADDRESS, PHONE_NUMBER } from './regexConstant';
import regexValidation from './regexValidation';

const isPhoneOrEmail = (value: string) => {
    const phoneValidation = regexValidation({
        value,
        regex: PHONE_NUMBER,
        trim: true,
    });
    const emailValidation = regexValidation({
        value,
        regex: EMAIL_ADDRESS,
        trim: true,
    });
    return phoneValidation || emailValidation;
};

export default isPhoneOrEmail;
