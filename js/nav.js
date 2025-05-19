const navHTML = `
  <span id="section-title"></span>
    <ul id="nav-list">
      <li><a href="#"><div class="nav-circle"></div></a></li>
 <li><a href="#S-Who"><div class="nav-circle"></div></a></li>
 <li><a href="#S-CREAMOS"><div class="nav-circle"></div></a></li>
 <li><a href="#S-CONTACTO"><div class="nav-circle"></div></a></li>
 <li><a href="#S-WORK"><div class="nav-circle"></div></a></li>
    </ul>
`;

function injectNav() {
  const targetElement = document.querySelector('nav.right-nav');
  if (targetElement) {
    targetElement.innerHTML = navHTML;
  } else {
    console.error(`Element with class "right-nav" not found.`);
  }
}

// Call the function to inject the navigation when the script loads
injectNav();