// Production Android images. Interactive records exist only in this page's memory.
const screenPages = {
  overview: {workspace:'overview',title:'Your business overview',description:'Follow outstanding invoices, financial summaries and your next actions in one place.',label:'Overview'},
  todo: {workspace:'todo',title:'Your next task, in focus',description:'Open tasks, completed work, scheduling and pending changes stay together in To Do.',label:'To Do'},
  sales: {workspace:'sales',title:'From quotation to order',description:'Review quotations, orders and products through the app’s Sales workspace.',label:'Sales · Quotations'},
  orders: {workspace:'sales',title:'Keep your orders moving',description:'Confirmed sales orders stay alongside quotations and products.',label:'Sales · Orders'},
  products: {workspace:'sales',title:'Your products, close at hand',description:'Find products, references and prices in the Sales workspace.',label:'Sales · Products'},
  money: {workspace:'money',title:'A clearer view of your money',description:'Customer invoices, vendors, receivables, payables, P & L, reports and statements belong in Money.',label:'Money · Customer invoices'},
  more: {workspace:'more',title:'Everything else you need',description:'Discussion, customers, stock, purchasing, suppliers, calendar, reports, search, settings and connections.',label:'More'},
  customers: {workspace:'more',title:'Know your customer',description:'Find contacts and open their business records.',label:'More · Customers'},
  calendar: {workspace:'more',title:'Make the day work',description:'Explore Schedule, Day, 3 days, Week and Month views with appointments in context.',label:'Calendar · Day'},
  'calendar-schedule': {workspace:'more',title:'Your appointments, in order',description:'See scheduled work in a clear agenda.',label:'Calendar · Schedule'},
  'calendar-three-days': {workspace:'more',title:'A little room to plan ahead',description:'Keep three days of appointments in view.',label:'Calendar · 3 days'},
  'calendar-week': {workspace:'more',title:'See the week ahead',description:'Your scheduled work, organised across the week.',label:'Calendar · Week'},
  'calendar-month': {workspace:'more',title:'The whole month, in view',description:'Find your work by day, then open the appointment for more context.',label:'Calendar · Month'},
  'customer-detail': {workspace:'more',asset:'customer',detail:true,title:'The customer, in context',description:'Contact details, documents and your next actions together.',label:'Customer · Acme Ltd'},
  'task-detail': {workspace:'todo',asset:'job',detail:true,title:'Everything that belongs to the job',description:'Materials, evidence, delivery links and the job report stay with the task.',label:'To Do · Job details'},
  pricing: {workspace:'sales',asset:'pricing',detail:true,title:'Review the numbers',description:'The native pricing editor shows product prices, quantity, taxes and totals.',label:'Sales · Pricing'},
  discussion: {workspace:'more',asset:'discussion',detail:true,title:'Keep the conversation going',description:'Native Odoo chats keep the conversation with the work.',label:'More · Discussion'}
};
const screenImage = document.querySelector('#native-screen-image');
screenImage.addEventListener('load',()=> { screenImage.width=screenImage.naturalWidth; screenImage.height=screenImage.naturalHeight; });
const workspaceTabs = [...document.querySelectorAll('.native-tabs [role="tab"]')];
const screenHistory = [];
let currentScreen = 'overview';
const phoneHotspots = document.querySelector('#phone-hotspots');
// Percentage bounds from inspected native images: left, top, width, height.
const salesTabs = [['Show quotations','sales',3,7,29,6],['Show orders','orders',33,7,26,6],['Show products','products',59,7,30,6]];
const earlyCalendarTabs = [['Show schedule','calendar-schedule',3,13,27,5],['Show day','calendar',30,13,17,5],['Show three days','calendar-three-days',47,13,22,5],['Show week','calendar-week',69,13,25,5]];
const lateCalendarTabs = [['Show day','calendar',13,13,18,5],['Show three days','calendar-three-days',31,13,22,5],['Show week','calendar-week',53,13,23,5],['Show month','calendar-month',76,13,22,5]];
const hotspots = {
  overview: [['Open calendar','calendar',35,22,25,6],['Explore customer records','customers',8,66,41,8],['Explore invoices','money',51,66,41,8],['Explore quotations','sales',8,75,41,8],['Explore products','products',51,75,41,8]],
  todo: [['Open task calendar','calendar',44,14,9,6],['Open job details','task-detail',3,44,94,11]],
  customers: [['Open Acme customer','customer-detail',4,19,92,11]],
  more: [['Open Discussion','discussion',4,27,45,18],['Open Customers','customers',51,27,45,18],['Explore stock products','products',4,47,45,18],['Open Calendar','calendar',51,66,45,18]],
  money: [['Explore invoice pricing','pricing',4,27,92,9]],
  sales: [...salesTabs,['Explore quotation pricing','pricing',4,27,92,9]],
  orders: salesTabs,
  products: [...salesTabs,['Explore product pricing','pricing',4,20,92,9]],
  calendar: earlyCalendarTabs,
  'calendar-schedule': earlyCalendarTabs,
  'calendar-three-days': [['Show schedule','calendar-schedule',0,13,18,5],['Show day','calendar',18,13,21,5],['Show three days','calendar-three-days',39,13,23,5],['Show week','calendar-week',62,13,21,5],['Show month','calendar-month',83,13,17,5]],
  'calendar-week': lateCalendarTabs,
  'calendar-month': lateCalendarTabs
};
const calendarModes = [['calendar-schedule','Schedule'],['calendar','Day'],['calendar-three-days','3 days'],['calendar-week','Week'],['calendar-month','Month']];
const calendarControls = document.createElement('div');
calendarControls.className = 'phone-calendar-modes'; calendarControls.setAttribute('aria-label','Phone calendar views');
calendarModes.forEach(([key,label]) => { const button = document.createElement('button'); button.textContent = label; button.dataset.screen = key; button.addEventListener('click',()=>showScreen(key)); calendarControls.append(button); });
document.querySelector('.phone-explore-controls').after(calendarControls);
function showScreen(key, remember = true) {
  const page = screenPages[key]; if (!page) return;
  if (remember && key !== currentScreen) screenHistory.push(currentScreen);
  currentScreen = key;
  screenImage.src = `assets/odoo/showcase/${page.asset || 'workspace-' + key}.png`;
  screenImage.alt = `BizNii Odoo Mobile ${page.label} page`;
  document.querySelector('#native-title').textContent = page.title;
  document.querySelector('#native-description').textContent = page.description;
  document.querySelector('#native-caption').textContent = page.label;
  document.querySelector('#native-panel').setAttribute('aria-labelledby', `workspace-${page.workspace}`);
  workspaceTabs.forEach(tab => { const selected = tab.dataset.screen === page.workspace; tab.setAttribute('aria-selected',String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelector('#sales-screen-tabs').hidden = page.workspace !== 'sales';
  document.querySelector('#more-screen-tabs').hidden = page.workspace !== 'more';
  document.querySelectorAll('.native-subtabs button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.screen === key)));
  document.querySelector('.native-phone-tabs').hidden = !!page.detail;
  document.querySelectorAll('.native-phone-tabs button').forEach(button => { if(button.dataset.screen === page.workspace) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current'); });
  document.querySelector('#phone-back').disabled = screenHistory.length === 0;
  calendarControls.hidden = !key.startsWith('calendar');
  calendarControls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.screen === key)));
  phoneHotspots.replaceChildren();
  (hotspots[key] || []).forEach(([label,target,x,y,w,h]) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'phone-hotspot'; button.setAttribute('aria-label',label); button.title = label;
    Object.assign(button.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});
    button.addEventListener('click',()=> { showScreen(target); document.querySelector('#phone-back').focus({preventScroll:true}); }); phoneHotspots.append(button);
  });
}
// Bind static controls before creating the calendar controls to avoid double listeners.
document.querySelectorAll('.native-tabs [data-screen],.native-subtabs [data-screen],.native-phone-tabs [data-screen]').forEach(button=>button.addEventListener('click',()=>showScreen(button.dataset.screen)));
document.querySelector('#phone-back').addEventListener('click',()=> { const previous=screenHistory.pop(); if(previous) showScreen(previous,false); });
document.querySelector('#phone-hints').addEventListener('click',event=> { const enabled=event.currentTarget.getAttribute('aria-pressed')!=='true'; event.currentTarget.setAttribute('aria-pressed',String(enabled)); phoneHotspots.classList.toggle('hints-on',enabled); });
workspaceTabs.forEach((tab,index)=>tab.addEventListener('keydown',event=> {
  let next=index;
  if(event.key==='ArrowRight') next=(index+1)%workspaceTabs.length;
  else if(event.key==='ArrowLeft') next=(index+workspaceTabs.length-1)%workspaceTabs.length;
  else if(event.key==='Home') next=0;
  else if(event.key==='End') next=workspaceTabs.length-1;
  else return;
  event.preventDefault(); workspaceTabs[next].focus(); showScreen(workspaceTabs[next].dataset.screen);
}));
function openPhone(key) { showScreen(key); document.querySelector('#explore').scrollIntoView({behavior:'smooth',block:'start'}); document.querySelector('#phone-back').focus({preventScroll:true}); }
showScreen('overview',false);

// Mirrors WidgetMonthState: Monday first, five/six weeks, unscheduled overdue
// work collected on today, and the production completed/overdue task labels.
const today = new Date(); today.setHours(0,0,0,0);
const dateKey = date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
function offsetDay(offset) { const date=new Date(today); date.setDate(date.getDate()+offset); return dateKey(date); }
let widgetDate = new Date(today.getFullYear(),today.getMonth(),1);
let selectedDate = dateKey(today);
const tasks = [
  {id:1,title:'Customer visit',date:offsetDay(0),due:offsetDay(0),time:'09:00–10:30',customer:'Acme Ltd',colour:'coral',scheduled:true},
  {id:2,title:'Review quotation',date:offsetDay(0),due:offsetDay(0),time:'11:00–11:30',customer:'Blue Harbour Trading',colour:'blue',scheduled:true},
  {id:3,title:'Installation',date:offsetDay(1),due:offsetDay(1),time:'09:00–12:00',customer:'Acme Ltd',colour:'green',scheduled:true},
  {id:4,title:'Site measurements',date:offsetDay(2),due:offsetDay(2),time:'14:00–15:00',customer:'Blue Harbour Trading',colour:'purple',scheduled:true},
  {id:5,title:'Delivery check',date:offsetDay(-1),due:offsetDay(-1),time:'10:00–10:30',customer:'Acme Ltd',done:true,scheduled:true},
  {id:6,title:'Follow up',date:offsetDay(-2),due:offsetDay(-2),customer:'Acme Ltd'},
  {id:7,title:'Confirm materials',date:offsetDay(-3),due:offsetDay(-3),customer:'Blue Harbour Trading'},
  {id:8,title:'Service visit',date:offsetDay(-1),due:offsetDay(-1),time:'15:00–16:00',customer:'Acme Ltd',scheduled:true}
];
const overdue = task=>!task.done && task.due<dateKey(today);
const pendingTasks = ()=>tasks.filter(overdue);
const dateTasks = key=>tasks.filter(task=>task.date===key && !(overdue(task) && !task.scheduled));
const statusText = task=>task.done?'Completed':overdue(task)?'Overdue':'Open';
const statusSymbol = task=>task.done?'✓':overdue(task)?'◷':'○';
function button(label,className,onClick) { const el=document.createElement('button'); el.type='button'; el.textContent=label; el.className=className; el.addEventListener('click',onClick); return el; }
function selectDay(key) { selectedDate=key; renderWidgetMonth(); renderAgenda(); document.querySelector(`[data-calendar-date="${key}"]`)?.focus({preventScroll:true}); }
function renderWidgetMonth() {
  const grid=document.querySelector('#widgetCalendarGrid'); grid.replaceChildren();
  const year=widgetDate.getFullYear(),month=widgetDate.getMonth();
  document.querySelector('#widgetMonthTitle').textContent=widgetDate.toLocaleDateString('en',{month:'long',year:'numeric'});
  const first=new Date(year,month,1),mondayOffset=(first.getDay()+6)%7;
  const daysInMonth=new Date(year,month+1,0).getDate();
  const weeks=Math.max(5,Math.min(6,Math.ceil((mondayOffset+daysInMonth)/7)));
  grid.style.setProperty('--calendar-weeks',weeks);
  for(let index=0;index<weeks*7;index++) {
    const date=new Date(year,month,1-mondayOffset+index),key=dateKey(date);
    const cell=document.createElement('div'); cell.className='cal-day-v2'+(date.getMonth()!==month?' muted':'')+(key===selectedDate?' selected':'')+(key===dateKey(today)?' is-today':'');
    const day=button(String(date.getDate()),'day-num-v2',()=>selectDay(key)); day.dataset.calendarDate=key; day.setAttribute('aria-label',date.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric'})); day.setAttribute('aria-pressed',String(key===selectedDate)); if(key===dateKey(today)) day.setAttribute('aria-current','date'); cell.append(day);
    const entries=dateTasks(key);
    if(key===dateKey(today) && pendingTasks().length) { const pending=button(`○ ${pendingTasks().length} pending`,'event-chip-v2 pending',()=> { selectDay(key); document.querySelector('#pending-agenda').scrollIntoView({behavior:'smooth',block:'nearest'}); }); pending.setAttribute('aria-label',`Show ${pendingTasks().length} overdue tasks`); cell.append(pending); }
    const capacity=key===dateKey(today) && pendingTasks().length?3:4;
    entries.slice(0,capacity).forEach(task=> { const chip=button(`${statusSymbol(task)} ${task.title}`,'event-chip-v2 '+(task.colour || (task.done?'done-colour':overdue(task)?'overdue-colour':'green'))+(task.done?' completed':'')+(overdue(task)?' overdue':''),()=>selectDay(key)); chip.setAttribute('aria-label',`${task.title}, ${statusText(task)}${task.time?', '+task.time:''}`); cell.append(chip); });
    if(entries.length>capacity) cell.append(button(`+${entries.length-capacity}`,'calendar-more',()=>selectDay(key)));
    cell.addEventListener('click',event=> { if(event.target===cell) selectDay(key); }); grid.append(cell);
  }
}
function renderAgenda() {
  const date=new Date(selectedDate+'T12:00:00');
  document.querySelector('#agenda-date').textContent=date.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long'});
  const list=document.querySelector('#widget-agenda-list'); list.replaceChildren();
  const entries=dateTasks(selectedDate);
  if(!entries.length) { const empty=document.createElement('p'); empty.className='agenda-empty'; empty.textContent='No appointments on this day. Add a quick note to plan your next step.'; list.append(empty); }
  entries.forEach(task=>list.append(taskRow(task)));
  if(selectedDate===dateKey(today) && pendingTasks().length) {
    const pending=document.createElement('section'); pending.id='pending-agenda'; const title=document.createElement('h4'); title.textContent=`${pendingTasks().length} pending · overdue work`; pending.append(title); pendingTasks().forEach(task=>pending.append(taskRow(task))); list.append(pending);
  }
}
function taskRow(task) {
  const row=document.createElement('div'); row.className='agenda-task'+(task.done?' completed':'');
  const details=document.createElement('div'),title=document.createElement('strong'),meta=document.createElement('p'); title.textContent=task.title;
  meta.textContent=[task.time,task.customer,statusText(task)].filter(Boolean).join(' · '); details.append(title,meta);
  const actions=document.createElement('div'); actions.className='agenda-task-actions'; actions.append(button('View task','agenda-open',()=>openTask(task)));
  const toggle=button(task.done?'Reopen':'Complete','agenda-complete',()=> { task.done=!task.done; renderWidgetMonth(); renderAgenda(); document.querySelector(`[data-toggle-task="${task.id}"]`)?.focus({preventScroll:true}); }); toggle.dataset.toggleTask=task.id; toggle.setAttribute('aria-label',`${task.done?'Reopen':'Complete'} ${task.title}`); actions.append(toggle); row.append(details,actions); return row;
}
const taskDialog=document.createElement('dialog'); taskDialog.className='experience-dialog'; taskDialog.setAttribute('aria-label','Task details'); document.querySelector('#widgets .wrap').append(taskDialog);
function openTask(task) {
  taskDialog.replaceChildren(); const heading=document.createElement('div'); heading.className='dialog-heading'; const title=document.createElement('h3'); title.textContent=task.title; heading.append(title,button('×','',()=>taskDialog.close())); heading.lastChild.setAttribute('aria-label','Close task details'); taskDialog.append(heading);
  [new Date(task.date+'T12:00:00').toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),task.time,task.customer,statusText(task)].filter(Boolean).forEach(text=> { const p=document.createElement('p'); p.className='task-detail-line'; p.textContent=text; taskDialog.append(p); });
  taskDialog.append(button(task.done?'Reopen task':'Complete task','experience-action',()=> { task.done=!task.done; taskDialog.close(); renderWidgetMonth(); renderAgenda(); }),button('Explore job evidence in the app ↗','task-detail-link',()=> { taskDialog.close(); openPhone('task-detail'); })); taskDialog.showModal();
}
document.querySelectorAll('[data-month-shift]').forEach(el=>el.addEventListener('click',()=> { widgetDate=new Date(widgetDate.getFullYear(),widgetDate.getMonth()+Number(el.dataset.monthShift),1); renderWidgetMonth(); }));
document.querySelector('.today-v2').addEventListener('click',()=> { widgetDate=new Date(today.getFullYear(),today.getMonth(),1); selectDay(dateKey(today)); });
document.querySelector('#widgetCalendarGrid').addEventListener('keydown',event=> {
  const key=event.target.dataset.calendarDate; if(!key)return;
  const date=new Date(key+'T12:00:00');
  const offsets={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};
  if(event.key in offsets) date.setDate(date.getDate()+offsets[event.key]);
  else if(event.key==='Home') date.setDate(date.getDate()-(date.getDay()+6)%7);
  else if(event.key==='End') date.setDate(date.getDate()+6-(date.getDay()+6)%7);
  else if(event.key==='PageUp'||event.key==='PageDown') {
    const day=date.getDate(); date.setDate(1); date.setMonth(date.getMonth()+(event.key==='PageUp'?-1:1));
    date.setDate(Math.min(day,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()));
  } else return;
  event.preventDefault(); widgetDate=new Date(date.getFullYear(),date.getMonth(),1); selectDay(dateKey(date));
});
document.querySelector('#agenda-phone').addEventListener('click',()=>openPhone('calendar'));
const noteDialog=document.querySelector('#widget-note-dialog');
document.querySelector('#widget-add').addEventListener('click',()=> { document.querySelector('#note-date').value=selectedDate; noteDialog.showModal(); });
document.querySelector('[data-close-note]').addEventListener('click',()=>noteDialog.close());
document.querySelector('#widget-note-form').addEventListener('submit',event=> {
  event.preventDefault(); const title=document.querySelector('#note-title').value.trim(),key=document.querySelector('#note-date').value;
  if(!title) { document.querySelector('#note-title').focus(); return; }
  tasks.push({id:Date.now(),title,date:key,due:key,colour:document.querySelector('#note-colour').value});
  const date=new Date(key+'T12:00:00'); widgetDate=new Date(date.getFullYear(),date.getMonth(),1); noteDialog.close(); event.currentTarget.reset(); selectDay(key); document.querySelector('#widget-add').focus();
});
document.querySelectorAll('.widget-switch').forEach(el=>el.addEventListener('click',()=> {
  document.querySelectorAll('.widget-switch').forEach(btn=> { const active=btn===el; btn.classList.toggle('active',active); btn.setAttribute('aria-pressed',String(active)); });
  document.querySelectorAll('.widget-preview').forEach(panel=>panel.classList.toggle('active',panel.dataset.widgetPanel===el.dataset.widget));
}));
document.querySelectorAll('[data-widget-theme]').forEach(el=>el.addEventListener('click',()=> {
  document.querySelector('#widget-experience').dataset.theme=el.dataset.widgetTheme;
  document.querySelectorAll('[data-widget-theme]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===el)));
}));

// Matches DiscussionWidgetModels: Inbox uses unread counters, Mentions uses flags.
const threads=[
  {id:1,name:'Alex Morgan · Operations',initials:'AM',unread:1,mentioned:false,messages:[{author:'Alex',text:'The customer visit is confirmed. Can you check the materials?',own:false}]},
  {id:2,name:'Northbay Team',initials:'NT',unread:1,mentioned:true,messages:[{author:'Northbay Team',text:'@Alex the quotation is ready to review.',own:false}]},
  {id:3,name:'Service planning',initials:'SP',unread:0,mentioned:false,messages:[{author:'Operations',text:'Next week’s appointments are ready.',own:false}]}
];
let discussionFilter='all',activeThread=null;
function renderThreads() {
  const list=document.querySelector('#discussion-threads'); list.replaceChildren();
  const visible=threads.filter(thread=>discussionFilter==='all'||(discussionFilter==='inbox'?thread.unread>0:thread.mentioned));
  document.querySelector('#discussion-count').textContent=threads.reduce((sum,thread)=>sum+thread.unread,0);
  if(!visible.length) { const empty=document.createElement('p'); empty.className='discussion-empty'; empty.textContent=discussionFilter==='inbox'?'You’re all caught up.':'No mentions to show.'; list.append(empty); }
  visible.forEach(thread=> {
    const row=button('','discuss-row-v2',()=>openThread(thread)); row.setAttribute('aria-label',`Open conversation with ${thread.name}`);
    const avatar=document.createElement('span'); avatar.className='avatar-v2'; avatar.textContent=thread.initials;
    const content=document.createElement('span'); content.className='discuss-main-v2'; const title=document.createElement('strong'); title.textContent=thread.name;
    const preview=document.createElement('span'); preview.className='discuss-line2-v2'; const last=thread.messages[thread.messages.length-1]; preview.textContent=last?last.author+': '+last.text:'No messages yet';
    const kind=document.createElement('span'); kind.className='discuss-line3-v2'; kind.textContent='Private / group chat'; content.append(title,preview,kind); row.append(avatar,content);
    if(thread.unread) { const count=document.createElement('span'); count.className='unread-v2'; count.textContent=thread.unread; row.append(count); } list.append(row);
  });
}
function openThread(thread) {
  activeThread=thread; thread.unread=0; renderThreads(); document.querySelector('#widget-conversation').hidden=false;
  document.querySelector('#conversation-title').textContent=thread.name; renderMessages();
  document.querySelector('#widget-conversation').scrollIntoView({behavior:'smooth',block:'nearest'}); document.querySelector('#conversation-reply').focus({preventScroll:true});
}
function renderMessages() {
  const log=document.querySelector('#conversation-messages'); log.replaceChildren();
  activeThread.messages.forEach(message=> { const bubble=document.createElement('p'); bubble.className='conversation-bubble'+(message.own?' own':''); const author=document.createElement('strong'),text=document.createElement('span'); author.textContent=message.author; text.textContent=message.text; bubble.append(author,text); log.append(bubble); });
}
document.querySelectorAll('[data-discuss-filter]').forEach(el=>el.addEventListener('click',()=> {
  discussionFilter=el.dataset.discussFilter; document.querySelectorAll('[data-discuss-filter]').forEach(btn=> { btn.classList.toggle('active',btn===el); btn.setAttribute('aria-pressed',String(btn===el)); }); renderThreads();
}));
document.querySelector('#discussion-refresh').addEventListener('click',()=> { renderThreads(); document.querySelector('#discussion-checked').textContent='Checked '+new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'}); });
document.querySelector('#conversation-back').addEventListener('click',()=> { document.querySelector('#widget-conversation').hidden=true; document.querySelector('#discussion-refresh').focus(); });
document.querySelector('#conversation-form').addEventListener('submit',event=> { event.preventDefault(); const input=document.querySelector('#conversation-reply'),text=input.value.trim(); if(!text||!activeThread)return; activeThread.messages.push({author:'You',text,own:true}); input.value=''; renderMessages(); renderThreads(); input.focus(); });
document.querySelector('#conversation-phone').addEventListener('click',()=>openPhone('discussion'));
document.querySelector('#widget-new-chat').addEventListener('click',()=> { let thread=threads.find(row=>row.id===4); if(!thread) { thread={id:4,name:'New conversation · Northbay Team',initials:'NT',unread:0,mentioned:false,messages:[]}; threads.unshift(thread); } openThread(thread); });
renderWidgetMonth(); renderAgenda(); renderThreads();

const initialTasks=tasks.map(task=>({...task}));
const initialThreads=threads.map(thread=>({...thread,messages:thread.messages.map(message=>({...message}))}));
const resetButton=button('Reset examples','reset-examples',()=> {
  tasks.splice(0,tasks.length,...initialTasks.map(task=>({...task})));
  threads.splice(0,threads.length,...initialThreads.map(thread=>({...thread,messages:thread.messages.map(message=>({...message}))})));
  widgetDate=new Date(today.getFullYear(),today.getMonth(),1); selectedDate=dateKey(today); discussionFilter='all'; activeThread=null;
  document.querySelectorAll('[data-discuss-filter]').forEach(el=> { const active=el.dataset.discussFilter==='all'; el.classList.toggle('active',active); el.setAttribute('aria-pressed',String(active)); });
  document.querySelector('#widget-conversation').hidden=true; document.querySelector('#conversation-form').reset(); document.querySelector('#discussion-checked').textContent='Up to date';
  screenHistory.length=0; showScreen('overview',false); renderWidgetMonth(); renderAgenda(); renderThreads();
});
document.querySelector('#widgets>.wrap>.sample-note').append(' ',resetButton);
