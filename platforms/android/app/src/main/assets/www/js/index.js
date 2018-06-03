/**
 * Utility to get default value from the field name if it was undefined or empty
 * @param {type} fieldName
 * @param {type} defaultValue
 * @returns {jQuery}
 */
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isNumber(str) {
    return str.length === 1 && str.match(/[0-9]/);
}

function get_name_value(fieldName, defaultValue) {
    var value = $('#' + fieldName).val();
    if (value == "") {
        value = defaultValue;
        $('#' + fieldName).val(value);
    }
    if (fieldName == "name") {
        if (!(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))) {
            alert("Please enter the correct value");
            return "";
        }
    }
    return value;
}

/**
 * This is the main app class
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        function GetWidget() {
            // TODOs come in here:  add patterm of  this.start = function () { ...} from TMA03 skeleton

            this.currentWidget = function(){
                var oucu = get_name_value("oucu");
                var widgn = get_name_value("widgetID");
                if (widgn != undefined){

                    var get_param = "http://137.108.93.222/openstack/api/widgets/" + widgn + "?OUCU=user1&password=password";
                    //alert(get_param);
                    $.get(get_param, function (data) {
                        alert("back from get with data=" + data);
                        var obj = $.parseJSON(data);
                        if (obj.status == "error") {
                            alert(obj.message);
                        } else {
                            var desc = obj.data[0].description;   //  Table 1 of EMA indicates that data return is an array
                            //   alert("descript= " + desc);
                            $('#descr').text(desc);
                            
                            var pr = obj.data[0].pence_price;
                            //    alert("price= " + pr);
                            //$('#price') = pr;
                            document.getElementById('price').innerHTML = pr;
                            var url_image = obj.data[0].url;
                            alert(url_image);
                            document.getElementById('image').innerHTML = '<img src="' + url_image + '" />';   // This may require some Googling
                            
                        }
                    });
                }
                else{
                    alert('Please enter a valid widget id (in range 8 to 17)');
                }
            };

            this.nextWidget = function () {
                var oucu = get_name_value("oucu");
                var widgn = get_name_value("widgetID");
                if (widgn != undefined){
                    widgn = parseInt(widgn) + 1;
                    if (widgn == 18){
                        widgn = 8;
                    }
                    widgn = widgn.toString();

                    var get_param = "http://137.108.93.222/openstack/api/widgets/" + widgn + "?OUCU=user1&password=password";
                    //alert(get_param);
                    $.get(get_param, function (data) {
                        alert("back from get with data=" + data);
                        var obj = $.parseJSON(data);
                        if (obj.status == "error") {
                            alert(obj.message);
                        } else {
                            var desc = obj.data[0].description;   //  Table 1 of EMA indicates that data return is an array
                            //   alert("descript= " + desc);
                            $('#descr').text(desc);
                            
                            var pr = obj.data[0].pence_price;
                            //    alert("price= " + pr);
                            //$('#price') = pr;
                            document.getElementById('price').innerHTML = pr;
                            var url_image = obj.data[0].url;
                            alert(url_image);
                            document.getElementById('image').innerHTML = '<img src="' + url_image + '" />';   // This may require some Googling
                            
                            document.getElementById('widgetID').value = widgn;
                            
                        }
                    });
                }
                else{
                    alert('Please enter a valid widget id (in range 8 to 17)');
                }
            };

            this.prevWidget = function () {
                var oucu = get_name_value("oucu");
                var widgn = get_name_value("widgetID");
                if (widgn != undefined){
                    widgn = parseInt(widgn) - 1;
                    if (widgn == 7){
                        widgn = 17;
                    }
                    widgn = widgn.toString();
                    //alert('need to get widget id: ' + widgn);

                    var get_param = "http://137.108.93.222/openstack/api/widgets/" + widgn + "?OUCU=user1&password=password";
                    //alert(get_param);
                    $.get(get_param, function (data) {
                        //alert("back from get with data=" + data);
                        var obj = $.parseJSON(data);
                        if (obj.status == "error") {
                            alert(obj.message);
                        } else {
                            var desc = obj.data[0].description;   //  Table 1 of EMA indicates that data return is an array
                            //   alert("descript= " + desc);
                            $('#descr').text(desc);
                            
                            var pr = obj.data[0].pence_price;
                            //    alert("price= " + pr);
                            //$('#price') = pr;
                            document.getElementById('price').innerHTML = pr;
                            var url_image = obj.data[0].url;
                            alert(url_image);
                            document.getElementById('image').innerHTML = '<img src="' + url_image + '" />';   // This may require some Googling
                            
                            document.getElementById('widgetID').value = widgn;
                            
                        }
                    });
                }
                else{
                    alert('Please enter a valid widget id (in range 8 to 17)');
                }
            };
        }
        this.getWidget = new GetWidget();
    }
};

app.initialize();