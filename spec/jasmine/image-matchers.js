define(["imagediff"], function(imagediff) {

  function toCanvas (object) {
    var
      data = imagediff.toImageData(object),
      canvas = imagediff.createCanvas(data.width, data.height),
      context = canvas.getContext('2d');

    context.putImageData(data, 0, 0);
    return canvas;
  }

  function imageDiffEqualMessage (actual, expected) {
    var
      diff    = imagediff.diff(actual, expected),
      canvas  = imagediff.createCanvas(),
      context;

    canvas.height = diff.height;
    canvas.width  = diff.width;

    context = canvas.getContext('2d');
    context.putImageData(diff, 0, 0);
    var diffImage = canvas.toDataURL();

    var actualImage = toCanvas(actual).toDataURL();
    var expectedImage = toCanvas(expected).toDataURL();

    return 'Image "' + actualImage + '" is not equal image "' + expectedImage +
      '" and it gives following difference image "' + diffImage + '".';
  }

  return {

    toBeImageData : function () {
      return {
        compare: function (actual) {
          return {
            pass: imagediff.isImageData(actual)
          };
        }
      };
    },

    toImageDiffEqual: function () {
      return {
        compare: function (actual, expected, tolerance) {
          var
            result = {};

          result.pass = imagediff.equal(actual, expected, tolerance);
          if (typeof (document) !== 'undefined') {
            result.message = imageDiffEqualMessage(actual, expected);
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