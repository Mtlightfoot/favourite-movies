$(document).ready(function () {

    let element = $(".bigPoster"); // global variable
    let getCanvas; // global variable
    let newData;

    $(".downloadPoster").on('click', function () {
        html2canvas(element, {
            logging: true,
            useCORS: true,
            onrendered: function (canvas) {
                getCanvas = canvas;
                let imageData = getCanvas.toDataURL("image/png");
                let a = document.createElement("a");
                a.href = imageData; //Image Base64 Goes here
                a.download = "Image.png"; //File name Here
                a.click(); //Downloaded file
            }
        });
    });
});