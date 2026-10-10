
const app=document.getElementById('odxApp'), toastEl=document.getElementById('odxToast'), overlay=document.getElementById('odxOverlay'), sheetTitle=document.getElementById('odxSheetTitle'), sheetText=document.getElementById('odxSheetText');
function go(view){app.querySelectorAll('.odx-view').forEach(v=>v.classList.remove('active'));const target=app.querySelector('[data-view="'+view+'"]');if(target)target.classList.add('active');app.querySelectorAll('.odx-nav button').forEach(b=>b.classList.toggle('active',b.dataset.go===view));}
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1200);}
function openSheet(title,text){sheetTitle.textContent=title;sheetText.textContent=text||'Keep record details, next actions and conversations together.';overlay.classList.add('open');}
app.querySelectorAll('[data-go]').forEach(x=>x.addEventListener('click',()=>go(x.dataset.go)));
app.querySelectorAll('[data-toast]').forEach(x=>x.addEventListener('click',()=>toast(x.dataset.toast)));
app.querySelectorAll('[data-open]').forEach(x=>x.addEventListener('click',()=>openSheet(x.dataset.open)));
document.getElementById('odxClose').onclick=()=>overlay.classList.remove('open');overlay.addEventListener('click',ev=>{if(ev.target===overlay)overlay.classList.remove('open')});
document.querySelectorAll('.odx-customer').forEach(c=>c.addEventListener('click',()=>{document.getElementById('odxCustName').textContent=c.dataset.customer;go('customerDetail')}));
document.getElementById('odxCustomerSearch').addEventListener('input',ev=>{const q=ev.target.value.toLowerCase();document.querySelectorAll('.odx-customer').forEach(c=>c.style.display=c.dataset.name.includes(q)?'flex':'none')});
document.getElementById('odxInvSearch').addEventListener('input',ev=>{const q=ev.target.value.toLowerCase();document.querySelectorAll('.odx-invoice').forEach(i=>i.style.display=i.dataset.ref.includes(q)?'flex':'none')});
document.querySelectorAll('.invfilter').forEach(f=>f.addEventListener('click',()=>{document.querySelectorAll('.invfilter').forEach(x=>x.classList.remove('active'));f.classList.add('active');document.querySelectorAll('.odx-invoice').forEach(i=>i.style.display=f.dataset.filter==='all'||i.dataset.status.includes(f.dataset.filter)?'flex':'none')}));
document.querySelectorAll('[data-sales-tab]').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('[data-sales-tab]').forEach(x=>x.classList.remove('active'));t.classList.add('active');const c=document.getElementById('odxSalesContent');if(t.dataset.salesTab==='quotes')c.innerHTML='<div class="odx-doc" onclick="openSheet(\'S00010\')"><div class="odx-doc-left"><div class="odx-docicon">▤</div><div><b>S00010</b><small>Acme Ltd</small></div></div><div class="odx-amount">€125.50<div class="odx-tag">Draft</div></div></div>';else if(t.dataset.salesTab==='orders')c.innerHTML='<div class="odx-doc" onclick="openSheet(\'SO0007\')"><div><b>SO0007</b><small>Blue Harbour Trading</small></div><div class="odx-amount">€840.00</div></div>';else c.innerHTML='<div class="odx-doc" onclick="openSheet(\'Service package\')"><div><b>Service package</b><small>Service product</small></div><div class="odx-amount">€95.00</div></div>';}));
document.querySelectorAll('[data-calview]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-calview]').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast(b.textContent.trim()+' view selected')}));
document.querySelectorAll('[data-more]').forEach(c=>c.addEventListener('click',()=>{const v=c.dataset.more;if(['customers','calendar'].includes(v))go(v);else toast(c.querySelector('b').textContent+' opened')}));

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
// Give illustrated record cards equivalent keyboard operation.
document.querySelectorAll('[role="button"][tabindex="0"]').forEach(card => card.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') overlay.classList.remove('open'); });
