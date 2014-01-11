define(['parser/dot'], function(dot) {
  return {
    lint: function(source) {
      var result;
      try {
        result = dot.parse(source, {
          pegace:{
            mode: 'lint'
          }
        });
      } catch(e) {
        console.log(e);
        result = {
          clean: false,
          level: "fatal",
          exception: e,
          errors: [{
            pos: e.offset,
            text: e.message
          }]
        }
      }
      return result;
    },
    parse: function(source) {
      return dot.parse(source, {
        pegace: {
          mode: 'strict'
        }
      });
    }
  };
});