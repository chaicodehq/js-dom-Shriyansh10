/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {
  // Your code here
  if (typeof name !== "string")
    return { valid: false, error: "Naam string hona chahiye" };
  const arr = Array.from(name);
  if (name.length < 2)
    return {
      valid: false,
      error: "Naam mein kam se kam 2 characters hone chahiye",
    };
  if (name.length > 50)
    return { valid: false, error: "Naam 50 characters se zyada nahi ho sakta" };
  if (!name.match(/^[A-Za-z ]+$/))
    return {
      valid: false,
      error: "Naam mein sirf letters aur spaces allowed hain",
    };
  return {
    valid: true,
    error: null,
  };
}

export function validateDate(dateString) {
  // Your code here
  let error = null;
  const date = new Date(dateString);
  if (typeof dateString !== "string") error = "Date string honi chahiye";
  else if (date - Date.now() < 0) error = "Date aaj ya future ki honi chahiye";
  else if (
    !Number(date.getFullYear()) ||
    !Number(date.getMonth()) ||
    !Number(date.getDate())
  )
    error = "Date YYYY-MM-DD format mein honi chahiye";
  if (error) return { valid: false, error };
  else return { valid: true, error };
}

export function validateAartiType(type) {
  // Your code here
  let error = null;
  if (typeof type !== "string") error = "Aarti type string hona chahiye";
  else if (type !== "morning" && type !== "evening" && type !== "special") {
    error = "Aarti type morning, evening, ya special mein se hona chahiye";
  }
  if (error) return { valid: false, error };
  return { valid: true, error: null };
}

export function setupAartiForm(formElement, onSuccess, onError) {
  // Your code here
  if (!formElement) return null;
  if (typeof onSuccess !== "function" || typeof onError !== "function") {
    return null;
  }
  formElement.addEventListener("submit", submitHandler);
  function submitHandler(e) {
    e.preventDefault();
    const name = formElement.querySelector(`[name = 'name']`);
    const date = formElement.querySelector(`[name = 'date']`);
    const type = formElement.querySelector(`[name = 'aartiType']`);

    const errorsArray = [];
    const nameValidation = validateName(name.value);
    const dateValidation = validateDate(date.value);
    const typeValidation = validateAartiType(type.textContent.toLowerCase());
    // console.log(nameValidation, dateValidation, typeValidation);
    // console.log(name.value, date.value, type.textContent.toLowerCase());
    if (!nameValidation.valid || !dateValidation.valid || !typeValidation.valid) {
      nameValidation.valid ? "" : errorsArray.push(nameValidation.error);
      dateValidation.valid ? "" : errorsArray.push(dateValidation.error);
      typeValidation.valid ? "" : errorsArray.push(typeValidation.error);
      onError(errorsArray);
    } else{
      onSuccess({
        name: name.value,
        date: date.value,
        aartiType: type.textContent.toLowerCase(),
      });
  }}
  return () => formElement.removeEventListener("submit", submitHandler);
}

export function createBookingSummary(booking) {
  // Your code here
  if(!booking) return null;
  const {name, date, aartiType} = booking;
  if(!name || !date || !aartiType) return null;
  const div = document.createElement('div')
  div.classList.add('booking-summary');
  const h3 = document.createElement('h3')
  const pName = document.createElement('p')
  const pDate = document.createElement('p')
  const pType = document.createElement('p')
  h3.textContent = 'Booking Confirmation'
  pName.className = 'booking-name'
  pDate.className = 'booking-date'
  pType.className = 'booking-type'
  pName.textContent = `Bhakt: ${name}`
  pDate.textContent = `Date: ${date}`
  pType.textContent = `Aarti: ${aartiType}`
  div.appendChild(h3)
  div.appendChild(pName)
  div.appendChild(pDate)
  div.appendChild(pType)
  return div
}
