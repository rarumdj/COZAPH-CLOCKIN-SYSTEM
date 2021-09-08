$(document).ready(function () {
    var tags = $("textarea#tags").tagsinput({
        delimiter: ",",
    });

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function replaceAll(str, term, replacement) {
        return str.replace(new RegExp(escapeRegExp(term), "g"), replacement);
    }

    tinymce.init({
        selector: "#mytextarea",
        element_format: "html",
        entity_encoding: "raw",
        autosave_ask_before_unload: false,

        plugins:
            "legacyoutput autolink advlist anchor autoresize autosave charmap code colorpicker contextmenu directionality emoticons hr image imagetools insertdatetime layer link lists media nonbreaking pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        //   toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
        // convert_newlines_to_brs : true,
        // force_br_newlines : true,
        // forced_root_block: false ,

        setup: function (ed) {
            ed.on("mouseover", function (e) {
                var temp = tinyMCE.activeEditor.getContent();
                var res = replaceAll(temp, "\n", "<br>");
                $("#content").text(temp);
            });

            ed.on("click", function (e) {
                var temp = tinyMCE.activeEditor.getContent();
                var res = replaceAll(temp, "\n", "<br>");

                $("#content").text(temp);
            });

            ed.on("change", function (e) {
                var temp = tinyMCE.activeEditor.getContent();
                var res = replaceAll(temp, "\n", "<br>");

                $("#content").text(temp);
            });

            ed.on("keyup", function () {
                var temp = tinyMCE.activeEditor.getContent();
                var res = replaceAll(temp, "\n", "<br>");

                $("#content").text(temp);
            });
        },
    });

    $("#showBcc").on("click", function (e) {
        $(".hideBcc").removeClass("hideBcc").addClass("showBcc");
        e.preventDefault();
    });

    $("#showCc").on("click", function (e) {
        $(".hideCc").removeClass("hideCc").addClass("showCc");
        e.preventDefault();
    });

    $("#hideBcc").on("click", function (e) {
        $(".showBcc").removeClass("showBcc").addClass("hideBcc");
        e.preventDefault();
    });

    $("#hideCc").on("click", function (e) {
        $(".showCc").removeClass("showCc").addClass("hideCc");
        e.preventDefault();
    });

    $(document).on("change", "#customSwitch", function () {
        if (this.checked) {
            $(".mtime").removeClass("hidetime").addClass("showtime");
        } else if (!this.checked) {
            $(".mtime").removeClass("showtime").addClass("hidetime");
        }
    });
});
