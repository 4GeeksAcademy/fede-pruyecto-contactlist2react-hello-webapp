import { useEffect, useReducer } from "react";
import { refreshContacts as fetchContacts, deleteContact as removeContact } from "../functions";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";



export const ContactsList = () => {
    const { state, dispatch } = useGlobalReducer();
    const { contacts } = state;

    const loadInitialContacts = async () => {
        const data = await fetchContacts();
        if (data) {
            dispatch({ type: "load_contact", payload: { contacts: data.contacts } });
        }
    };

    const handleDeleteContact = async (id) => {
        const success = await removeContact(id);
        if (success) {
            dispatch({ type: "delete_contact", payload: { id } });
            console.log(`Contacto con ID ${id} eliminado.`);
        } else {
            console.error(`No se pudo eliminar el contacto con ID ${id}.`);
            
        }
    };

    useEffect(() => {
        loadInitialContacts();
    }, [])

    return (
        <div className="containerContact">
            <div>
                <Link to="/addcontact" className="d-flex justify-content-end m-5">
                    <button className="btn btn-success ">Add New Contact</button>
                </Link>
            </div>
            <div className="d-flex flex-column ">
                {contacts.map((contact) => (
                    <div key={contact.id} className="d-flex m-1">
                        <div className="d-flex">
                            <img className="imgUser" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <ul>
                                <li>nombre: {contact.name}</li>
                                <li>telefono: {contact.phone}</li>
                                <li>direccion: {contact.address}</li>
                                <li>email: {contact.email}</li>
                            </ul>
                        </div>
                        <div className="d-flex ms-auto">

                            <Link to={`/contactedit/${contact.id}`}>
                                <button className="btn btn-success">Editar</button>
                            </Link>
                            <div>
                                <button className="btn btn-danger" onClick={() => handleDeleteContact(contact.id)}>eliminar</button>
                            </div>

                        </div>
                    </div>
                ))}
                {contacts.length === 0 && <p>No hay contactos para mostrar.</p>}
            </div>

        </div>
    )
}