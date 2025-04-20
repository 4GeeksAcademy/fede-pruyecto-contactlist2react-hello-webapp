export const initialState = {
    contacts: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "load_contact": // Aunque ahora la carga inicial se hará directamente
            return {
                ...state,
                contacts: action.payload.contacts,
            };
        case "delete_contact":
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload.id
                ),
            };
        case "add_contact":
            return {
                ...state,
                contacts: [...state.contacts, action.payload.newContact],
            };
        case "update_contact":
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact.id === action.payload.id
                        ? { ...contact, ...action.payload.updatedContact }
                        : contact
                ),
            };
        default:
            return state;
    }
};