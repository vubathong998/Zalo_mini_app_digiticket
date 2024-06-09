import moment, { Moment } from 'moment';

export type DATE_INPUT_TYPE = 'DD/MM/YYYY' | 'DD-MM-YYYY' | 'MM/DD/YYYY' | 'MM-DD-YYYY' | undefined;

const formatDateCustom = ({
    value,
    inputType = undefined,
    format,
}: {
    value: string | Moment;
    inputType?: DATE_INPUT_TYPE;
    format: string;
}) => {
    return moment(value, inputType).locale('vi').format(format);
};

export default formatDateCustom;
