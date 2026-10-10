// App imagery is rendered by the Android production screens, not recreated HTML forms.
const screenPages = {
  overview: {workspace:'overview', title:'Your business overview', description:'Follow outstanding invoices, financial summaries and your next actions in one place.', label:'Overview'},
  todo: {workspace:'todo', title:'Your next task, in focus', description:'Open tasks, completed work, scheduling and pending changes stay together in To Do.', label:'To Do'},
  sales: {workspace:'sales', title:'From quotation to order', description:'Review quotations, orders and products through the app’s Sales workspace.', label:'Sales · Quotations'},
  orders: {workspace:'sales', title:'Keep your orders moving', description:'Confirmed sales orders stay alongside quotations and products.', label:'Sales · Orders'},
  products: {workspace:'sales', title:'Your products, close at hand', description:'Find products, references and prices in the Sales workspace.', label:'Sales · Products'},
  money: {workspace:'money', title:'A clearer view of your money', description:'Customer invoices, vendors, receivables, payables, P & L, reports and statements belong in Money.', label:'Money · Customer invoices'},
  more: {workspace:'more', title:'Everything else you need', description:'Discussion, customers, stock, purchasing, suppliers, calendar, reports, search, settings and connections.', label:'More'},
  customers: {workspace:'more', title:'Know your customer', description:'Open Customers from More to find contacts and their business records.', label:'More · Customers'},
  calendar: {workspace:'more', title:'Make the day work', description:'Open Calendar from More or To Do to plan tasks and appointments.', label:'More · Calendar'}
};
const screenImage = document.querySelector('#native-screen-image');
const workspaceTabs = [...document.querySelectorAll('.native-tabs [role="tab"]')];
function showScreen(key) {
  const page = screenPages[key];
  if (!page) return;
  screenImage.src = `assets/odoo/showcase/workspace-${key}.png`;
  screenImage.alt = `BizNii Odoo Mobile ${page.label} page`;
  document.querySelector('#native-title').textContent = page.title;
  document.querySelector('#native-description').textContent = page.description;
  document.querySelector('#native-caption').textContent = page.label;
  document.querySelector('#native-panel').setAttribute('aria-labelledby', `workspace-${page.workspace}`);
  workspaceTabs.forEach(tab => { const selected = tab.dataset.screen === page.workspace; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelector('#sales-screen-tabs').hidden = page.workspace !== 'sales';
  document.querySelector('#more-screen-tabs').hidden = page.workspace !== 'more';
  document.querySelectorAll('.native-subtabs button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.screen === key)));
  document.querySelectorAll('.native-phone-tabs button').forEach(button => { if (button.dataset.screen === page.workspace) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current'); });
}
document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.screen)));
workspaceTabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  let next = index;
  if (event.key === 'ArrowRight') next = (index + 1) % workspaceTabs.length;
  else if (event.key === 'ArrowLeft') next = (index + workspaceTabs.length - 1) % workspaceTabs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = workspaceTabs.length - 1;
  else return;
  event.preventDefault(); workspaceTabs[next].focus(); showScreen(workspaceTabs[next].dataset.screen);
}));

document.querySelectorAll('.widget-switch').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.widget-switch').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});document.querySelectorAll('.widget-preview').forEach(p=>p.classList.remove('active'));btn.classList.add('active');btn.setAttribute('aria-pressed','true');document.querySelector('[data-widget-panel="'+btn.dataset.widget+'"]').classList.add('active');}));
function widgetToast(msg,calendar=false){const el=document.getElementById(calendar?'widgetToastCalendar':'widgetToast');if(!el)return;el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1200);}
document.querySelectorAll('[data-widget-toast]').forEach(x=>x.addEventListener('click',()=>widgetToast(x.dataset.widgetToast,!!x.closest('[data-widget-panel="calendar"]'))));
document.querySelectorAll('[data-discuss-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-discuss-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.discussFilter;document.querySelectorAll('[data-discuss-type]').forEach(r=>r.style.display=f==='all'||r.dataset.discussType===f?'flex':'none');}));

// Render a complete six-week grid when navigating months.
const widgetDate = new Date(2026, 9, 1);
function renderWidgetMonth() {
  const grid = document.getElementById('widgetCalendarGrid');
  const year = widgetDate.getFullYear(), month = widgetDate.getMonth();
  document.getElementById('widgetMonthTitle').textContent = widgetDate.toLocaleDateString('en', {month:'long', year:'numeric'});
  const first = new Date(year, month, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  grid.replaceChildren();
  for (let index = 0; index < 42; index++) {
    const day = new Date(year, month, 1 - mondayOffset + index);
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'cal-day-v2' + (day.getMonth() !== month ? ' muted' : '');
    const number = document.createElement('span');
    number.className = 'day-num-v2'; number.textContent = day.getDate();
    item.append(number);
    item.setAttribute('aria-label', day.toLocaleDateString('en', {day:'numeric', month:'long', year:'numeric'}));
    if (day.getMonth() === month && [3, 4, 7].includes(day.getDate())) {
      const chip = document.createElement('span'); chip.className = 'event-chip-v2';
      chip.textContent = ({3:'Site visit',4:'Install',7:'Pending 4'})[day.getDate()]; item.append(chip);
    }
    item.addEventListener('click', () => {
      grid.querySelectorAll('.selected').forEach(cell => cell.classList.remove('selected'));
      item.classList.add('selected'); widgetToast('Selected ' + item.getAttribute('aria-label'), true);
    });
    grid.append(item);
  }
}
document.querySelectorAll('[data-month-shift]').forEach(button => button.addEventListener('click', () => {
  widgetDate.setMonth(widgetDate.getMonth() + Number(button.dataset.monthShift)); renderWidgetMonth();
}));
document.querySelector('.today-v2').addEventListener('click', () => {
  const now = new Date(); widgetDate.setFullYear(now.getFullYear(), now.getMonth(), 1); renderWidgetMonth();
});
renderWidgetMonth();

document.querySelectorAll('[data-widget-toast][role="button"]').forEach(button => button.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); button.click(); }
}));
