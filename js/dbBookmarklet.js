function startMain() {
  
  showWindowFrame();
  
  alert("OK!");
}

function showWindowFrame() {
  var easyIndexedDB = jsPanel.create({
    headerTitle: "Easy IndexedDB",
    position: "center-top 0 80",
    contentSize: "450 250",
    content: '<div id="table-element"></div>',
    headerLogo:
      '<input type="text" id="db-input" list="db-list" placeholder="input DB name" autocomplete="off" style="margin-left:8px;font-size:10pt;"><datalist id="db-list"></datalist>',
    headerToolbar:
      '<input type="text" id="table-input" list="table-list" placeholder="input Table name" autocomplete="off" style="font-size:10pt;"><datalist id="table-list"></datalist>' +
      '<div style="margin-left:8px;">' +
      '<span id="bus"><i class="fas fa-file-import fa-lg"></i></span>' +
      '<span id="train"><i class="fas fa-file-download fa-lg"></i></span>' +
      "</div>",
    callback: function(panel) {
      showGridTable()
    }
  });
  
}

function showGridTable(){
  var data = [
  ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
  ['2017', 10, 11, 12, 13],
  ['2018', 20, 11, 14, 13],
  ['2019', 30, 15, 12, 13]
];

var container = document.getElementById('table-element');
var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  filters: true,
  dropdownMenu: true,
  licenseKey: "non-commercial-and-evaluation"
});
}

function createEasyIndexedDB() {
  let eDB = new Dexie("easyIndexedDB");
  eDB.version(1).stores({
    dbList: "++id, name, version, table ",
    settings: "name, value"
  });
  return eDB;
}

function addTableListLi(tableLiName, field) {
  let span = document.createElement("span");
  span.innerHTML = '<i class="fas fa-times"></i>';
  span.class = "easyIndexedDB-tablelist-delete";
  span.style = "margin-left: 8px;";
  span.addEventListener("click", function(event) {
    let remove = event.target.parentNode.parentNode;
    remove.parentNode.removeChild(remove);
  });
  let tableOl = document.getElementById("easyIndexedDB-table-list");
  let li = document.createElement("li");
  let tableInput = tableLiName ? 'value="' + tableLiName + '" ' : "";
  let fieldInput = field ? 'value="' + field + '" ' : "";
  li.innerHTML =
    '<input class="easyIndexedDB-table-name-li" style="width:80px;" placeholder="Table Name" ' +
    tableInput +
    '> : <input class="easyIndexedDV-field-li" ' +
    fieldInput +
    'placeholder="Comma separated field">';
  li.appendChild(span);
  tableOl.appendChild(li);
}

function selectDB(event) {
  if (event.target.value) {
    let eDB = createEasyIndexedDB();
    eDB.dbList
      .where("name")
      .equalsIgnoreCase(event.target.value)
      .toArray()
      .then(function(arr) {
        if (arr.length == 0) {
          alert("aaa");
        } else if (arr.length == 1) {
          let tableList = document.getElementById("table-list");
          let tableData = JSON.parse(arr[0]["table"]);
          let tableInput = document.getElementById("table-input");
          let dbNameInput = document.getElementById("easyIndexedDB-DB-name");
          let dbversion = document.getElementById("easyIndexedDB-version");
          let tableOl = document.getElementById("easyIndexedDB-table-list");
          tableInput.value = "";
          dbNameInput.value = event.target.value;
          dbversion.innerHTML = arr[0]["version"];
          while (tableList.firstChild) {
            tableList.removeChild(tableList.firstChild);
          }
          while (tableOl.firstChild) {
            tableOl.removeChild(tableOl.firstChild);
          }
          Object.keys(tableData).forEach(function(key) {
            let option = document.createElement("option");
            option.text = key;
            option.value = key;
            tableList.appendChild(option);
            addTableListLi(key, tableData[key]);
          });
        }
      });
  }
}

function selectTable(event) {
  let dbInput = document.getElementById("db-input").value;
  if (event.target.value && dbInput) {
    let eDB = createEasyIndexedDB();
    eDB.dbList
      .where("name")
      .equalsIgnoreCase(dbInput)
      .toArray()
      .then(function(arr) {
        if (arr.length == 0) {
          alert("aaa");
        } else if (arr.length == 1) {
          let tableList = document.getElementById("table-list");
          let tableData = JSON.parse(arr[0]["table"]);
          if (Object.keys(tableData).includes(event.target.value)) {
          } else {
          }
        }
      });
  }
}

