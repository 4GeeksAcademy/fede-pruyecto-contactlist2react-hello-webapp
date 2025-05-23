import { Link, useParams } from "react-router-dom"
import { useEffect, useState, useReducer } from "react";
import { addContact as createContact, editContact as editTheContact } from "../functions";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { state, dispatch } = useGlobalReducer();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const { id } = useParams();
    console.log(formData);

    useEffect(() => {
        if (id) {
            const currrentContact = state.contacts.find(contact => contact.id == id)
            setFormData(currrentContact)
        }
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newContact = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
        }

        const response = await createContact(newContact);

        if (response) {
            console.log("Contacto agregado exitosamente:", response);
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
            });
        } else {
            console.error("Error al agregar el contacto.")
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!id) {
            console.error("No se puede editar sin un ID de contacto.");
            return;
        }
        const editContactData = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
        };

        const success = await editTheContact(id, editContactData); 

        if (success) {
            console.log("Contacto editado exitosamente:", success);
            dispatch({ type: "update_contact", payload: { id: id, updatedContact: editContactData } });
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
            });
        } else {
            console.error("Error al editar el contacto.");
            
        }
    };

    return (
        <div>
            <h1 className="text-center">{id ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}</h1>
            <form className="p-5">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} value={formData.name} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="phone" className="form-control" onChange={handleChange} value={formData.phone} />
                </div>
                <div className="mb-3">
                    <label className="form-label">email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} value={formData.email} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} value={formData.address} />
                </div>
            </form>
            <div className="d-grid gap-2 col-6 mx-auto">
                {!id ? (
                    <button className="btn btn-success" type="button" onClick={handleSubmit}>Add contact</button>
                ) : (
                    <button className="btn btn-primary" type="button" onClick={handleEdit}>Save Changes</button>
                )}
            </div>
            <Link to="/contactslist">
                <p className="mx-5">Ir a lista de contactos</p>
            </Link>
        </div>
    )
}