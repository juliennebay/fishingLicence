fetch("https://api.ontario.ca/api/data/64029?count=0&download=1").then(
  response => {
    response.json().then(addressArray => {
      addressArray.forEach(addressObj => {
        const tbody = document.querySelector("tbody");
        const addressRow = document.createElement("tr");
        tbody.appendChild(addressRow);
        //col 1 - city name
        const td1 = document.createElement("td");
        td1.classList.add("column");
        const cityName = addressObj._city.content;
        td1.textContent = cityName;
        addressRow.appendChild(td1);
        //col 2 - business name
        const businessName = addressObj.business_name.content;
        const td2 = document.createElement("td");
        td2.classList.add("column");
        td2.textContent = businessName;
        addressRow.appendChild(td2);
        //col 3 - address
        const address = addressObj.street_address.content;
        const td3 = document.createElement("td");
        td3.classList.add("column");
        td3.textContent = address;
        addressRow.appendChild(td3);
        //col 4 - postal code
        const postalCode = addressObj.postal_code.content;
        const td4 = document.createElement("td");
        td4.setAttribute("id", "postalCodeID");
        td4.classList.add("column");
        td4.textContent = postalCode;
        addressRow.appendChild(td4);
        //col 5 - issuer type
        const issuerType = addressObj.issuer_type.content;
        const td5 = document.createElement("td");
        td5.classList.add("column");
        td5.textContent = issuerType;
        addressRow.appendChild(td5);
      });
    });

    //search function - search by any keyword
    const searchInput = document.querySelector("input");

    function searchLocation(event) {
      const searchWord = event.target.value.toLowerCase();
      const addressRows = document.querySelectorAll("tbody > tr");
      //loop over the rows
      addressRows.forEach(row => {
        const children = row.querySelectorAll("td");
        const matchExists = [...children].some(element =>
          element.textContent.toLowerCase().includes(searchWord)
        );

        if (matchExists) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    //call the function above when the input value changes
    searchInput.addEventListener("input", searchLocation);
  }
);
