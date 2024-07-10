document.addEventListener("DOMContentLoaded", function() {
    const dropdownTriggers = document.querySelectorAll('.menu-item.with-dropdown');

    dropdownTriggers.forEach(function(trigger) {
        const dropdownType = trigger.getAttribute('data-dropdown');
        const dropdownContent = document.querySelector(`.dropdown-content.${dropdownType}`);

        trigger.addEventListener('mouseenter', function() {
            dropdownContent.classList.add('active');
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            trigger.style.color = '#f5ac00';
        });

        trigger.addEventListener('mouseleave', function(event) {
            const isHovering = isMouseHovering(event, dropdownContent);

            if (!isHovering) {
                dropdownContent.classList.remove('active');
                dropdownContent.style.maxHeight = "0";
                trigger.style.color = '#000';
            } else {
                trigger.style.color = '#f5ac00';
            }
        });

        dropdownContent.addEventListener('mouseleave', function(event) {
            const isHovering = isMouseHovering(event, trigger);

            if (!isHovering) {
                dropdownContent.classList.remove('active');
                dropdownContent.style.maxHeight = "0";
                trigger.style.color = '#000';
            } else {
                trigger.style.color = '#f5ac00';
            }
        });
    });

    function isMouseHovering(event, element) {
        return element.contains(event.relatedTarget);
    }
});

function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId + 'Dropdown');
    dropdown.classList.toggle('active');

    // Toggle max-height based on active class
    if (dropdown.classList.contains('active')) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    } else {
        dropdown.style.maxHeight = "0";
    }
}
function toggleMobileMenu(status) {
    var mobileMenu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('overlay');

    // Toggle mobile menu visibility
    if (mobileMenu.style.right === '0%') {
        mobileMenu.style.right = '-120%';
        if (status !== true) {
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 300); // Adjust timing to match transition duration
        }
    } else {
        overlay.style.display = 'block';
        setTimeout(function() {
            overlay.style.opacity = '1';
        }, 10); // Ensure overlay is displayed before sliding in
        mobileMenu.style.right = '0%';
    }
}

function smoothScrollTo(targetId) {
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        var targetPosition = targetElement.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
var lastScrollTop = 0;

var header = document.getElementById("heder");

window.onscroll = function() {
    var backToTopBtn = document.getElementById("backToTopBtn");
    var currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.style.top = "-100px";
        backToTopBtn.style.bottom = "10px";
    } else {
        header.style.top = "0";
        backToTopBtn.style.bottom = "-10px";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

document.getElementById('contactInformations').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Fetch API example to handle form submission asynchronously
    
    fetch('https://legal-wenda-oussamaelfarissi-ce59982d.koyeb.app/', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
        // Handle success or failure here (update UI, show messages, etc.)
        if (data.success) {
            alert('Message sent successfully!');
            // You can also update the UI or perform other actions here
        } else {
            alert('Failed to send message. Please try again.');
            // Handle other cases where the message might not have been sent successfully
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
        alert('Error sending message. Please try again later.');
    });
});

function initMap() {
    var location = {lat: -37.814, lng: 144.96332};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
