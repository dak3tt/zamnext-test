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
  const { name, url } = req.body;
  
  if (!name || !url) {
    res.status(400).json({ message: 'Name and URL are required' });
    return;
  }

  try {
    const newSite = new Site({ name, url });
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;