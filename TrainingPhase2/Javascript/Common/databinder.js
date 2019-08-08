class DataBinderJS {
    constructor() {
    }

    /**
     * Binding dữ liệu vào bảng phiếu xuất kho
     * @param {any} data : mảng các phiếu xuất kho
     * Createby NMDuy 25/07/2019
     */
    bindDatatoExportMasterTable(data) {
        $(".export-master-table").html("");
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                var row = `<tr class="f5f5f5-background" id="${data[i].id}">
                            <td class="text-align-center width-170">${data[i].receiptDate}</td>
                            <td class=" width-230 receipt-number-cell">${data[i].receiptNumber}</td>
                            <td class=" width-250">${data[i].objectName}</td>
                            <td class=" width-170 text-align-right">${data[i].sumMoney}</td>
                            <td class="">${data[i].exportExplain}</td>
                            <td class=" width-368">${data[i].receiptType}</td>
                        </tr>`;
            } else {
                var row = `<tr id="${data[i].id}">
                            <td class="text-align-center width-170">${data[i].receiptDate}</td>
                            <td class=" width-230 receipt-number-cell">${data[i].receiptNumber}</td>
                            <td class=" width-250">${data[i].objectName}</td>
                            <td class=" width-170 text-align-right">${data[i].sumMoney}</td>
                            <td class="">${data[i].exportExplain}</td>
                            <td class=" width-368">${data[i].receiptType}</td>
                        </tr>`;
            }
            $('.export-master-table').append(row);
        }

        $("#sumMoneyMasterTable").html("53.000.000");
    }

    /**
     * Bindind dữ liệu vào bảng chi tiết các mặt hàng
     * @param {any} data : mảng chi tiết các mặt hàng
     * Createby NMDuy 25/07/2019
     */

    bindDetailExportReceiptData(data) {
        $.each(data, function (index, item) {
            var row = `<tr>
                        <td>${item.itemCode}</td>
                        <td>${item.itemName}</td>
                        <td>${item.storePlace}</td>
                        <td>${item.countUnit}</td>
                        <td class="text-align-right">${item.unitPrice}</td>
                        <td class="text-align-right">${item.amount}</td>
                        <td class="text-align-right">${item.sumMoney}</td>
                    </tr>`;
            $('.export-detail-table').append(row);
        })
    }

    /**
     * binding dữ liệu combobox và sắp xếp
     * @param {any} comboboxName tên combobox
     * @param {any} comboboxData dữ liệu combobox
     * Createby NMDuy 25/07/2019
     * 
     */

    bindingComboboxData(comboboxName, comboboxData) {
        switch (comboboxName) {
            case "object":
                comboboxData = comboboxData.sort(function (a, b) {
                    var fullNameA = a.name.split(" ");
                    var firstNameA = fullNameA[fullNameA.length - 1];
                    var fullNameB = b.name.split(" ");
                    var firstNameB = fullNameB[fullNameB.length - 1];
                    if (firstNameA < firstNameB) return -1;
                    if (firstNameA > firstNameB) return 1;
                    if (firstNameA == firstNameB) {
                        if (a.objectTypeOrder > b.objectTypeOrder) {
                            return -1;
                        } else if (a.objectTypeOrder < b.objectTypeOrder) {
                            return 1;
                        } else {
                            if (a.code > b.code) {
                                return 1;
                            } else {
                                return -1;
                            }
                        }
                    }
                    return 0;
                });
                $(".object-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = `<tr customerRepaymentId="${item.id}" objectAddress="${item.address}" objectCode="${item.code}" objectName="${item.name}"> <td width="130px">${item.code}</td> <td width="250px" class="center-td">${item.name}</td> <td width="150px">${item.type}</td></tr >`;
                    $(".object-combobox-data").append(row);
                });
                $(".object-combobox-data").children().first().addClass('selected-row');

                break;

            case "product":
                $(".product-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = `<tr itemCode="${item.itemCode}" itemName="${item.itemName}" storePlace="${item.storePlace}" countUnit="${item.countUnit}" unitPrice="${item.unitPrice}" amount="${item.amount}" sumMoney="${item.sumMoney}">
                        <td width="130px">${item.itemCode}</td> <td width="250px" class="center-td">${item.itemName}</td>
                     </tr >`;
                    $(".product-combobox-data").append(row);
                });
                $(".product-combobox-data").children().first().addClass('selected-row');
                break;
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
        var row =
            `<tr>
                <td class="no-padding-cell width-150">
                    <div class="dropdown-div">
                        <div class="div-wrap-input-no-border">
                            <input type="text" class="non-border-filter-input item-code-input" name="name" value="${item.itemCode}" tabindex="0" />
                            <div class="icon-in-input item-code-icon arrow-down-dropbox-icon" comboboxName="product" style="display:none">
                            </div>
                            <div class="icon-in-input item-code-icon quick-search-icon" style="display:none">
                            </div>
                        </div>
                    </div>
                </td>
                <td class="disabled-cell"> ${item.itemName} </td>
                <td class="no-padding-cell width-180">
                    <div class="dropdown">
                        <div class="hover-pointer branch-dropdown-cell" data-toggle="dropdown">
                            <div class="detail-tbl-branch-dropbox"> Chi nhánh Cầu Giấy </div>
                            <div class="icon-in-input" tabindex="0"> <i class="fa fa-caret-down"></i></div>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a href="#"> <span> = </span> : Bằng </a></li>
                            <li><a href="#"> <span> > </span>: Lớn hơn</a></li>
                            <li><a href="#"> <span> >= </span> : Lớn hơn hoặc bằng </a></li>
                            <li><a href="#"> <span> < </span> : Nhỏ hơn</a></li>
                            <li><a href="#"> <span> <= </span> : Nhỏ hơn hoặc bằng</a></li>
                        </ul>
                    </div>
                </td>
                <td class="disabled-cell width-90"> ${item.countUnit} </td>
                <td class="no-padding-cell width-100"> <input type="text" class="positive-num-input text-align-right non-border-filter-input" tabindex="0" value="${item.unitPrice}" /> </td>
                <td class="no-padding-cell width-90">
                    <div style="display: flex">
                        <input type="text" class="positive-num-input text-align-right non-border-filter-input" value="1" tabindex="0" />
                        <div class="up-down-arrow"> <div class="amount-arrow arrow-up"></div> <div class="amount-arrow arrow-down"></div> </div>
                    </div>
                </td>
                <td class="no-padding-cell width-100"> <input type="text" class="positive-num-input text-align-right non-border-filter-input" value="${item.unitPrice}" tabindex="0" /> </td>
                <td class="no-padding-cell width-40">
                    <div class="garbage-icon common-icon" tabindex="0"></div>
                </td>
            </tr>`;
        $('.outward-detail-table').append(row);


    }
}