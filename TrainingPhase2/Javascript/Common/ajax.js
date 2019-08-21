class AjaxJS {
    constructor() {
    }

    get(url, async, callback) {
        $.ajax({
            method: "GET",
            url: url,
            async: async,
            datatype: JSON.stringify(),
            success: function (response) {
                callback(response)
            },
            fail: function (err) {
                console.log(err);
            }
        });
    }

    post(url, async, params, callback) {
        $.ajax({
            method: "POST",
            url: url,
            async: async,
            data: params,
            datatype: JSON.stringify(),
            success: function (response) {
                callback(response)
            },
            fail: function (err) {
                console.log(err);
            }
        });
    }

}