var colorChanger = {
    addDiv: function () {
        var defaultDiv  = document.getElementById("inputDiv");
        var newDiv      = defaultDiv.cloneNode(true);

        document.getElementById("containerDiv").appendChild(newDiv);
        colorChanger.getTextTags();
    },

    getTextTags: function () {
        var tags    = new Array();
        tags        = getTags(tags, $('#frame')[0].contentDocument.children);
        var id      = [];
        var cls     = [];
        var gen     = [];

        for (var i = 0; i < tags.length; i++) {
            if (tags[i][0] == "#")
                id.push(tags[i]);
            else if (tags[i][0] == ".")
                cls.push(tags[i]);
            else
                gen.push(tags[i]);
        }

        var tags = id.concat(cls.concat(gen));
        updateInputs(tags);
    },
    updateInputs: function (tags) {
        var inputs = $('#containerDiv').children();
        var tagStr = "";

        for (var k = 0; k < tags.length; k++) {
            tagStr += "<option>" + tags[k] + "</option>";
        }
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].children[0].innerHTML = tagStr;
        }
    },
    makeIframe: function () {
        var HTMLstr = $('#textArea').val();
        var blob    = new Blob([HTMLstr], { type: "text/html" });
        var url     = URL.createObjectURL(blob);

        $('#frame').attr('src', url);
        setTimeout(getTextTags, 100);
    },
    getTags: function () {
        //Need to check for duplicates
        for (var i = 0; i < node.length; i++) {
            if ($.inArray(node[i].localName, arr) == -1)
                arr.push(node[i].localName);

            if (node[i].id != "" && $.inArray(node[i].id, arr) == -1) arr.push("#" + node[i].id);
            if (node[i].className != "" && $.inArray(node[i].id, arr) == -1) arr.push("." + node[i].className);
            arr.concat(getTags(arr, node[i].children));
        }
        return arr;
    },
    updateIframe: function () {
        var styles = $('#containerDiv').children();
        for (var i = 0; i < styles.length; i++) {
            var child = styles[i].children;
            $('#frame').contents().find(child[0].value).css(child[1].value, child[2].value);
        }
    }
}
$(document).ready(colorChanger.makeIframe());