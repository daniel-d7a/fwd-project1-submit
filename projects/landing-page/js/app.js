/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/* *
 * Define Global Variables
 *
 */

const main = document.querySelector("main");
const sections = main.querySelectorAll("section");
const navbar = document.getElementById("navbar__list");
const pageHeader = document.querySelector(".page__header");
const backToTopBtn = document.querySelector(".back-to-top");
let activeLink = null;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description checks if the section is visible or not
 * @param {Node} section the section to check
 * @returns true if the section is visible, false otherwise.
 */
function isVisible(section) {
  const coords = section.getBoundingClientRect();

  return (
    coords.top >= 0 && coords.top <= 300 && coords.top <= window.innerHeight
  );
}

/**
 * @description function that takes a link and sets it as active and clears the active from other links
 * @param {Node} link the section to set as active
 */
function linkClosure(link) {
  let thisLink = link;
  return function setLinkAsActive() {
    if (activeLink !== null) {
      activeLink.setAttribute("id", "");
    }
    activeLink = thisLink;
    thisLink.setAttribute("id", "active__link");
  };
}

/**
 * @description function that applies event listeners to activate links on click
 */
function linkActive() {
  const links = document.querySelectorAll(".menu__link");
  Array.from(links).forEach((link) => {
    link.addEventListener("click", linkClosure(link));
  });
}

/**
 * @description creats a new list item and addes it to the navigation list based on the section
 *              creates an a element within an li and sets the href attribute to the id of the section provided
 *              to allow scrolling to it and addes the correct text
 * @param {Node} section
 */
function createListItem(section) {
  const li = document.createElement("li");
  li.innerHTML = `<a class="menu__link" href="#${section.getAttribute("id")}">${
    section.dataset.nav
  }</a>`;
  navbar.append(li);
}

/**
 * @description addes the active class to the section if visible and addes the active state to the navigation link
 * @param {Node} section the section to make active
 *
 */
function addClassToVisibleSection(section) {
  if (isVisible(section)) {
    section.classList.add("your-active-class");
    const link = document.querySelector(
      `a[href = "#${section.getAttribute("id")}"]`
    );

    linkClosure(link)();
  } else {
    section.classList.remove("your-active-class");
  }
}

/**
 * @description collapses a section on click on the arrow by hiding the text and shrinking the div
 *              also addes animation to the arrow icon
 * @param {Node} section the section to collapse
 *
 */
function collapseSection(section) {
  const arrow = section.querySelector(".arrow-icon");
  let clicked = false;

  arrow.addEventListener("click", () => {
    const paragraphs = section.querySelectorAll("p");
    const icon = arrow.querySelector("i");

    if (clicked) {
      paragraphs.forEach((p) => {
        p.style.display = "block";
      });

      section.style.minHeight = "80vh";
      icon.style.transform = "rotate(0deg)";
    } else {
      paragraphs.forEach((p) => {
        p.style.display = "none";
      });

      section.style.minHeight = "0vh";
      icon.style.transform = "rotate(180deg)";
    }

    clicked = !clicked;
  });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
/**
 * @description loops over all sections and makes the navigation bar using 'createListItem(section)'
 */
function createNavBar() {
  Array.from(sections).forEach(createListItem);
  linkActive();
}

// Add class 'active' to section when near top of viewport
/**
 * @description addes the active class to all sections on scroll using an event listener
 */
function addActiveClass() {
  document.addEventListener("scroll", () => {
    Array.from(sections).forEach(addClassToVisibleSection);
  });
}

/**
 * @description hides the nav bar when the user is not scrolling for 1 second
 */
function hideNavBar() {
  let timerhide = null;
  document.addEventListener("scroll", () => {
    if (timerhide !== null) {
      clearTimeout(timerhide);
    }

    if (pageHeader.style.top !== "-100%") {
      timerhide = setTimeout(() => {
        pageHeader.style.top = "-100%";
      }, 1000);
    } else {
      pageHeader.style.top = "0";
    }
  });
}

/**
 * @description scrolls to top when the back to top button is pressed
 */
function backToTop() {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
}

/**
 * @description displays the back to top button when the user scrolls 300px or more from the top
 *              and hides it when the user is 200px or less from the top
 */
function displayBackBtn() {
  document.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      backToTopBtn.style.bottom = "0";
    } else if (window.scrollY <= 200) {
      backToTopBtn.style.bottom = "-100%";
    }
  });
}

/**
 * @description allows all sections to collapse
 */
function collapseAllSections() {
  sections.forEach(collapseSection);
}
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
createNavBar();
// Hide the menu on idle
hideNavBar();
// Scroll to section on link click

// make sections collapsable
collapseAllSections();

// Set sections as active
addActiveClass();

// Add a back to top buto that appears on scroll
displayBackBtn();
backToTop();
