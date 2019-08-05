$(document).ready(function () {
    // Khởi tạo đối tượng MainJS xử lý nghiệp vụ
    mainJS = new MainJS();

    /**
     * Ẩn combobox menu khi click ra vùng ngoài
     * Createby NMDuy 25/07/2019 
     */
    $(document).click(function (e) {
        var container = $(".input-combobox");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            var container2 = $(".arrow-down-dropbox-icon");
            if (!container2.is(e.target) && container2.has(e.target).length === 0) {
                $(".dropdown-content").removeClass("show");
            }
        }
    });
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
        $(document).on("click", "#btnAdd", this.showOutwardRefDialog.bind(this));
        $(document).on("click", ".btn-search-object", this.showObjectSelectDialog.bind(this));
        $(document).on("click", ".item-quick-search", this.showItemSelectDialog.bind(this));

        $(document).on("click", ".arrow-down-dropbox-icon", this.showComboBox);

        $(document).on("click", ".product-combobox-data>tr", this.onSelectProductItem.bind(this));



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
        this.DataBinderJS.appendEmptyRowToOutwardDetailTable();
        this.DialogOutwardRef.open();
    }

    showObjectSelectDialog() {
        this.DialogSelectObject.open();
    }
    showItemSelectDialog() {
        this.DialogSelectItem.open();
    }

    showComboBox() {
        $('dropdown-div').removeClass('show');
        var comboboxName = $(this).attr("comboboxName");
        if (comboboxName === "product") {
            var relativeParent = this.closest('.dropdown-div');
            var pos = $(relativeParent).offset();
            $('.product').css('top', pos.top + 34);
            $('.product').css('left', pos.left - 1);
            $('.product').addClass('show');
        }
        $('.' + comboboxName).addClass("show");
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



   
}