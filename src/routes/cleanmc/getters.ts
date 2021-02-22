import { Request, Response } from 'express';
import { start } from 'cleanmc/start';

export const getMCPageRoute = async (req: Request, res: Response) => {
  const html = await start(req.params.item);
  res.send(html);
}
