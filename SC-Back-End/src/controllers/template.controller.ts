import { Router, Request, Response } from "express";
import { TemplateEndpoints } from "./../../../SC-Common/URLEndpoints";
import { Template } from "../models/Template";
import { TemplateDetail } from "../models/TemplateDetail";
import { Song } from "../models/Song";
import logger from "../util/logger";

const router = Router();

router.get(TemplateEndpoints.GET_ALL, async (req: Request, res: Response) => {
    const includeTemplateDetails = req.query.includeTemplateDetails === "true";
    const templates: Template[] = await Template.findAll({ include: includeTemplateDetails ? [TemplateDetail]:[]});
    res.json(templates);
});

router.get(TemplateEndpoints.GET_BY_ID + ":id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({message: "No ID supplied!"});
    }
    let template: Template | null
    try {
        template = await Template.findById(id, {
            include: [
                {model: TemplateDetail, include: [{model: Song}]}
            ]
        });
    }
    catch (e) {
        logger.error(e);
        console.error(e);
        res.status(500).json({ message: "Internal Error" })
        return
    }

    if (template === null)
        res.status(404).json({message: "Template not Found"});
    else
        res.json(template);
});

export const TemplateController: Router = router;