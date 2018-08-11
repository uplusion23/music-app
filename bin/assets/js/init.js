var your_menu = new nw.Menu({ type:'menubar'});

var submenu = new nw.Menu();
submenu.append(new nw.MenuItem({label: 'Item A'}));
submenu.append(new nw.MenuItem({label: 'Item B'}));

your_menu.append(new nw.MenuItem({
  label: 'First Menu',
  submenu: submenu
}));
nw.Window.get().menu = your_menu;
