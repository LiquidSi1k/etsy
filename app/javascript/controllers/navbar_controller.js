import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["leftMenu", "rightMenu", "wrapper"];

  connect() {
    this.minMenuHeight = 400;
    console.log(this.leftMenuTargets);
  }

  showMenu(e) {
    if (!e.target || !e.target.dataset.id) {
      console.error("Invalid event target or missing data-id attribute");
      return;
    }

    const targetId = e.target.dataset.id;
    this.leftMenuTargets.forEach((menu) => {
      // remove active class acorss all left side menus
      menu.classList.remove("active");

      // look for the menu that matches the parent id
      if (menu.dataset.parentId === targetId) {
        // add active to the target menu
        menu.classList.add("active");

        // find the first right side menu id
        const firstMenu = menu.querySelector("li[data-id]").dataset.id;

        // show that menu
        this.showRightMenu(firstMenu);
      }
    });
  }

  changeRightMenu(e) {
    this.showRightMenu(e.target.dataset.id);
  }

  showRightMenu(id) {
    this.rightMenuTargets.forEach((menu) => {
      menu.classList.remove("active");

      if (menu.dataset.parentId === id) {
        menu.classList.add("active");

        // adjust the height of the parent container
        const menuHeight = menu.clientHeight;
        this.updateParentHeight(menuHeight);
      }
    });
  }

  updateParentHeight(rightMenuHeight) {
    const menuHeight =
      rightMenuHeight > this.minMenuHeight
        ? rightMenuHeight
        : this.minMenuHeight;

    this.wrapperTarget.style.height = menuHeight + "px";
  }

  closeMenu() {
    this.wrapperTarget.style.height = 0 + "px";
    this.rightMenuTargets.forEach((menu) => menu.classList.remove("active"));
    this.leftMenuTargets.forEach((menu) => menu.classList.remove("active"));
  }
}
