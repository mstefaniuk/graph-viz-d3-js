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

    xit("should generate bspline as path", function() {

    });

    xit("should generate polyline as path", function() {
      
    });
  });
});