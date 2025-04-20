export async function refreshContacts() {
        try {
            const response = await fetch(
              "https://playground.4geeks.com/contact/agendas/fede/contacts"
            );
            if (!response.ok) {
              console.error(response.status, response.statusText);
              return null; 
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching contacts:", error);
            return null;
          }
    }

export async function deleteContact(id) {
    try {
        const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/fede/contacts/${id}`,
        {
            method: "DELETE",
        }
        );
        if (!response.ok) {
        console.error(`Error deleting contact with ID ${id}:`, response.status, response.statusText);
        return false;
        }
        return true; 
    } catch (error) {
        console.error(`Error deleting contact with ID ${id}:`, error);
        return false;
    }
    }


export async function addContact(newContact) {
    try {
        const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/fede/contacts", 
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
        }
        );
        if (!response.ok) {
        console.error("Error adding contact:", response.status, response.statusText);
        return null; 
        }
        const datapost = await response.json();
        return datapost;
    } catch (error) {
        console.error("Error adding contact:", error);
        return null;
    }
    }

export async function editContact(id, updatedContact) {
    try {
        const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/fede/contacts/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedContact),
            }
        );
        if (!response.ok) {
            console.error(`Error updating contact with ID ${id}:`, response.status, response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Error updating contact with ID ${id}:`, error);
        return false;
    }
  }