// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

(function($) {

    $.fbmodal = function(element, options) {

        var defaults = {
            title:        'FB Modal',
            cancel:       'Cancel',
            okay:         'Okay',

            loading_gif: '/images/loading.gif',

            okaybutton:   true,
            cancelbutton: true,
            buttons:      true,
            opacity:      0.0,
            fadeout:      true,
            overlayclose: true,
            modaltop:     '30%',
            modalwidth:   '',
            onClose:      function(){}
        }

        var fbmodalHtml = ' \
<div id="fbmodal" > \
<div class="popup"> \
<table> \
<tbody> \
<tr> \
<td class="tl"/><td class="b"/><td class="tr"/> \
</tr> \
<tr> \
<td class="b"/> \
<td class="body"> \
<div class="title">\
</div> \
<div class="container">\
<div class="content">\
</div> \
<div class="footer"> \
<div class="right">\
<div class="button_outside_border_blue" id="ok">\
<div class="button_inside_border_blue" id="okay">\
</div>\
</div>\
<div class="button_outside_border_grey" id="close">\
<div class="button_inside_border_grey" id="cancel">\
</div>\
</div>\
</div>\
<div class="clear">\
</div>\
</div> \
</div>\
</td> \
<td class="b"/> \
</tr> \
<tr> \
<td class="bl"/><td class="b"/><td class="br"/> \
</tr> \
</tbody> \
</table> \
</div> \
</div>';

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            var dat = $element.html();
            
            // Add the new modal to the page if one doesn't already exist
            if( !$('#fbmodal').length ) {
                $("body").append(fbmodalHtml);
                $('#fbmodal').css("top", options.modaltop);
            }

            // Add a login spinner whilst we get things sorted
            $('#fbmodal .content')
                .append('<div class="loading"><img src="' + plugin.settings.loading_gif + '"></div>');

            // Hide the okay button if required
            if (options.okaybutton == false || options.buttons == false) {
                $('#fbmodal #ok').hide();
            }

            // Hide the close button if required
            if (options.cancelbutton == false || options.buttons == false) {
                $('#fbmodal #close').hide();
            }

            // Apend the overlay
            $("body").append('<div id="fbmodal_overlay" class="fbmodal_hide"></div>');
            $('#fbmodal_overlay').addClass("fbmodal_overlay").fadeTo(0, options.opacity);

            $('#fbmodal .title').append(options.title);
            $('#fbmodal #okay').append(options.okay);
            $('#fbmodal #cancel').append(options.cancel);
            $('#fbmodal .content').append(dat).css("width", options.modalwidth);
            $('#fbmodal .loading').remove();

            fbWidth();

            // On window resize, resize the modal
            $(window).bind("resize", function () {
                fbWidth();
            });

            // If overlay close is true, 
            if (plugin.settings.overlayclose == true) {
                var overlay = "ok, #close, .fbmodal_hide"
            } else {
                var overlay = "ok, #close"
            }
            $("#" + overlay).click(function () {
                if (options.fadeout == true) {
                    $("#fbmodal").fadeOut(plugin.close());
                } else {
                    plugin.close();
                }
            });
        }

        plugin.close = function() {
            $('#fbmodal_overlay').remove();
            $('#fbmodal').remove();
            $element.removeData('fbmodal');
            console.log( 'closing fbmodal' );
            console.log($element.data('fbmodal'))


            null.settings.onClose.call();
        }

        var closeOverlay = function() {
            $("#fbmodal").remove();
            $('#fbmodal_overlay').removeClass("fbmodal_overlay");
            plugin.settings.onClose.call();
        }

        var preloadImages = function() {
            // Preload Images
            var preload = [new Image(), new Image()]
            $('#fbmodal').find('.b:first, .bl, .br, .tl, .tr').each(function () {
                preload.push(new Image())
                preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
            });
        }

       var fbWidth = function() {
            var windowWidth = $(window).width();
            var fbmodalWidth = $("#fbmodal").width();
            var fbWidth = windowWidth / 2 - fbmodalWidth / 2;
            $("#fbmodal").css("left", fbWidth);
        }

        plugin.init();

    }

    $.fn.fbmodal = function(options) {

        return this.each(function() {
            console.log( 'attempting to setup modal' );
            if (undefined == $(this).data('fbmodal')) {
                console.log( 'modal setup' );
                var plugin = new $.fbmodal(this, options);
                $(this).data('fbmodal', plugin);
            }
        });

    }

})(jQuery);