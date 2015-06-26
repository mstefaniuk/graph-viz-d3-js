require.config({
  baseUrl: "js",
  paths: {
    parser: 'parser',
    d3: '../lib/d3/d3',
    ace: '../lib/ace',
    worker: '../lib/requirejs-web-workers/worker'
  }
});

require(["renderer", 'pegace', "ace/ace", "ace/lib/lang", "ace/ext/statusbar"],
  function (renderer, pegace, ace, lang, statusbar) {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode("ace/mode/dot");
    var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
    new StatusBar(editor, document.getElementById('editor-bar'));

    renderer.init("#graph");
    renderer.render(editor.getValue());

    var messages = {
      syntax: "Syntax error near",
      keyword: "Unknown keyword",
      attribute: "Unknown attribute",
      unterminated: "Unterminated structure starting"
    };

    var update = lang.delayedCall(function () {
      var result = pegace.lint(editor.getValue());
      if (result.clean) {
        renderer.render(editor.getValue());
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

