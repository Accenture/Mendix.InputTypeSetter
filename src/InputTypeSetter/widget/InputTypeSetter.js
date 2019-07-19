define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",
    "dojo/dom-attr",

], function (declare, _WidgetBase, lang, dojoAttr) {
    "use strict";

    return declare("InputTypeSetter.widget.InputTypeSetter", [ _WidgetBase ], {

        // modeler params
        widgetsSelector: '',
        prefix: 'set-',
        separator: '-',

        postCreate: function () {
            //logger.debug(this.id + ".postCreate");
            this.domNode.style.display = "none";
            this.widgetsSelector = this.widgetsSelector || 'div.form-group[class*=mx-name-textBox]';
        },

        update: function (obj, callback) {
            //logger.debug(this.id + ".update");
            this._updateRendering(callback);
        },

        _updateRendering: function (callback) {
            //logger.debug(this.id + "._updateRendering");
            this._setAttributes();
            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            //logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        },

        // set single input attribute
        _setAttrib: function (targetElem, attrib, value) {
            logger.debug(this.id + ': setting ' + attrib + '="' + value + '" for ' + targetElem.tagName + '#' + targetElem.id);
            dojoAttr.set(targetElem, attrib, value);
        },

        // main job function
        _setAttributes: function () {
            //logger.debug(this.id + "._setAttributes");
            var _this = this;
            var parents = Array.prototype.slice.call( // NodeList to Array, cross-browser safe
                document.querySelectorAll(this.widgetsSelector)
            );
            parents.forEach(function (parent) {

                // set by widgetid staring with mxui_widget_NumberInput_
                var numberInput = parent.querySelector('input[type=text][widgetid^="mxui_widget_NumberInput_"]');
                if (numberInput) {
                    _this._setAttrib(numberInput, 'type', 'number');
                }

                // set by CSS class
                parent.className.split(' ')
                    .filter(function (cssClass) {return cssClass.startsWith(_this.prefix)})
                    .forEach(function (cssClass) {
                        var parts = cssClass.replace(_this.prefix, '').split(_this.separator);
                        if (parts.length == 2) {
                            var attrib = parts[0];
                            var value = parts[1];
                            var targetInputs = Array.prototype.slice.call(parent.querySelectorAll('input'));
                            targetInputs.forEach(function (targetInput) {
                                _this._setAttrib(targetInput, attrib, value);
                            });
                        }
                    });

                // fix missing label.for
                var labelElem = parent.querySelector('label.control-label');
                var controlElem = parent.querySelector('.form-control');
                if (labelElem && controlElem && !dojoAttr.get(labelElem, 'for')) {
                    _this._setAttrib(labelElem, 'for', dojoAttr.get(controlElem, 'id'));
                }
            });
        }
    });
});

require(["InputTypeSetter/widget/InputTypeSetter"]);
