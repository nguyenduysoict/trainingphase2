class DataBinderJS {
    constructor() {
    }

    /**
     * Binding dữ liệu vào bảng phiếu xuất kho
     * @param {any} data : mảng các phiếu xuất kho
     * Createby NMDuy 25/07/2019
     */
    bindDataToMasterTable(data) {
        console.log(data);
        $('.outward-master-table').html('');
        $.each(data, function (index, item) {
            var data = splitDateAndTime(item.RefDate);
            var row = `
                        <tr>
                            <td class="column-1-master-tbl"> ${data.refDate} </td>
                            <td class="column-2-master-tbl"> ${item.RefNo} </td>
                            <td class="column-3-master-tbl"> ${item.AccountObjectName} </td>
                            <td class="column-4-master-tbl"> ${item.TotalAmount} </td>
                            <td class="column-5-master-tbl"> ${item.JournalMemo} </td>
                            <td class="column-6-master-tbl"> ${item.RefTypeName} </td>
                        </tr>`;
            $('.outward-master-table').append(row);
            $('.outward-master-table tr:last-child').data('RefID', item.RefID);
            $('.outward-master-table tr:last-child').data('RefTime', data.refTime);
            $('.outward-master-table tr:last-child').data('AccountObjectID', item.AccountObjectID);
        })

        
    }

    /**
     * Bindind dữ liệu vào bảng chi tiết các mặt hàng
     * @param {any} data : mảng chi tiết các mặt hàng
     * Createby NMDuy 25/07/2019
     */

    bindDataToRefDetailTable(data) {
        console.log(data);
        $('.ref-detail-table').html('');
        $.each(data, function (index, item) {
            var row = `<tr>
                        <td>${item.SKUCode}</td>
                        <td>${item.ItemName}</td>
                        <td>${item.StockName}</td>
                        <td>${item.UnitName}</td>
                        <td class="text-align-right">${item.UnitPrice}</td>
                        <td class="text-align-right">${item.Quantity}</td>
                        <td class="text-align-right">${item.UnitPrice}</td>
                    </tr>`;
            $('.ref-detail-table').append(row);
        });
    }

    /**
     * binding dữ liệu combobox và sắp xếp
     * @param {any} comboboxName tên combobox
     * @param {any} comboboxData dữ liệu combobox
     * Createby NMDuy 25/07/2019
     * 
     */


    bindComboboxData(comboboxName, comboboxData) {
        switch (comboboxName) {
            case "object":
                comboboxData = comboboxData.sort(function (a, b) {
                    if (a.AccountObjectType > b.AccountObjectType) {
                        return -1;
                    } else if (a.AccountObjectType < b.AccountObjectType) {
                        return 1;
                    } else {
                        if (a.AccountObjectCode > b.AccountObjectCode) {
                            return 1;
                        } else if (a.AccountObjectCode < b.AccountObjectCode) {
                            return -1;
                        } else {
                            var fullNameA = a.AccountObjectName.split(" ");
                            var firstNameA = fullNameA[fullNameA.length - 1];
                            var fullNameB = b.AccountObjectName.split(" ");
                            var firstNameB = fullNameB[fullNameB.length - 1];
                            if (firstNameA < firstNameB) return -1;
                            if (firstNameA > firstNameB) return 1;
                        }
                    }
                    return 0;
                });
                $(".object-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = `<tr class="display-table-row combobox-row" objectCode="${item.AccountObjectCode}" objectName="${item.AccountObjectName}"> <td width="130px">${item.AccountObjectCode}</td> <td width="250px" class="center-td">${item.AccountObjectName}</td> <td width="150px">${item.TypeName}</td></tr >`;
                    $(".object-combobox-data").append(row);
                    $(".object-combobox-data tr:last-child").data("AccountObjectID", item.AccountObjectID);
                });
                $(".object-combobox-data").children().first().addClass('selected-row');
                break;

            case "product":
                $(".product-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = `<tr class="display-table-row" itemCode="${item.SKUCode}" itemName="${item.ItemName}" countUnit="${item.UnitName}" unitPrice="${item.UnitPrice}">
                        <td width="130px">${item.SKUCode}</td> <td width="250px" class="center-td">${item.ItemName}</td>
                     </tr >`;
                    $(".product-combobox-data").append(row);
                    $(".product-combobox-data tr:last-child").data("ItemID", item.ItemID);
                    $(".product-combobox-data tr:last-child").data("UnitID", item.UnitID);

                });
                $(".product-combobox-data").children().first().addClass('selected-row');
                break;
        }
    }

    bindDropdownMenu(dropMenuName, data) {

        switch (dropMenuName) {
            case "branch":
                $(".branch-dropdown-menu").html('');
                $.each(data, function (index, item) {
                    var row = `<li>${item.StockName}</li>`;
                    $(".branch-dropdown-menu").append(row);
                    $(".branch-dropdown-menu li:last-child").data("StockID", item.StockID);
                });
        }
    }

    appendEmptyRowToOutwardDetailTable() {
        var row =
            ` <tr>
                <td class="no-padding-cell width-150">
                    <div class="dropdown-div">
                        <div class="div-wrap-input-no-border">
                            <input type="text" class="non-border-filter-input" placeholder="Tìm tên, mã" tabindex="0" />
                            <div class="icon-in-input arrow-down-dropbox-icon" comboboxName="product">
                            </div>
                            <div class="icon-in-input quick-search-icon">
                            </div>
                        </div>
                    </div>
                </td>
                <td class="disabled-cell"></td>
                <td class="width-180 no-padding-cell"></td>
                <td class="width-90"></td>
                <td class="no-padding-cell width-100"></td>
                <td class="no-padding-cell width-90"></td>
                <td class="no-padding-cell width-100"></td>
                <td class="no-padding-cell width-40"></td>
            </tr>`;
        $('.outward-detail-table').append(row);
    }

    appendDataRowToOutwardDetailTable(item) {
        var SKUCode = $(item).attr("itemCode");
        var ItemName = $(item).attr("itemName");
        var CountUnit = $(item).attr("countUnit");
        var UnitID = $(item).data("UnitID");
        var ItemID = $(item).data("ItemID");
        var UnitPrice = $(item).attr("unitPrice");
        UnitPrice = Math.floor(UnitPrice);
        UnitPrice = formatNumberToMoney(UnitPrice);

        var row =
            `<tr>
                <td class="no-padding-cell width-150">
                    <div class="dropdown-div">
                        <div class="div-wrap-input-no-border">
                            <input type="text" class="non-border-filter-input item-code-input" value="${SKUCode}" tabindex="0" />
                            <div class="icon-in-input item-code-icon arrow-down-dropbox-icon" comboboxName="product" style="display:none">
                            </div>
                            <div class="icon-in-input item-code-icon quick-search-icon" style="display:none">
                            </div>
                        </div>
                    </div>
                </td>
                <td class="disabled-cell"> ${ItemName} </td>
                <td class="no-padding-cell width-180">
                    <div class="dropdown">
                        <div class="hover-pointer branch-dropdown-cell branch-dropdown">
                            <div class="detail-tbl-branch-dropbox item-branch"> Kho Cầu Giấy </div>
                            <div class="icon-in-input" tabindex="0"> <i class="fa fa-caret-down"></i></div>
                        </div>
                    </div>
                </td>
                <td class="disabled-cell width-90"> ${CountUnit} </td>
                <td class="no-padding-cell width-100"> <input type="text" class="positive-num-input text-align-right non-border-filter-input item-unit-price" tabindex="0" value="${UnitPrice}" /> </td>
                <td class="no-padding-cell width-90">
                    <div style="display: flex">
                        <input type="text" class="positive-num-input text-align-right non-border-filter-input item-quantity" value="1" tabindex="0" />
                        <div class="up-down-arrow"> <div class="amount-arrow arrow-up"></div> <div class="amount-arrow arrow-down"></div> </div>
                    </div>
                </td>
                <td class="no-padding-cell width-100"> <input type="text" class="positive-num-input text-align-right non-border-filter-input item-sum-amount" value="${UnitPrice}" tabindex="0" /> </td>
                <td class="no-padding-cell width-40">
                    <div class="garbage-icon common-icon" tabindex="0"></div>
                </td>
            </tr>`;
        $('.outward-detail-table tr:last-child').before(row);
        $('.outward-detail-table tr:last-child').prev().data("UnitID", UnitID);
        $('.outward-detail-table tr:last-child').prev().data("ItemID", ItemID);
        $('.outward-detail-table tr').find(".item-branch").data("StockID", "d9f483f9-2efb-fd3b-9fee-14c18560182c");

    }
}