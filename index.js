document.addEventListener("DOMContentLoaded", function () {
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
    let displayElement = document.getElementById("employeeInfoDisplay");

    // Check if the displayElement exists or create it if not
    if (!displayElement) {
        displayElement = document.createElement("div");
        displayElement.id = "employeeInfoDisplay";
        document.body.appendChild(displayElement);
    }

    if (adjustedEmployeeIndex >= 0 && adjustedEmployeeIndex < employees.length) {
        const employee = employees[adjustedEmployeeIndex];

        // Create HTML elements for each piece of information
        const infoDiv = document.createElement("div");
        infoDiv.style.border = "1px solid #ccc";
        infoDiv.style.padding = "10px";
        infoDiv.style.marginTop = "20px";

        const nameParagraph = document.createElement("p");
        const titleParagraph = document.createElement("p");
        const payParagraph = document.createElement("p");
        const timeInEventsHeading = document.createElement("h4");
        const timeOutEventsHeading = document.createElement("h4");

        // Set the content of each element
        nameParagraph.innerText = `Name: ${employee.firstName} ${employee.familyName}`;
        titleParagraph.innerText = `Title: ${employee.title}`;
        payParagraph.innerText = `Pay per Hour: $${employee.payPerHour.toFixed(2)}`;

        timeInEventsHeading.innerText = "TimeIn Events:";
        const timeInEventsList = document.createElement("ul");

        // Check if there are timeInEvents for the employee
        if (employee.timeInEvents && employee.timeInEvents.length > 0) {
            employee.timeInEvents.forEach((event) => {
                const eventItem = document.createElement("li");
                eventItem.innerText = `${event.type} - Date: ${event.date}, Hour: ${event.hour}`;
                timeInEventsList.appendChild(eventItem);
            });
        } else {
            const noEventsItem = document.createElement("li");
            noEventsItem.innerText = "No timeIn events found for the employee.";
            timeInEventsList.appendChild(noEventsItem);
        }

        timeOutEventsHeading.innerText = "TimeOut Events:";
        const timeOutEventsList = document.createElement("ul");

        // Check if there are timeOutEvents for the employee
        if (employee.timeOutEvents && employee.timeOutEvents.length > 0) {
            employee.timeOutEvents.forEach((event) => {
                const eventItem = document.createElement("li");
                eventItem.innerText = `${event.type} - Date: ${event.date}, Hour: ${event.hour}`;
                timeOutEventsList.appendChild(eventItem);
            });
        } else {
            const noEventsItem = document.createElement("li");
            noEventsItem.innerText = "No timeOut events found for the employee.";
            timeOutEventsList.appendChild(noEventsItem);
        }

        // Append the HTML elements to the infoDiv
        infoDiv.appendChild(nameParagraph);
        infoDiv.appendChild(titleParagraph);
        infoDiv.appendChild(payParagraph);
        infoDiv.appendChild(timeInEventsHeading);
        infoDiv.appendChild(timeInEventsList);
        infoDiv.appendChild(timeOutEventsHeading);
        infoDiv.appendChild(timeOutEventsList);

        // Clear the previous content and append the new infoDiv
        displayElement.innerHTML = '';
        displayElement.appendChild(infoDiv);
    } else {
        // Update the displayElement directly
        displayElement.innerHTML = "Employee not found.";
    }
}





    // Add Employee button event listener
    document.getElementById("addEmployeeButton").addEventListener("click", addEmployee);

    // Punch In button event listener
    document.getElementById("punchInButton").addEventListener("click", punchIn);

    // Display Info button event listener
    document.getElementById("displayInfoButton").addEventListener("click", displayInfo);
});
