class DrawerJS {
    drawComboboxData(comboboxName, fieldInfo) {
        var comboboxElement =
                ` <div class="dropdown-content" comboboxName=${comboboxName}>
                    <div class="thead-dropdown">
                        <div class="div-upper-scroll"></div>
                    </div>
                    <div class="tbody-dropdown">
                        <table class="table">
                            <tbody class="></tbody>
                        </table>
                    </div>
                </div>`;
        $('body').append(comboboxElement);

        console.log($('.dropdown-content[comboboxName=' + comboboxName + ']'));
    }
}