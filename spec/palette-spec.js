define(['palette'], function (palette) {

  describe("Palette", function() {
    it("should generate polygon as a path", function() {
      var path = palette.polygon({
        points: [
          [11, 12],
          [21, 22],
          [31, 32],
          [41, 42],
          [51, 52]
        ]
      });
      expect(path).toEqual("M 11,-12 L 21,-22,31,-32,41,-42,51,-52 Z");
    });

    it("should generate ellipse as a path", function() {
      var path = palette.ellipse({
        cx: 11,
        cy: 21,
        rx: 15,
        ry: 16
      });
      expect(path).toEqual("M 11,-21 m -15,0 a 15,16 0 1,0 30,0 a 15,16 0 1,0 -30,0");
    });

    it("should generate circle as a path", function() {
      var path = palette.circle({
        cx: 11,
        cy: 12,
        r: 15
      });
      expect(path).toEqual("M 11,12 m -15,0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0");
    });

    it("should generate rect as a path", function() {
      var path = palette.rect({
        x: 11,
        y: 12,
        width: 20,
        height: 30
      });
      expect(path).toEqual("M 11,12 L 31,12,31,-18,11,-18 Z");
    });

    it("should generate bspline as path", function() {
      var path = palette.bspline({
        points: [
          [11, 51],
          [51, 33],
          [21, 52],
          [11, 62]
        ]
      });
      expect(path).toEqual("M11,51L17.666666666666664,48C24.333333333333332,45,37.666666666666664,39,39.333333333333336,39.166666666666664C41,39.33333333333333,31,45.666666666666664,24.333333333333332,50.5C17.666666666666668,55.33333333333333,14.333333333333332,58.66666666666666,12.666666666666666,60.33333333333333L11,62");
    });

    it("should generate polyline as path", function() {
      var path = palette.polyline({
        points: [
          [5,30],
          [15,30],
          [15,20],
          [25,20],
          [25,10],
          [35,10]
        ]
      });
      expect(path).toEqual("M 5,-30 L 15,-30,15,-20,25,-20,25,-10,35,-10");
    });
  });
});