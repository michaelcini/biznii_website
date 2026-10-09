'use strict';
const menu = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
}));

const search = document.querySelector('#feature-search');
const category = document.querySelector('#feature-category');
const groups = [...document.querySelectorAll('.feature-group')];
const count = document.querySelector('#feature-count');
const expand = document.querySelector('#expand-features');
const total = groups.reduce((sum, group) => sum + group.querySelectorAll('li').length, 0);
groups.forEach(group => {
  const option = document.createElement('option');
  option.value = group.id;
  option.textContent = group.dataset.title;
  category.append(option);
});
function updateExpandLabel() {
  const visible = groups.filter(group => !group.hidden);
  expand.textContent = visible.length && visible.every(group => group.open) ? 'Collapse all' : 'Expand all';
}
function filterFeatures() {
  const terms = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  let matches = 0;
  groups.forEach(group => {
    let groupMatches = 0;
    const inCategory = category.value === 'all' || category.value === group.id;
    group.querySelectorAll('li').forEach(item => {
      const text = `${group.dataset.title} ${item.textContent}`.toLocaleLowerCase();
      item.hidden = !inCategory || !terms.every(term => text.includes(term));
      if (!item.hidden) groupMatches++;
    });
    group.hidden = groupMatches === 0;
    group.querySelector('summary small').textContent = `${groupMatches} features`;
    if (terms.length || category.value !== 'all') group.open = groupMatches > 0;
    matches += groupMatches;
  });
  count.textContent = `${matches} of ${total} documented features`;
  document.querySelector('#no-features').hidden = matches !== 0;
  updateExpandLabel();
}
search.addEventListener('input', filterFeatures);
category.addEventListener('change', filterFeatures);
expand.addEventListener('click', () => {
  const visible = groups.filter(group => !group.hidden);
  const open = !visible.every(group => group.open);
  visible.forEach(group => { group.open = open; });
  updateExpandLabel();
});
groups.forEach(group => group.addEventListener('toggle', updateExpandLabel));
filterFeatures();

// Native links still open the images when JavaScript or dialog support is absent.
const dialog = document.querySelector('#capture-dialog');
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('.zoom').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const source = link.querySelector('img');
    const target = dialog.querySelector('img');
    target.src = source.src;
    target.alt = source.alt;
    dialog.querySelector('p').textContent = source.alt;
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

// A directory link must reveal its destination even after a search filter.
function revealDestination() {
  const id = location.hash.slice(1);
  const target = groups.find(group => group.id === id);
  if (!target) return;
  search.value = '';
  category.value = 'all';
  filterFeatures();
  target.open = true;
  target.scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', revealDestination);
document.querySelectorAll('a[href^="#directory-"]').forEach(link => link.addEventListener('click', () => {
  if (link.hash === location.hash) revealDestination();
}));
revealDestination();
