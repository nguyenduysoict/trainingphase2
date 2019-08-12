$(document).ready(function () {
    // Khởi tạo đối tượng MainJS xử lý nghiệp vụ
    mainJS = new MainJS();
});

/**
 * MainJS object xử lý tác vụ
 * Createby NMDuy 25/07/2019
 */

class MainJS {
    constructor() {
        this.AjaxJS = new AjaxJS();
        this.Resources = new Resource();
        this.DialogOutwardRef = new Dialog(this.Resources.AddNewOtherOutwardRefDialogTitle, 1000, 700, "dialogOutwardRef");
        this.DialogSelectObject = new Dialog(this.Resources.SelectObject, 800, 'auto', "dialogSelectObject");
        this.DialogSelectItem = new Dialog(this.Resources.SelectItem, 900, 'auto', "dialogSelectItem");
        this.DataBinderJS = new DataBinderJS();
        this.InitEvents();
        this.refNo = '';
        this.objectComboboxdata = [];
    }

    InitEvents() {
        this.getOutwardRef();
        $(document).on("click", "#btnAdd", this.showOutwardRefDialog.bind(this));
        $(document).on("click", ".btn-search-object", this.showObjectSelectDialog.bind(this));
        $(document).on("click", ".item-quick-search", this.showItemSelectDialog.bind(this));

        $(document).on("click", ".arrow-down-dropbox-icon", this.showComboBox);

        $(document).on("click", ".product-combobox-data>tr", this.onSelectProductItem.bind(this));

        $(document).on("focus", ".item-code-input", this.focusOnItemCodeInput);

        $(document).on("focus", ".end-tab", this.onFocusEndtab);
        $(document).on("focus", ".start-tab", this.onFocusStarttab);
        $(document).on("click", ".garbage-icon", this.onDeleteItemDetailRow);

    }

    getOutwardRef() {
        this.AjaxJS.getOutwardRefData();
    }

    showOutwardRefDialog() {
        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();
        this.refNo = this.AjaxJS.getRefNo();
        $('.outward-ref-no').val(this.refNo);
        $('.outward-date').val(currentDate);
        $('.outward-time').val(currentTime);

        this.objectComboboxdata = this.AjaxJS.getComboboxData("object");
        this.productComboboxdata = this.AjaxJS.getComboboxData("product");
        this.DataBinderJS.bindingComboboxData("object", this.objectComboboxdata);
        this.DataBinderJS.bindingComboboxData("product", this.productComboboxdata);
        $('.outward-detail-table').html('');
        this.DataBinderJS.appendEmptyRowToOutwardDetailTable();
        this.DialogOutwardRef.open();
        $('.staff-code-input').focus();

    }

    showObjectSelectDialog() {
        this.DialogSelectObject.open();
    }
    showItemSelectDialog() {
        this.DialogSelectItem.open();
    }

    showComboBox() {
        var comboboxName = $(this).attr("comboboxName");
        var relativeParent = this.closest('.dropdown-div');

        if (comboboxName === "product") {
            var pos = $(relativeParent).offset();
            $('.product').css('top', pos.top + 34);
            $('.product').css('left', pos.left - 1);
            $('.product').addClass('show');

        } else if (comboboxName === "object") {
            $('.product').removeClass('show');
            var dropdownContent = $(relativeParent).find('.dropdown-content');
            if ($(dropdownContent).hasClass('show')) {
                $(dropdownContent).removeClass('show');
            } else {
                $(dropdownContent).addClass('show');
            }
        }
        $(relativeParent).find('input').focus();
    }

    onSelectProductItem(sender) {
        var item = sender.currentTarget;
        var product = {
            itemCode: $(item).attr("itemCode"),
            itemName: $(item).attr("itemName"),
            countUnit: $(item).attr("countUnit"),
            unitPrice: $(item).attr("unitPrice")
        };
        var lastRowIndex = $('.outward-detail-table').children().length;
        $('.outward-detail-table').children()[lastRowIndex - 1].remove();
        this.DataBinderJS.appendDataRowToOutwardDetailTable(product);
        this.DataBinderJS.appendEmptyRowToOutwardDetailTable();
    }

    /**
     * Hiển thị icon khi click vào ô mã sản phẩm trong bảng chọn mặt hàng
     * * @param {any} sender
     */

    focusOnItemCodeInput() {
        $(this).siblings().addClass('show');
    }

    /**
     * */
    onFocusEndtab() {
        $('.outward-detail-table tr:first-child  td:first-child input').focus();
    }

    onFocusStarttab() {
        $('.outward-detail-table tr:last-child  td:first-child input').focus();
    }

    onDeleteItemDetailRow() {
        $(this).parent().parent().remove();
        $('.outward-detail-table tr:last-child  td:first-child input').focus();
    }
}