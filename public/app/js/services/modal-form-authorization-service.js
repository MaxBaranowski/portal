app.service("modalForm", function () {
    //regestration modal window activate
    //by clicking this buuton modal window will appear
    //below in code needs to remowe style block from modal window
    //because it causes lags in browser on iphone 5s (on PC all working good)
    $('#modalForm').click(function(){
        $('#animatedModal').css("display","block");
    });
    //needs to enabale animation for modal window
    $(".animateModal").animatedModal({
        animatedIn:'zoomIn',
        animatedOut:'zoomOut',
        color:'rgba(0, 0, 0, 0.9)',
        animationDuration: '.8s'
    });

    //for visual effects wnen typing in form
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
        var $this = $(this),
            label = $this.prev('label');
        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if( $this.val() === '' ) {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {
            if( $this.val() === '' ) {
                label.removeClass('highlight');
            }
            else if( $this.val() !== '' ) {
                label.addClass('highlight');
            }
        }
    });

    //change signIn or loginIn menu
    $('.tab a').on('click', function(e) {
        e.preventDefault();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        var target = $(this).attr('href');
        $('.tab-content > div').not(target).hide();
        $(target).fadeIn(600);
    });
});
