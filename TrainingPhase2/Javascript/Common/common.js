

$(document).ready(function () {

    //Hiển thị tooltip khi mouseenter icon cảnh báo
    $(document).on("mouseenter", ".exclamation-icon", function () {
        showTooltip(this);
    });

    //Ẩn tooltip khi mouseenter icon cảnh báo
    $(document).on("mouseleave", ".exclamation-icon", function () {
        hideTooltip(this);
    });

    // Xử lý hiển thị tooltip, validate input
    $("input").on({
        focus: function () {
            var divWrapInput = $(this).closest('.div-wrap-input');
            $(divWrapInput).css("border-color", "dodgerblue");
        },
        keyup: function (e) {
            if (e.keyCode !== 9) {
                if ($(this).hasClass('required-input')) {
                    var inputValue = $(this).val().trim();
                    var divWrapInput = $(this).closest('.div-wrap-input');
                    var currentWidth = $(divWrapInput).outerWidth();
                    if (inputValue === '') {
                        if (!$(divWrapInput).next().hasClass('exclamation-icon')) {
                            var exclamationIcon = `<div class="exclamation-icon"></div>`;
                            $(divWrapInput).css("width", currentWidth - 26 + 'px');
                            $(divWrapInput).after(exclamationIcon);
                            showTooltip($(divWrapInput).next());
                        }
                    } else {
                        $(divWrapInput).next().remove();
                        $(divWrapInput).css("width", currentWidth + 26 + 'px');
                    }
                }
            }
        }

    });


    // Tăng giảm giá trị input khi click vào nút mũi tên tăng giảm
    $(document).on("click", ".amount-arrow", function () {
        var numberInputNearby = $(this).parent().siblings();
        var inputValue = parseInt($(numberInputNearby).val(), 10);
        if ($(this).hasClass("arrow-up")) {
            $(numberInputNearby).val(inputValue + 1);
        } else {
            if (inputValue > 0) {
                $(numberInputNearby).val(inputValue - 1);
            }
        }
    })

    $('input').blur(function (e) {
        var divWrapInput = this.closest('.div-wrap-input');
        var inputValue = $(this).val().trim();
        var currentWidth = $(divWrapInput).outerWidth();
        if (!divWrapInput.isSameNode(e.relatedTarget)) {
            if ($(this).hasClass('required-input')) {
                if (inputValue === '') {
                    $(divWrapInput).css("border-color", "red");
                    var exclamationIcon = `<div class="exclamation-icon"></div>`;
                    if (!$(divWrapInput).next().hasClass('exclamation-icon')) {
                        $(divWrapInput).css("width", currentWidth - 26 + 'px');
                        $(divWrapInput).after(exclamationIcon);
                    } else {
                        hideTooltip($(divWrapInput).next());
                    }
                } else {
                    if ($(divWrapInput).next().hasClass('exclamation-icon')) {
                        $(divWrapInput).next().remove();
                        $(divWrapInput).css("width", currentWidth + 26 + 'px');
                        hideTooltip($(divWrapInput).next());
                    }
                    $(divWrapInput).css("border-color", "#ddd");
                }
            } else {
                $(divWrapInput).css("border-color", "#ddd");
            }
        }
    })

    $(document).on("keypress", ".positive-num-input", validateNumberInput);
    //$(document).on("keyup", ".positive-num-input", displayCustomNumber);
    //$(document).on("focusout", ".positive-num-input", checkNegativeNumber);
    //$(document).on("focus", ".positive-num-input", selectAllValue(this));

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


    $(document).keydown(function (e) {
        even = e || window.event;
        if (e.keyCode === 13) {
            var focused = $(':focus');
            $(focused).trigger("click");
        }
    });

});

// Kiểm tra ký tự hợp lệ khi nhập ô input số

function validateNumberInput(event) {
    var key = window.event ? event.keyCode : event.which;
    var value = $(this).val();
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ((key >= 48 && key <= 57)) {
        return true;
    } else if (key === 45) {
        if (!value.includes('-')) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function selectAllValue(inputElement) {
    $(inputElement).select();
}

/**
 * Hàm hiển thị tooltip
 * @param {any} exclamationElement
 */

function showTooltip(exclamationElement) {
    var tooltipContent = Resource.FieldCannotEmpty;
    var tooltipElement = `<div class="custom-tooltip"> ${tooltipContent} </div>`;
    $(exclamationElement).append(tooltipElement);
    $(exclamationElement).children().css('display', 'unset');
}

/**
 * Hàm ẩn tooltip
 * @param {any} exclamationElement
 */

function hideTooltip(exclamationElement) {
    $(exclamationElement).html('');
    $(exclamationElement).children().css('display', 'none');
}


/**
 * Lấy ngày hiện tại
 * Createby NMDuy 25/07/2019
 */

function getCurrentDate() {
    var toDay = new Date();
    return formatDate(toDay);
}

/**
 * Lấy giờ hiện tại 
 * Createby NMDuy 25/07/2019
 * */

function getCurrentTime(){
    var now = new Date();
    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();
    var currentTime = '';
    if (currentHour < 10) currentHour = '0' + currentHour;
    if (currentMinute < 10) currentMinute = '0' + currentMinute;
    currentTime = currentHour + ":" + currentMinute;
    return currentTime;
}


/**
 * Format ngày truyền vào sang định dạng dd/MM/yyyy
 * @param {any} date : ngày cần formmat
 * Createby NMDuy 25/07/2019
 */

function formatDate(date) {
    var date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var formatedDate = dd + '/' + mm + '/' + yyyy;
    return formatedDate;
}

/**
 * Xử lý chuyển đổi từ thời gian tương đối sang ngày cụ thể
 * Createby NMDuy 25/07/2019
 */

function changeDateTimeByCase(val, dtpElementStart, dtpElementEnd) {
    var datetime = new Date();
    var startDate;
    var endDate;
    switch (val) {
        //set thời gian cho hôm nay
        case '1':
            startDate = datetime;
            endDate = datetime;
            break;
        //hôm qua
        case '2':
            startDate = new Date(datetime.setDate(datetime.getDate() - 1));
            endDate = startDate;
            $(dtpElementStart).val(formatDate(startDate));
            $(dtpElementEnd).val(formatDate(endDate));
            break;
        //tuần này
        case '3':
            startDate = new Date(datetime.setDate(datetime.getDate() - datetime.getDay()));
            endDate = new Date();
            break;
        //tuần trước
        case '4':
            startDate = new Date(datetime.setDate(datetime.getDate() - 7 - datetime.getDay()));
            endDate = new Date(new Date().setDate(startDate.getDate() + 6));
            break;
        //tháng này
        case '5':
            startDate = new Date(datetime.setDate(1));
            endDate = new Date();
            break;
        //tháng trước
        case '6':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 1));
            startDate.setDate(1);
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            break;
        //quý này
        case '7':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - parseInt(datetime.getMonth() % 3)));
            startDate.setDate(1);
            endDate = new Date();
            break;
        //quý trước
        case '8':
            startMonth = (parseInt(datetime.getMonth() / 3) - 1) * 3;
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 3 - parseInt(datetime.getMonth() % 3)));
            startDate.setDate(1);
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
            break;
        //6 tháng trước
        case '9':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 6));
            startDate.setDate(1);
            datetime = new Date();
            endDate = new Date(datetime.setMonth(datetime.getMonth()));
            endDate.setDate(0);
            break;
        //năm nay
        case '10':
            startDate = new Date(datetime.getFullYear(), 0, 1);
            endDate = new Date();
            break;
        //năm trước
        case '11':
            startDate = new Date(datetime.getFullYear() - 1, 0, 1);
            endDate = new Date(datetime.getFullYear() - 1, 12, 0);
            break;
        //khác
        case '12':
            break;
    }
    $(dtpElementStart).val(formatDate(startDate));
    $(dtpElementEnd).val(formatDate(endDate));
}

/**
 * Kiểm tra 2 ngày bằng nhau
 * @param {any} stringDateA : ngày 1
 * @param {any} stringDateB : ngày 2
 * Createby NMDuy 25/07/2019
 */

function checkEqualDate(stringDateA, stringDateB){
    stringDateA = convertToISODate(stringDateA);
    stringDateB = convertToISODate(stringDateB);
    var dateA = stringDateA.getDate();
    var dateB = stringDateB.getDate();
    var monthA = stringDateA.getMonth();
    var monthB = stringDateB.getMonth();
    var yearA = stringDateA.getFullYear();
    var yearB = stringDateB.getFullYear();
    if(dateA == dateB && monthA == monthB && yearA == yearB){
        return true;
    } else {
        return false;
    }
}

/**
 * Convert sang ngày chuẩn
 * @param {any} date : ngày truyền vào 
 * Createby NMDuy 25/07/2019
 */

function convertToISODate(date) {
    var date = date.split("/");
    var dd = date[0];
    var mm = date[1];
    var yyyy = date[2];
    var newDate = yyyy + '/' + mm + '/' + dd;
    return new Date(newDate);
}

/**
     * format tiền ra định dạng số nguyên
     * @param {any} stringNumber: giá trị số định dạng tiền
     */

function formatMoneyToNumber(stringNumber){
    return parseInt(stringNumber.split('.').join(''));
}

/**
 * format số ra định dạng tiền
 * @param {any} stringNumber: giá trị số
 */

function formatNumberToMoney(value) {
    value = value.toString();
    var plain = value.split('.').join('');
    var reversed = plain.split('').reverse().join('');
    var reversedWithDots = reversed.match(/.{1,3}/g).join('.');
    var normal = reversedWithDots.split('').reverse().join('');
    return normal;
}
