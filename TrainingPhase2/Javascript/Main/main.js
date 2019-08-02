$(document).ready(function () {
    mainJS = new MainJS();
});

class MainJS {
    constructor() {
        this.Resources = new Resource();
        this.DialogOutwardRef = new Dialog(this.Resources.AddNewOtherOutwardRefDialogTitle, 1000, 700, "dialogOutwardRef");
        this.InitEvents();
    }

    InitEvents() {
        $(document).on("click", "#btnAdd", this.showOutwardRefDialog.bind(this));
    }

    showOutwardRefDialog() {
        this.DialogOutwardRef.open();
    }
}