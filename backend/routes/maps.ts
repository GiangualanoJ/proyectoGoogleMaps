import express, {Request, Response} from "express";
import map, { Imap } from "../models/maps";

const router = express.Router()

router.get("/",async (req: Request, res: Response) => {
    try{
        const maps: Imap[]= await map.find()
        res.json(maps)
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post("/nuevaUbicacion", async (req: Request, res: Response) => {
    const ubicacion = new map({
        _id: req.body.id,
        lat: req.body.lat,
        lng: req.body.lng
    })

    try {
        const newUbicacion: Imap = await ubicacion.save();
        res.status(201).json(newUbicacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.put("/:id", async (req: Request, res: Response) => {

    try {
        console.log(req.params)
        const { _id, lat, lng } = req.body;

        const mapas: Imap | null = await map.findByIdAndUpdate(req.params.id, {
            _id,
            lat,
            lng
        }, { new: true });
        console.log(mapas);
        

        if (!mapas) {
            return res.status(201).json({
                ok: false,
                message: "Ubicacion no encontrada"
            });
        }

        res.json(mapas);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el mapa"
        });
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const mapas: Imap | null = await map.findByIdAndDelete(req.params.id);

        if (mapas) {
            res.json(mapas);
        } else {
            res.status(404).json({ message: "Mapas not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while deleting map" });
    }
})


export default router;