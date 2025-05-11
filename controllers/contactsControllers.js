import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById({ id });
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contactsService.removeContact({ id });
  if (!removedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(removedContact);
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactsService.updateContact({ id }, req.body);
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await contactsService.updateStatusContact(contactId, {
    favorite,
  });
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatedContact);
};
