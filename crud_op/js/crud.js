class CrudOp {
    constructor() {
        this.selectedRow = null;
        this.searchObj = {};
    }
    readFormData() {
        var formData = {};
        formData["fullName"] = document.getElementById("fullName").value;
        formData["empCode"] = document.getElementById("empCode").value;
        formData["salary"] = document.getElementById("salary").value;
        return formData;
    }
    insertNewFormData(data) {
        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        cell1.innerHTML = data.fullName;
        cell2.innerHTML = data.empCode;
        cell3.innerHTML = data.salary;
        cell4.innerHTML = `<a onClick="cobj.editForm(this)">Edit</a>
                           <a onClick="cobj.deleteForm(this)">Delete</a>
                            `

    }
    updateFormData(tr) {
        this.selectedRow = tr;
        this.selectedRow.cells[0].innerHTML = document.getElementById('fullName').value;
        this.selectedRow.cells[1].innerHTML = document.getElementById('empCode').value;
        this.selectedRow.cells[2].innerHTML = document.getElementById('salary').value;
    }
    editForm(tr) {
        this.selectedRow = tr.parentElement.parentElement;
        document.getElementById('fullName').value = this.selectedRow.cells[0].innerHTML;
        document.getElementById('empCode').value = this.selectedRow.cells[1].innerHTML;
        document.getElementById('salary').value = this.selectedRow.cells[2].innerHTML;
    }
    deleteForm(tr) {
        let row = tr.parentElement.parentElement;
        document.getElementById('employeeList').deleteRow(row.rowIndex);

    }
    resetForm() {
        document.getElementById('fullName').value = '';
        document.getElementById('empCode').value = '';
        document.getElementById('salary').value = '';
        this.selectedRow = null;
    }

    searchForm(type) {
        let getInput = document.getElementById('sfullName').value;
        this.searchObj[type.toString()] = getInput;
        console.log(this.searchObj);
    }

}

var cobj = new CrudOp();
function onFormSubmit() {
    var formData = cobj.readFormData();
    console.log(cobj.selectedRow);
    if (cobj.selectedRow == null) {
        cobj.insertNewFormData(formData);
    } else {
        cobj.updateFormData(cobj.selectedRow);
    }
    cobj.resetForm();
    console.log("formData::" + JSON.stringify(formData));
}

function searchFname(type) {
    cobj.searchForm(type);
}
