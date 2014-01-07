define(function (require) {
  var dot = require('parser/dot');

  describe('Parsing directed dots', function () {
    it("Should parse abstract.gv", function () {
      var result = dot.parse(require('text!dots/directed/abstract.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse alf.gv", function () {
      var result = dot.parse(require('text!dots/directed/alf.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse arr_none.gv", function () {
      var result = dot.parse(require('text!dots/directed/arr_none.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse arrows.gv", function () {
      var result = dot.parse(require('text!dots/directed/arrows.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse awilliams.gv", function () {
      var result = dot.parse(require('text!dots/directed/awilliams.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse biological.gv", function () {
      var result = dot.parse(require('text!dots/directed/biological.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust1.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust1.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust2.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust2.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust3.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust3.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust4.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust4.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse clust5.gv", function () {
      var result = dot.parse(require('text!dots/directed/clust5.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse crazy.gv", function () {
      var result = dot.parse(require('text!dots/directed/crazy.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse ctext.gv", function () {
      var result = dot.parse(require('text!dots/directed/ctext.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse dfa.gv", function () {
      var result = dot.parse(require('text!dots/directed/dfa.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse fig6.gv", function () {
      var result = dot.parse(require('text!dots/directed/fig6.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse fsm.gv", function () {
      var result = dot.parse(require('text!dots/directed/fsm.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse grammar.gv", function () {
      var result = dot.parse(require('text!dots/directed/grammar.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse hashtable.gv", function () {
      var result = dot.parse(require('text!dots/directed/hashtable.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse honda-tokoro.gv", function () {
      var result = dot.parse(require('text!dots/directed/honda-tokoro.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse japanese.gv", function () {
      var result = dot.parse(require('text!dots/directed/japanese.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse jcctree.gv", function () {
      var result = dot.parse(require('text!dots/directed/jcctree.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse jsort.gv", function () {
      var result = dot.parse(require('text!dots/directed/jsort.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse KW91.gv", function () {
      var result = dot.parse(require('text!dots/directed/KW91.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse Latin1.gv", function () {
      var result = dot.parse(require('text!dots/directed/Latin1.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse ldbxtried.gv", function () {
      var result = dot.parse(require('text!dots/directed/ldbxtried.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse longflat.gv", function () {
      var result = dot.parse(require('text!dots/directed/longflat.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse mike.gv", function () {
      var result = dot.parse(require('text!dots/directed/mike.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse NaN.gv", function () {
      var result = dot.parse(require('text!dots/directed/NaN.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse nhg.gv", function () {
      var result = dot.parse(require('text!dots/directed/nhg.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse oldarrows.gv", function () {
      var result = dot.parse(require('text!dots/directed/oldarrows.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse pgram.gv", function () {
      var result = dot.parse(require('text!dots/directed/pgram.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse pm2way.gv", function () {
      var result = dot.parse(require('text!dots/directed/pm2way.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse pmpipe.gv", function () {
      var result = dot.parse(require('text!dots/directed/pmpipe.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse polypoly.gv", function () {
      var result = dot.parse(require('text!dots/directed/polypoly.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse proc3d.gv", function () {
      var result = dot.parse(require('text!dots/directed/proc3d.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse psfonttest.gv", function () {
      var result = dot.parse(require('text!dots/directed/psfonttest.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse record2.gv", function () {
      var result = dot.parse(require('text!dots/directed/record2.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse records.gv", function () {
      var result = dot.parse(require('text!dots/directed/records.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse rowe.gv", function () {
      var result = dot.parse(require('text!dots/directed/rowe.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse russian.gv", function () {
      var result = dot.parse(require('text!dots/directed/russian.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse sdh.gv", function () {
      var result = dot.parse(require('text!dots/directed/sdh.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse shells.gv", function () {
      var result = dot.parse(require('text!dots/directed/shells.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse states.gv", function () {
      var result = dot.parse(require('text!dots/directed/states.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse structs.gv", function () {
      var result = dot.parse(require('text!dots/directed/structs.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse switch.gv", function () {
      var result = dot.parse(require('text!dots/directed/switch.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse table.gv", function () {
      var result = dot.parse(require('text!dots/directed/table.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse train11.gv", function () {
      var result = dot.parse(require('text!dots/directed/train11.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse trapeziumlr.gv", function () {
      var result = dot.parse(require('text!dots/directed/trapeziumlr.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse tree.gv", function () {
      var result = dot.parse(require('text!dots/directed/tree.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse triedds.gv", function () {
      var result = dot.parse(require('text!dots/directed/triedds.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse try.gv", function () {
      var result = dot.parse(require('text!dots/directed/try.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse unix.gv", function () {
      var result = dot.parse(require('text!dots/directed/unix.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse unix2.gv", function () {
      var result = dot.parse(require('text!dots/directed/unix2.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse viewfile.gv", function () {
      var result = dot.parse(require('text!dots/directed/viewfile.gv'));
      expect(result.clean).toBe(true);
    });
    it("Should parse world.gv", function () {
      var result = dot.parse(require('text!dots/directed/world.gv'));
      expect(result.clean).toBe(true);
    });
  });
});