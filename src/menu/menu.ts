import { menuOptions } from './options';

const menuContainer = document.getElementById('menu-options');
let open = false;

const loadMenuOptions = () => {
  const menuContainerUl = menuContainer?.getElementsByTagName('ul')[0];

  menuOptions.forEach(item => {
    const option = document.createElement('li');
    option.innerText = item.title;
    option.addEventListener('click', item.action);

    menuContainerUl?.appendChild(option);
  });
};

const openCloseMenu = () => {
  open = !open;
  if (menuContainer) {
    menuContainer.style.display = open ? 'block' : 'none';
  }
};

window.addEventListener('load', () => {
  loadMenuOptions();

  document.getElementById('options')?.addEventListener('click', openCloseMenu);
});

export { openCloseMenu };
