define(["imagediff"], function(imagediff) {

  function toCanvas (object) {
    var
      data = imagediff.toImageData(object),
      canvas = imagediff.createCanvas(data.width, data.height),
      context = canvas.getContext('2d');

    context.putImageData(data, 0, 0);
    return canvas;
  }

  function imageDiffEqualMessage (actual, expected, diffImage) {
    var actualImage = toCanvas(actual).toDataURL();
    var expectedImage = toCanvas(expected).toDataURL();

    return 'Image "' + actualImage + '" is not equal image "' + expectedImage +
      '" and it gives following difference image "' + diffImage + '".';
  }

  return {

    toImageEqual: function () {
      return {
        compare: function (actual, expected, differences, tolerance) {
          var
            result = {};

          result.pass = differences.rawMisMatchPercentage < tolerance;
          if (typeof (document) !== 'undefined') {
            result.message = imageDiffEqualMessage(actual, expected, differences.getImageDataUrl());
          }
          return result;
        },
        negativeCompare: function (actual, expected, tolerance) {
          return {
            pass: !imagediff.equal(actual, expected, tolerance),
            message: 'Expected not to be equal.'
          };
        }
      };
    }
  };
});