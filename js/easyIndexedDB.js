class hoge {
  constructor(b) {
    this.a = b;
  }

  static async init() {
    let c = Dexie.exists("easyIndexedDB");
    let d = await new hoge(c);
    return await c;
  }
  unko() {
    return this.a;
  }
}

class EasyIndexedDB {
  constructor(obj, dbList) {
    this.name = obj.name;
    this.version = obj.version;
    this.tableData = obj.data;
    this.dbList = dbList;
  }

  static async init(obj) {
    obj = obj.name || {};
    obj.name = obj.name || "easyIndexedDB";
    obj.version = obj.version || 1;
    obj.data = obj.data || {
      dbList: "name, version, table ",
      settings: "name, value",
      files: "name,type"
    };
    let exists = await Dexie.exists(obj.name);
    let initDB = await new Dexie(obj.name);
    await initDB.version(obj.version).stores(obj.data);
    if (!exists) {
      await initDB.dbList.put({
        name: obj.name,
        version: obj.version,
        table: JSON.stringify(obj.data)
      });
    }
    let initDBlist = initDB.dbList;
    return new EasyIndexedDB(obj, initDBlist);
  }

  async iniEasyDB(callback) {
    let dbFlag = await Dexie.exists(this.name);
    let db = await new Dexie(this.name);
    await db.version(this.version).stores(this.tableData);
    if (dbFlag) {
      await db.dbList.put({
        name: this.name,
        version: this.version,
        table: JSON.stringify(this.tableData)
      });
    }
    this.dbList = await this.db.dbList;
    callback(this);
  }

  getDBdata(callback, dbName) {
    this.db.dbList
      .where("name")
      .equalsIgnoreCase(dbName)
      .toArray()
      .then(function(arr) {
        if (arr.length == 0) {
          callback(false);
        } else {
          callback(arr[0]);
        }
      });
  }

  getDBList(callback) {
    this.db.dbList.toArray().then(function(arr) {
      if (arr.length == 0) {
        callback(false);
      } else {
        callback(arr);
      }
    });
  }

  getTableList(callback, dbName) {
    this.db.dbList
      .where("name")
      .equalsIgnoreCase(dbName)
      .toArray()
      .then(function(arr) {
        if (arr.length == 0) {
          callback(false);
        } else {
          callback(arr[0]["table"]);
        }
      });
  }
}

function startMain(name, version, data) {
  let easyDB = hoge.init();
  if (!easyDB) {
    alert(easyDB);
  }
}

function getMainPage() {
  return '<div id="easyIndexedDB-contents" style="margin:4px;pedding:4px;font-size: small;">\
    <style>#easyIndexedDB-contents p{ margin:5px;}</style>\
    <ul id="easyIndexedDB-pages" style="list-style:">\
        <li id="easyIndexedDb-edit-form">\
            <h3>Easy IndexedDB</h3>\
            <p>DB Name : <input id="easyIndexedDB-DB-name" style="margin:1px;pedding:1px;"></p>\
            <p>Version : <span id="easyIndexedDB-version"></span></p>\
            <p>Origin url : <span id="easyIndexedDB-origin-url"></span></p>\
            <p><button id="easyIndexedDB-add-button" type="button">Add Table</button> Table name : field (Comma separated)</p>\
            <ol id="easyIndexedDB-table-list" style="padding-left: 20px;margin-top: 8px;">\
            </ol>\
            <p style="margin-top: 8px"><button id="easyIndexedDB-apply-button" type="button">Apply</button></p>\
        </li>\
    </ul>\
</div>\
';
}

function oldDBfac() {
  var htmlContents =
    '<div id="easyIndexedDB-contents" style="margin:4px;pedding:4px;font-size: small;">\
    <style>#easyIndexedDB-contents p{ margin:5px;}</style>\
    <ul id="easyIndexedDB-pages" style="list-style:">\
        <li id="easyIndexedDb-edit-form">\
            <h3>Easy IndexedDB</h3>\
            <p>DB Name : <input id="easyIndexedDB-DB-name" style="margin:1px;pedding:1px;"></p>\
            <p>Version : <span id="easyIndexedDB-version"></span></p>\
            <p>Origin url : <span id="easyIndexedDB-origin-url"></span></p>\
            <p><button id="easyIndexedDB-add-button" type="button">Add Table</button> Table name : field (Comma separated)</p>\
            <ol id="easyIndexedDB-table-list" style="padding-left: 20px;margin-top: 8px;">\
            </ol>\
            <p style="margin-top: 8px"><button id="easyIndexedDB-apply-button" type="button">Apply</button></p>\
        </li>\
    </ul>\
</div>\
';
  var easyIndexedDB = jsPanel.create({
    headerTitle: "Easy IndexedDB",
    position: "center-top 0 80",
    contentSize: "450 250",
    content: htmlContents,
    headerLogo:
      '<input type="text" id="db-input" list="db-list" placeholder="input DB name" autocomplete="off" style="margin-left:8px;font-size:10pt;"><datalist id="db-list"></datalist>',
    headerToolbar:
      '<input type="text" id="table-input" list="table-list" placeholder="input Table name" autocomplete="off" style="font-size:10pt;"><datalist id="table-list"></datalist>' +
      '<div style="margin-left:8px;">' +
      '<span id="bus"><i class="fas fa-file-import fa-lg"></i></span>' +
      '<span id="train"><i class="fas fa-file-download fa-lg"></i></span>' +
      '<span id="car"><i class="fas fa-hand-holding-usd fa-lg"></i></span>' +
      '<span id="car"><i class="fas fa-money-check-alt fa-lg"></i></span>' +
      '<span id="car"><i class="fas fa-chart-line fa-lg"></i></span>' +
      '<span id="bicycle"><i class="fas fa-calculator fa-lg"></i></span>' +
      "</div>",
    callback: function(panel) {
      Dexie.exists("easyIndexedDB").then(function(exists) {
        let eDB = new Dexie("easyIndexedDB");
        let tableData = {
          dbList: "++id, name, version, table ",
          settings: "name, value"
        };
        eDB.version(1).stores(tableData);
        if (!exists) {
          eDB.dbList.put({
            name: "easyIndexedDB",
            version: 1,
            table: JSON.stringify(tableData)
          });
          eDB.settings.put({ name: "status", value: "new" });
        }
        eDB.dbList.toArray().then(function(data) {
          let dataList = document.getElementById("db-list");
          data.forEach(function(val) {
            let option = document.createElement("option");
            option.text = val.name;
            option.value = val.name;
            dataList.appendChild(option);
          });
        });
      });
      let dbInput = document.getElementById("db-input");
      dbInput.addEventListener("change", function(event) {
        selectDB(event);
      });
      dbInput.addEventListener("click", function(event) {
        dbInput.value = "";
      });
      let tableInput = document.getElementById("table-input");
      tableInput.addEventListener("change", function(event) {
        selectTable(event);
      });
      tableInput.addEventListener("click", function(event) {
        tableInput.value = "";
      });
      let addTableList = document.getElementById("easyIndexedDB-add-button");
      addTableList.addEventListener("click", function(event) {
        addTableListLi();
      });
      addTableListLi();
      let dbOrigin = document.getElementById("easyIndexedDB-origin-url");
      dbOrigin.innerHTML = location.hostname;
      this.headertoolbar.querySelectorAll("span").forEach(function(item) {
        item.style.cursor = "pointer";
        item.style.marginRight = "4px";
        item.addEventListener("click", function() {
          panel.content.innerHTML = "You clicked the " + item.id + " icon!";
        });
      });
    }
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
