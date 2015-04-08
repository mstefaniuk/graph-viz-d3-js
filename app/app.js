require.config({
  baseUrl: "js",
  paths: {
    parser: 'parser',
    d3: '../lib/d3/d3',
    ace: '../lib/ace'
  }
});

require(["stage", 'pegace', "ace/ace", "ace/lib/lang", "ace/ext/statusbar"],
  function (stage, pegace, ace, lang, statusbar) {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode("ace/mode/dot");
    var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
    var statusBar = new StatusBar(editor, document.getElementById('editor-bar'));

    stage.init();

    var worker = new Worker("js/d3dot-worker.js");
    worker.onmessage = function (event) {
      switch (event.data.type) {
        case "ready":
          worker.postMessage(editor.getValue());
          break;
        case "stage":
          stage.draw(event.data.body);
          break;
      }
    };

    var messages = {
      syntax: "Syntax error near",
      keyword: "Unknown keyword",
      attribute: "Unknown attribute",
      unterminated: "Unterminated structure starting"
    };

    var update = lang.delayedCall(function () {
      var result = pegace.lint(editor.getValue());
      if (result.clean) {
        worker.postMessage(editor.getValue());
        editor.getSession().clearAnnotations();
      } else {
        var annotations = result.errors.map(function (e) {
          var c = editor.getSession().getDocument().indexToPosition(e.pos);
          c.text = [messages[e.type], " '", e.string, "'."].join('');
          c.type = "error";
          return c;
        });
        editor.getSession().setAnnotations(annotations);
      }
    });
    editor.on("change", function () {
      update.delay(600);
    });
  }
);

