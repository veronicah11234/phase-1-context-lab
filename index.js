// Define employees globally
const employees = [];

// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create an employee records from an array of arrays
function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(createEmployeeRecord);
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(employee, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const formattedDate = date.replace(/-/g, "/");
    const [hour] = time.split(":"); // Split the time into hours

    employee.timeInEvents.push({ type: "TimeIn", date: formattedDate, hour: parseInt(hour, 10) });
    return employee;
}



// Function to add a timeOut event to an employee's record
function createTimeOutEvent(employee, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const hour = parseInt(time, 10);
    employee.timeOutEvents.push({ type: "TimeOut", date, hour });
    return employee;
}

// Function to add an employee
function addEmployee() {
    const firstName = document.getElementById("firstName").value;
    const familyName = document.getElementById("familyName").value;
    const title = document.getElementById("title").value;
    const payPerHour = parseFloat(document.getElementById("payPerHour").value);

    const newEmployee = createEmployeeRecord([firstName, familyName, title, payPerHour]);
    employees.push(newEmployee);
    console.log("Employee added:", newEmployee);
}

// Function to punch in for an employee
function punchIn() {
    const adjustedEmployeeIndex = parseInt(document.getElementById("employeeIndex").value) - 1; // Adjust index
    const timeInDate = document.getElementById("timeInDate").value;
    const timeInTime = document.getElementById("timeInTime").value;

    console.log("Adjusted Employee Index:", adjustedEmployeeIndex + 1); // Log adjusted index
    console.log("Number of Employees:", employees.length);

    if (adjustedEmployeeIndex >= 0 && adjustedEmployeeIndex < employees.length) {
        const employee = employees[adjustedEmployeeIndex];
        console.log("Employee:", employee);

        const dateTimeString = `${timeInDate} ${timeInTime}`;
        createTimeInEvent(employee, dateTimeString);
        console.log("Punched in:", employee);
    } else {
        console.error("Invalid employee index or employee not found.");
    }
    
    // Add this line to verify the displayElement
    console.log("Display Element:", document.getElementById("employeeInfoDisplay"));
}

function punchOut() {
    const employeeIndex = parseInt(document.getElementById("employeeIndex").value) - 1;
    const timeOutDate = document.getElementById("timeOutDate").value;
    const timeOutTime = document.getElementById("timeOutTime").value;

    const employee = employees[employeeIndex];

    console.log("Employee Index:", employeeIndex + 1); // Log adjusted index
    console.log("Employee:", employee);

    if (employee) {
        const dateTimeString = `${timeOutDate} ${timeOutTime}`;
        createTimeOutEvent(employee, dateTimeString);
        console.log("Punched out:", employee);
    } else {
        console.error("Invalid employee index or employee not found.");
    }
}

// Function to display employee information
function displayInfo() {
    const adjustedEmployeeIndex = parseInt(document.getElementById("employeeIndex").value) - 1;
    const displayElement = document.getElementById("employeeInfoDisplay");

    console.log("Adjusted Employee Index:", adjustedEmployeeIndex + 1);
    console.log("Number of Employees:", employees.length);
    console.log("Display Element:", displayElement);

    if (adjustedEmployeeIndex >= 0 && adjustedEmployeeIndex < employees.length) {
        const employee = employees[adjustedEmployeeIndex];
        console.log("Employee:", employee);

        const infoString = `Employee Information: ${JSON.stringify(employee)}`;
        console.log("Info String:", infoString);

        displayElement.innerText = infoString;
        console.log("Info Displayed");
    } else {
        displayElement.innerText = "Employee not found.";
        console.log("Employee not found (Display)");
    }
}




document.getElementById("addEmployeeButton").addEventListener("click", addEmployee);

document.getElementById("punchInButton").addEventListener("click", punchIn);

document.getElementById("displayInfoButton").addEventListener("click", displayInfo);

