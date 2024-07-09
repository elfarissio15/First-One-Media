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