import { instance } from '@/core/ApiConfig.js';

const GET_PRODUCT_BARCODE = 'product';
const FISCAL_FOUND = 'fiscal-funds';
const FISCAL_FOUND_LOT = 'fiscal-funds/lots';
export default class ReceiptsService {
    get_product_barcode = (val) => {
        return instance.post(GET_PRODUCT_BARCODE, val);
    };

    get_fiscal_found = () => {
        return instance.get(FISCAL_FOUND);
    };

    get_lot_fiscal_found = (val) => {
        return instance.post(FISCAL_FOUND_LOT, val);
    };
}
