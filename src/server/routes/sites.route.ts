import { Router, Request, Response } from 'express';
import Site from '../models/sites.model';

const router = Router();


router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { title, link, image } = req.body;
  
  if (!title || !link || !image) {
    res.status(400).json({ message: 'Title и Link обязательные поля' });
    return;
  }

  try {
    const newSite = new Site({ title, link, image });
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;