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
        this.DialogOutwardRef = new Dialog(Resource.AddNewOtherOutwardRefDialogTitle, 1000, 700, "dialogOutwardRef");
        this.DialogNotification = new Dialog(Resource.MShopKeeper, 400, 156, "dialogNotification");
        this.DataBinderJS = new DataBinderJS();
        this.DrawerJS = new DrawerJS();
        this.refNo = '';
        this.loadingIcon = Resource.LoadingIcon;
        this.InitEvents();
        this.objectComboboxData = [];
    }

    InitEvents() {
        this.getOutwardRefs();
        this.DrawerJS.drawComboboxData('test', 0);
        $(document).on("click", "#btnAdd", this.showOutwardRefDialog.bind(this));
        $(document).on("click", ".arrow-down-dropbox-icon", this.showComboBox);

        $(document).on("click", ".product-combobox-data>tr", this.onSelectProductItem.bind(this));

        $(document).on("click", ".branch-dropdown", this.showBranchDropdown);

        $(document).on("click", ".object-combobox-data>tr", this.onSelectObject);

        $(document).on("click", ".outward-master-table>tr", this.onSelectRef.bind(this));

        $(document).on("focus", ".item-code-input", this.focusOnItemCodeInput);
        $(document).on("click", ".branch-dropdown-menu li", this.onSelectBranch);

        $(document).on("focus", ".end-tab", this.onFocusEndtab);
        $(document).on("focus", ".start-tab", this.onFocusStarttab);
        $(document).on("click", ".garbage-icon", this.onDeleteItemDetailRow);
        $(document).on("click", ".save-btn", this.onClickSaveRefBtn.bind(this));

    }

    getOutwardRefs() {
        var _this = this;
        var url = "/ref";
        this.AjaxJS.get(url, true, function (response) {
            if (response.Success) {
                _this.DataBinderJS.bindDataToMasterTable(response.Data);
            }
        });
    }

    showOutwardRefDialog() {
        this.DialogOutwardRef.open();
        $('.object-code-input').focus();
        var url = '/ref/refno';
        this.refNo = this.AjaxJS.get(url, true, function (response) {
            if (response.Success) {
                $('.outward-ref-no').val(response.Data);
            }
        });

        var currentDate = getCurrentDate();
        var currentTime = getCurrentTime();
        var _this = this;
        $('.outward-date').val(currentDate);
        $('.outward-time').val(currentTime);

        $('.outward-detail-table').html('');
        this.DataBinderJS.appendEmptyRowToOutwardDetailTable();


        $(".object-combobox-data").html(this.loadingIcon);
        var objUrl = "/accountobject";
        this.AjaxJS.get(objUrl, true, function (response) {
            if (response.Success) {
                _this.DataBinderJS.bindComboboxData("object", response.Data);
            }
        });

        $(".product-combobox-data").html(this.loadingIcon);
        var itemUrl = "/item";
        this.AjaxJS.get(itemUrl, true, function (response) {
            if (response.Success) {
                _this.DataBinderJS.bindComboboxData("product", response.Data);
            }
        });

        var itemUrl = "/stock";
        this.AjaxJS.get(itemUrl, true, function (response) {
            if (response.Success) {
                _this.DataBinderJS.bindDropdownMenu("branch", response.Data);
            }
        });
    }

    /**
     * Hiển thị danh sách kho
     */

    showBranchDropdown() {
        var parentDiv = $(this).parent();
        var parentDivPosition = $(parentDiv).offset();

        $('.branch-dropdown-menu').data("target", this.firstElementChild);

        if ($(this).hasClass("branch-dropdown-cell")) {
            $('.branch-dropdown-menu').css({
                'top': parentDivPosition.top + 28,
            });
        } else {
            $('.branch-dropdown-menu').css({
                'top': parentDivPosition.top + 34,
            });
        }
        $('.branch-dropdown-menu').css({
            'left': parentDivPosition.left,
            'display': 'unset',
            'width': $(parentDiv).outerWidth()
        });

    }

    /**
     * Hiển thị combobox
     */

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

    /**
     * Chọn hàng hóa trong combobox hàng hóa
     * @param {any} sender
     */

    onSelectProductItem(sender) {
        var item = sender.currentTarget;
        var recordCount = parseInt($(".record-count").html());
        $(".record-count").html(recordCount + 1);
        this.DataBinderJS.appendDataRowToOutwardDetailTable(item);
        this.calculateSumAmount();
    }


    /**
     * Click chọn một chứng từ trên bảng master
     * @param {any} sender
     */

    onSelectRef(sender) {
        var ref = sender.currentTarget;
        var _this = this;
        $('.outward-master-table tr').removeClass("selected-row");
        $(ref).addClass("selected-row");
        var refID = $(ref).data("RefID");
        var url = "/refdetail/" + refID;
        this.AjaxJS.get(url, false, function (response) {
            if (response.Success) {
                _this.DataBinderJS.bindDataToRefDetailTable(response.Data);
            }
        })
    }

    /**
     * Tính toán tổng tiền trong bảng chi tiết
     */

    calculateSumAmount() {
        var sumAmount = 0;
        var rowCount = $('.outward-detail-table tr').length;

        for (var i = 0; i < rowCount-1; i++) {
            var sumAmountItem = $('.outward-detail-table .item-sum-amount')[i];
            var sumAmountItemValue = $(sumAmountItem).val();
            console.log(sumAmountItem);
            sumAmount += formatMoneyToNumber(sumAmountItemValue);
        }

        sumAmount = formatNumberToMoney(sumAmount);
        $('.total-sum-amount').html(sumAmount);
    }


    /**
     * Chọn đối tượng trên combobox đối tượng
     */

    onSelectObject() {
        var objectCode = $(this).attr("objectCode");
        var objectName = $(this).attr("objectName");
        $(".object-code-input").val(objectCode);
        $(".object-code-input").data("AccountObjectID", $(this).data("AccountObjectID"));
        $(".object-name-input").val(objectName);
        $(".object-code-input").trigger("blur");
    }

    /**
     * Lựa chọn chi nhánh 
     */

    onSelectBranch() {
        var targetElement = $(this).parent().data("target");
        $(targetElement).data("StockID", $(this).data("StockID"));
        $(targetElement).html($(this).html());
    }

    /**
     * Bắt sự kiện click vào nút lưu trên dialog
     * */
    onClickSaveRefBtn() {
        if ($(".outward-detail-table tr").length === 1) {
            this.showNotificationDialog(notifyType.MissingDetail);
        } else {
            this.saveRef();
        }
    }

    /**Thực hiện lưu chứng từ
     * */

    saveRef() {
        var _this = this;
        var Ref = {
            RefDate: generateRefDate(),
            RefNo: $('.outward-ref-no').val(),
            RefTypeID: 3,
            AccountObjectID: $('.object-code-input').data('AccountObjectID'),
            JournalMemo: $('.description').val(),
            TotalAmount: formatMoneyToNumber($('.total-sum-amount').html())
        };

        var RefDetailArr = [];

        var recordCount = $(".outward-detail-table tr").length;

        for (var i = 0; i < recordCount - 1; i++) {
            var rowItem = $(".outward-detail-table tr")[i];
            var itemUnitPrice = formatMoneyToNumber($(rowItem).find(".item-unit-price").val());
            var RefDetail = {
                ItemID: $(rowItem).data("ItemID"),
                UnitID: $(rowItem).data("UnitID"),
                UnitPrice: itemUnitPrice,
                StockID: $(rowItem).find(".item-branch").data("StockID"),
                Quantity: parseInt($(rowItem).find(".item-quantity").val())
            }
            RefDetailArr.push(RefDetail);
        }

        var RefSaveData = {
            Ref: Ref,
            RefDetail: RefDetailArr
        }

        console.log(RefSaveData);

        var url = "/ref";
        this.AjaxJS.post(url, true, RefSaveData, function (response) {
            if (response.Success) {
                console.log(response.Data);
                _this.DialogOutwardRef.close();
            }

        });
        this.getOutwardRefs();
    }

    /**
     * Hiển thị icon khi click vào ô mã sản phẩm trong bảng chọn mặt hàng
     * * @param {any} sender
     */

    showNotificationDialog(type) {
        switch (type) {
            case notifyType.MissingDetail:
                $(".notify-dialog-content").html(Resource.MustHaveAtLeastOneDetail);
                var dialogIcon = `<div class="popup-warning-icon popup-icon"></div>`;
                $(".notify-dialog-icon").html(dialogIcon);
                break;
        }
        this.DialogNotification.open();
    }

    focusOnItemCodeInput() {
        $(this).siblings().addClass('show');
    }

    onFocusEndtab() {
        $('.outward-detail-table tr:first-child  td:first-child input').focus();
    }

    onFocusStarttab() {
        $('.outward-detail-table tr:last-child  td:first-child input').focus();
    }

    onDeleteItemDetailRow() {
        var recordCount = $(".record-count").val();
        $(".record-count").val(recordCount - 1);
        $(this).parent().parent().remove();
        $('.outward-detail-table tr:last-child  td:first-child input').focus();
    }
}
