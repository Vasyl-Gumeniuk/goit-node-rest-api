import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import auth from '../middlewares/auth.js';

const contactsRouter = express.Router();
contactsRouter.use(auth);

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:id', ctrlWrapper(getOneContact));

contactsRouter.delete('/:id', ctrlWrapper(deleteContact));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  '/:id/favorite',
  validateBody(updateStatusContactSchema),
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
