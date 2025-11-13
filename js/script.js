$(document).ready(function() {
    $('.smooth-scroll').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);
    });

    $('.nav-link').on('click', function(e) {
        if ($(this).attr('href').startsWith('#')) {
            e.preventDefault();
            const target = $(this).attr('href');
            if ($(target).length) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 70
                }, 800);
                
                if ($(window).width() < 992) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-lg');
        } else {
            $('.navbar').removeClass('shadow-lg');
        }
    });

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        if (!name || !subject || !message) {
            $('#formMessage').html('<div class="alert alert-warning">Please fill in all fields.</div>');
            return;
        }

        $('#formMessage').html('<div class="alert alert-info">Sending your message...</div>');
        
        $.ajax({
            type: 'POST',
            url: 'php/send_email.php',
            data: {
                name: name,
                subject: subject,
                message: message
            },
            success: function(response) {
                try {
                    const data = JSON.parse(response);
                    if (data.success) {
                        $('#formMessage').html('<div class="alert alert-success">' + data.message + '</div>');
                        $('#contactForm')[0].reset();
                    } else {
                        $('#formMessage').html('<div class="alert alert-danger">' + data.message + '</div>');
                    }
                } catch(e) {
                    $('#formMessage').html('<div class="alert alert-danger">An error occurred. Please try again later.</div>');
                }
            },
            error: function() {
                $('#formMessage').html('<div class="alert alert-danger">Failed to send message. Please try again later.</div>');
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.course-card, .team-card, .blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});