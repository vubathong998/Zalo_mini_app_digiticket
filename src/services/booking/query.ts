import { api } from '../api';
import { getBookingDetail } from './queries/getBookingDetail';
import { getBookingDetailItems } from './queries/getBookingDetailItems';
import { getMyBooking } from './queries/getMyBooking';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        getBookingDetail: getBookingDetail(builder),
        getMyBooking: getMyBooking(builder),
        getBookingDetailItems: getBookingDetailItems(builder),
    }),
});

export default queries;
