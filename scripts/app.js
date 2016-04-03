import {GlobalTodoList, TopNavbar, SideBar} from '../views/todo_widgets.jsx';

var sqlite3 = require('sqlite3').verbose();
//var jQuery = require('jquery');
//var bootstrap = require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
require('babel-register');

const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;
const DB_FILE = remote.getGlobal('DB_FILE');

ipcRenderer.on('db-migration-complete', function(event, arg) {
  console.log("DB migrated, now at version " + version);
});

window.onbeforeunload = function shutdownHandler() {
  if(db) db.close();
};

var db = new sqlite3.Database(DB_FILE, function() {
 db.serialize(function() {
    db.each("SELECT * FROM states", function(err, row) {
      console.log(row);
    });
 });
});

var tasks = [
  {id: 1, todo: "TODO", is_done: false, description: "A todo", tags: ["label1", "label2"], effort: 105},
  {id: 2, todo: "TODO", is_done: false, description: "Another todo", tags: ["bork", "baz"], effort: 90},
  {id: 3, todo: "TODO", is_done: false, description: "Do the dishes", tags: ["flurk", "flerk"], effort: 1232}
];

window.onload = function() {
  ReactDOM.render(
      <div>
      <TopNavbar/>
      <div className="container-fluid">
      <div class="row">
      <SideBar/>
      <GlobalTodoList tasks={tasks}/>
      </div>
      </div>
      </div>,
    document.getElementById('container')
  );
};

db.close();
