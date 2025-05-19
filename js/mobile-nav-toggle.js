document.addEventListener('DOMContentLoaded', () => {
    const hamburgerLabel = document.querySelector('.hamburger1');
    const toggleCheckbox = document.getElementById('toggle1');

    if (hamburgerLabel && toggleCheckbox) {
        hamburgerLabel.addEventListener('click', () => {
            toggleCheckbox.checked = !toggleCheckbox.checked;
        });
    }
});