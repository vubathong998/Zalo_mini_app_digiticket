export const EMAIL_PATTERN =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
export const EMAIL_ADDRESS = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const URL_REGEX_1 = new RegExp(
    '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
);
export const URL_REGEX_2 =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
export const VN_PHONE_NUMBER = /(84|09|08|07|05|03|01[2|6|8|9])+([0-9]{8})\b/g;
export const PHONE_NUMBER = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/im;
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// export const USER_NAME = /^(?=.{6,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/im;
export const CONTAIN_WHITE_SPACE = /\s+/g;
export const ONLY_CHARACTERS = /^[a-zA-Z]*$/;
export const CONTAIN_SPECIAL_CHARACTERS = /[~`!@#$%\^&*=\-\[\]\\';,{}|\\"<>\?]/g;
export const CONTAIN_JAVASCRIPT_INJECTION = /<(\/)?script.*/g;
export const DIGIT_REGEX = /(\d{3})(?=\d)/g;
