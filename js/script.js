$(function () {

    var $win = $(window);

    var $header = $('header');
    if ($header[0].classList.contains('contents') === false) {
        $win.on('scroll load', function () {
            var s = document.documentElement.scrollTop || document.body.scrollTop;
            var m = 80;

            if (s > m) {
                $header[0].classList.remove('contents');
                $header.find('#logo img').attr('src', 'img/logo_top.png');
                $header.find('.head').css('background-color', '#153a4d');
                $('.head').css('transition', '0.5s');
                $('.pc_hamburger svg').css('stroke', '#fff');
                $('.main_menu').css('background-color', '#153a4d');

            } else {
                $header.find('#logo img').attr('src', 'img/logo_content.png');

                $header[0].classList.add('contents');
                $('header .head').css('background-color', '#fff');
                $('.pc_hamburger svg').css('stroke', '#153a4d');
                $('.main_menu').css('background-color', '#fff');
                $('.head').css('transition', '0.5s');
            }

        });
    }


    $("#page_top").hide();
    $(window).on("scroll", function () {

        if ($(this).scrollTop() > 100) {
            $('#page_top').fadeIn("slow");
        } else {
            $('#page_top').fadeOut("slow");
        }


        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop();
        footHeight = $("footer").innerHeight();

        if (scrollHeight - scrollPosition <= footHeight) {
            $("#page_top").css({
                "position": "absolute",
                "bottom": footHeight + 60
            });
        } else {
            $("#page_top").css({
                "position": "fixed",
                "bottom": "20px"
            });
        }
    });

    $('#page_top a').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    var $movies_navi = $('.movies_navi nav'),
        $sub_menu = $('.movies_navi .sub_menu');

    var $active = $movies_navi.find('>ul>li.active');
    $active.prev('.separater').addClass('offset');
    $active.next('.separater').addClass('offset');


    if (isTouchDevice()) {
        $movies_navi.on('click', function (e) {
            e.stopPropagation();
        });

        $movies_navi.find('> ul > li').on('click', function (e) {
            e.stopPropagation();
            $sub_menu.hide();

            $movies_navi.find('.separater').removeClass('offset');
            if (this.classList.contains('on')) {
                $(this).children('.sub_menu').hide();

                this.classList.remove('on');
            } else {
                $(this).children('.sub_menu').show();
                $('> ul > li', $movies_navi).removeClass('on');
                this.classList.add('on');
                $(this).prev('.separater').addClass('offset');
                $(this).next('.separater').addClass('offset');
            }
        });
        $sub_menu.find('li').on({
            'touchstart': function (e) {
                e.stopPropagation();
                this.classList.add('on');
            },
            'touchend': function (e) {
                e.stopPropagation();
                this.classList.remove('on');
            }
        });
        $('#container').on('click', function (e) {
            $('>ul>li', $movies_navi).removeClass('on');
            $sub_menu.hide();
        });
    } else {
        $('>ul>li', $movies_navi).on({
            'mouseenter': function (e) {
                $(this).next('.separater').addClass('offset');
                $(this).prev('.separater').addClass('offset');

                $(this).children('.sub_menu').stop(true, true).fadeIn("fast");
                $(this).addClass('on');
            },
            'mouseleave': function (e) {
                $(this).children('.sub_menu').stop(true, true).fadeOut("fast");

                $(this).prev('.separater').removeClass('offset');
                $(this).next('.separater').removeClass('offset');

                this.classList.remove('on');
            }
        });
        $sub_menu.find('li').on({
            'mouseenter': function (e) {
                e.stopPropagation();
                this.classList.add('on');
            },
            'mouseleave': function (e) {
                e.stopPropagation();
                this.classList.remove('on');
            }
        });
    }

});

$(function () {
    $(".pc_hamburger").click(function () {
        $(".pc_menu").toggleClass(".pc_menu_click");
        if ($(".pc_menu").hasClass(".pc_menu_click")) {
            $(".main_menu").css('transform', 'translate(-222.5px,0)');
            $(".main_menu").css('transition-duration', '0.5s');
            $(".main_menu").css('transition-timing-function', 'ease-in-out');

        } else {
            $(".main_menu").css('transform', 'translate(222.5px,0)');
            $(".main_menu").css('transition-duration', '0.5s');
            $(".main_menu").css('transition-timing-function', 'ease-in-out');

        }
    });






});

/*
 * タッチデバイス判定
 */
function isTouchDevice() {
    // タッチパネルPC対応
    var ua = navigator.userAgent;
    var device;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
        device = 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        device = 'tab';
    } else {
        device = 'pc';
    }

    var result = false;
    if (window.ontouchstart === null && device !== 'pc') {
        result = true;
    }
    return result;
}

function fnAjax(param) {
    if ($ === jQuery) {
        var d = $.Deferred();
        $.ajax({
            type: 'POST',
            async: true,
            url: param['url'],
            data: param['data'],
            scriptCharset: "utf-8",
            dataType: 'text'
        })
            .done(function (data) {
                console.log('ajax success.');
                d.resolve(data);
            })
            .fail(function (data) {
                console.log('ajax fail.');
                d.reject(data);
            })
            .always(function () {
                console.log('ajax complete.');
            });
        return d.promise();
    }
}

function getImageSize(target) {
    target.removeClass('land port');

    img = new Image();
    img.src = target.attr('src');
    var target_h = img.height,
        target_w = img.width;

    console.log(target_w + ', ' + target_h);

    if (target_w >= target_h) {
        target.addClass('land');
    } else if (target_w < target_h) {
        target.addClass('port');
    }

}
window.onload = function () {
    $('.loader').delay(200).fadeOut();
    $('#loading').delay(200).fadeOut();
};