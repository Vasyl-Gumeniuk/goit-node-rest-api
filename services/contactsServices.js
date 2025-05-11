import Contact from '../db/models/Contact.js';

export async function listContacts() {
  return await Contact.findAll();
}

export async function getContactById({ id }) {
  const contact = await Contact.findByPk(id);
  return contact || null;
}

export async function removeContact({ id }) {
  const contact = await getContactById({ id });

  if (!contact) {
    return null;
  }

  Contact.destroy({
    where: {
      id,
    },
  });
  return contact;
}

export async function addContact(data) {
  const newContact = Contact.create(
    { ...data },
    {
      fields: ['name', 'email', 'phone', 'favorite'],
    }
  );
  return newContact;
}

export async function updateContact({ id }, data) {
  const contact = await getContactById({ id });

  if (!contact) {
    return null;
  }

  return await contact.update(data, {
    returning: true,
  });
}

export const updateStatusContact = async (id, data) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    return null;
  }

  return await contact.update(data, {
    returning: true,
  });
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
