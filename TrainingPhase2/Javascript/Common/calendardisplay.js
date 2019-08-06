
//Định dạng ngày hiển thị
$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd'
});

$('.date-picker-input').mask("99/99/9999");
$('.time-picker-input').mask("99:99");


//Gán giá trị ngày được chọn cho ô input

$('.date-picker-input').datepicker({
    onSelect: function (dateText) {
        var date = $(this).val();
        $(this).val(formatDate(date));
    }
});

$('.calendar-icon').click(function () {
    $(this).siblings().focus();
});


$('.time-picker-input').timepicker({
    timeFormat: 'H:i',
    show24Hours: false,
    step: 30
});

$('.hour-icon').click(function () {
    $(this).siblings().focus();
});
