// ------------------ SELECTORS ------------------
const addContactBtn = document.getElementById("addContact");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeBtn");
const addBtn = document.getElementById("addBtn");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");

// ------------------ CONTACT STORAGE ------------------
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null; // track currently editing contact

// ------------------ SAVE TO LOCAL STORAGE ------------------
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// ------------------ OPEN MODAL ------------------
function openModal(editMode = false, index = null) {
    modalOverlay.classList.remove("hidden");

    if (editMode) {
        editIndex = index;
        nameInput.value = contacts[index].name;
        phoneInput.value = contacts[index].phone;
        addBtn.textContent = "Update";
    } else {
        editIndex = null;
        nameInput.value = "";
        phoneInput.value = "";
        addBtn.textContent = "Save";
    }
}

// ------------------ CLOSE MODAL ------------------
function closeModal() {
    modalOverlay.classList.add("hidden");
    nameInput.value = "";
    phoneInput.value = "";
    editIndex = null;
}

// ------------------ RENDER CONTACTS ------------------
function renderContacts(list) {
    contactList.innerHTML = "";

    if (list.length === 0) {
        contactList.innerHTML = `<p class="empty-msg">No contacts found.</p>`;
        return;
    }

    list.forEach((contact, index) => {
        const card = document.createElement("div");
        card.classList.add("contact-card");
        card.innerHTML = `
            <h3>${contact.name}</h3>
            <p>${contact.phone}</p>

            <div class="card-btns">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        contactList.appendChild(card);
    });
}

// ------------------ ADD/UPDATE CONTACT ------------------
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") return;

    if (editIndex !== null) {
        contacts[editIndex] = { name, phone };
    } else {
        contacts.push({ name, phone });
    }

    saveContacts();
    renderContacts(contacts);
    closeModal();
});

// ------------------ DELETE CONTACT ------------------
contactList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        contacts.splice(index, 1);
        saveContacts();
        renderContacts(contacts);
    }

    if (e.target.classList.contains("edit-btn")) {
        const index = e.target.dataset.index;
        openModal(true, index);
    }
});

// ------------------ OPEN MODAL ON ADD BUTTON ------------------
addContactBtn.addEventListener("click", () => openModal());

// ------------------ CLOSE MODAL ------------------
closeBtn.addEventListener("click", closeModal);

// ------------------ SEARCH FUNCTIONALITY ------------------
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length === 0) {
        renderContacts(contacts);
        return;
    }

    const filtered = contacts.filter(
        (c) =>
            c.name.toLowerCase().includes(query) ||
            c.phone.includes(query)
    );

    if (filtered.length === 0) {
        contactList.innerHTML = `<p class="empty-msg">No matching contact found.</p>`;
        return;
    }

    renderContacts(filtered);
});

// ------------------ INITIAL LOAD ------------------
renderContacts(contacts);
