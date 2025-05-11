import Contact from '../db/models/Contact.js';

export async function listContacts({ owner }) {
  return await Contact.findAll({
    where: {
      owner,
    },
  });
}

export async function getContact({ id, owner }) {
  const contact = await Contact.findOne({
    where: {
      id,
      owner,
    },
  });
  return contact || null;
}

export async function removeContact({ id, owner }) {
  const contact = await getContact({ id, owner });

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
  return Contact.create({ ...data });
}

export async function updateContact({ id, owner }, data) {
  const contact = await getContact({ id, owner });

  if (!contact) {
    return null;
  }

  return await contact.update(data, {
    returning: true,
  });
}

export const updateStatusContact = async ({ id, owner }, data) => {
  const contact = await getContact({ id, owner });

  if (!contact) {
    return null;
  }

  return await contact.update(data, {
    returning: true,
  });
};

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
