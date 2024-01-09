$(document).ready(function () {


    var element = $(".bigPoster"); // global variable
    var getCanvas; // global variable
    var newData;

    $(".downloadPoster").on('click', function () {
        html2canvas(element, {
            logging: true,
            useCORS: true,
            onrendered: function (canvas) {
                getCanvas = canvas;
                var imageData = getCanvas.toDataURL("image/png");
                var a = document.createElement("a");
                a.href = imageData; //Image Base64 Goes here
                a.download = "Image.png"; //File name Here
                a.click(); //Downloaded file
            }
        });
    });


});