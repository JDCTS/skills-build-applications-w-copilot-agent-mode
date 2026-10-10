import { Router } from 'express';
import { isObjectIdOrHexString, type Model } from 'mongoose';

type SortDirection = 1 | -1;

export function createCrudRouter(
  model: Model<any>,
  sort: Record<string, SortDirection> = { createdAt: -1 },
) {
  const router = Router();

  router.get('/', async (_request, response) => {
    response.json(await model.find().sort(sort));
  });

  router.post('/', async (request, response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  router.get('/:id', async (request, response) => {
    if (!isObjectIdOrHexString(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const record = await model.findById(request.params.id);
    if (!record) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(record);
  });

  router.put('/:id', async (request, response) => {
    if (!isObjectIdOrHexString(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const record = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(record);
  });

  router.delete('/:id', async (request, response) => {
    if (!isObjectIdOrHexString(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const record = await model.findByIdAndDelete(request.params.id);
    if (!record) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.sendStatus(204);
  });

  return router;
}