$(document).ready(function () {
  // Global variable
  var element = $("#html-content-holder");

  // Global variable
  var getCanvas;

  html2canvas(element, {
    onrendered: function (canvas) {
      $("#previewImage").append(canvas);
      var getCanvas = canvas;

      var imgageData = getCanvas.toDataURL("image/png");

      // Now browser starts downloading
      // it instead of just showing it
      var newData = imgageData.replace(
        /^data:image\/png/,
        "data:application/octet-stream"
      );

      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", newData);
      a.click();
    },
  });
});
