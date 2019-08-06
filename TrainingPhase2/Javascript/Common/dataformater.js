class DataFormaterJS {
    constructor() {
    }


    /**
     * format tiền ra định dạng số nguyên
     * @param {any} stringNumber: giá trị số định dạng tiền
     */

    formatMoneyToNumber(stringNumber){
        return parseInt(stringNumber.split('.').join(''));
    }

    /**
     * format số ra định dạng tiền
     * @param {any} stringNumber: giá trị số
     */

    formatNumberToMoney(value) {
        value = value.toString();
        var plain = value.split('.').join('');
        var reversed = plain.split('').reverse().join('');
        var reversedWithDots = reversed.match(/.{1,3}/g).join('.');
        var normal = reversedWithDots.split('').reverse().join('');
        return normal;
    }
}