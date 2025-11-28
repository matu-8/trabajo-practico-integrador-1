import { ArticleModel } from "../models/article.model.js";
import { tagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    await tagModel.create({ name });
    return res.status(201).json({ msg: "Tag creado" });
  } catch (error) {
    console.log(">>>! Ha ocurrido un error en createTag");
    res.status(500).json({ msg: "Error interno de servidor" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.findAll();
    if (!tags) {
      return res.status(404).json({ msg: "No se han encontrado tags creadas" });
    }
    res.status(200).json({ msg: "Se han listado las tags" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getTagsById = async (req, res) => {
  const { id } = req.params;
  try {
    const tagId = await tagModel.findByPk(id, {
      include: [
        {
          model: ArticleModel,
          as: "tags",
          attributes: [
            "id",
            "title",
            "content",
            "excerpt",
            "status",
            "createdAt",
          ],
        },
      ],
    });
    if (tagId) {
      return res.status(200).json({ msg: "Tag encontrado", tagId });
    }
    res.status(404).json({ msg: "No se ha encontrado el tag especificado" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateTag = async () => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const tag = await tagModel.findByPk(id);
    if (tag) {
      await tagModel.update({ name }, { where: { id } });
      return res.status(200).json({ msg: "Etiqueta actualizada" });
    }
    res
      .status(404)
      .json({ msg: "No se ha encontrado la etiqueta especificada" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteTag = async(req, res)=>{
    const {id} = req.params;
    try {
        const tag = await tagModel.findByPk(id)
        if(tag){
            await tagModel.destroy({where:{id:id}})
            res.status(200).json({msg:'Tag eliminada'})
        }
        res.status(404).json({msg:'No se ha encontrado la tag especificada'})
    } catch (error) {
        
    }
}