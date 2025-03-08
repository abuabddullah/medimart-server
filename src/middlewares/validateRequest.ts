import type { Request, Response, NextFunction } from "express"
import type { AnyZodObject } from "zod"

export const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    next(error)
  }
}

