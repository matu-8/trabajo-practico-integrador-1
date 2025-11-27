import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
  const { id } = req.user;
  const { title, content, excerpt, status } = req.body;
  try {
    const article = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      user_id: id,
    });
    res
      .status(201)
      .json({ ok: true, msg: "Articulo creado con exito", article });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    if (articles) {
      console.log(">>> ", articles);
      res
        .status(200)
        .json({ ok: true, msg: "Se han traido los articulos", articles });
    }
    res.status(404).json({ ok: false, msg: "No se han encontrado articulos" });
  } catch (error) {
    console.log(">>> ! Ha ocurrido un error en getAllArticles");
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findByPk(id);
    if (article) {
      return res.status(200).json(article);
    }
    res.status(404).json({ ok: false, msg: "No se han encontrado articulos" });
  } catch (error) {
    console.log(">>> ! Ha ocurrido un error en getArticlebyId");
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getArticlesByUser = async (req, res) => {
  const { id } = req.user;
  console.log(id, "desde getUser");
  try {
    const articles = await ArticleModel.findAll({ where: { user_id: id } });

    if (articles.length) {
      return res.status(200).json(articles);
    }
    res.status(404).json({
      ok: false,
      msg: "No se han encontrado articulos de este usuario",
    });
  } catch (error) {
    console.log(">>> ! ha ocurrido un error en getArticlesByUserId");
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};
//traer artciulos por id de usuario
export const getArticlesByUserId = async (req, res) => {
  const { id } = req.user;
  try {
    const articles = await ArticleModel.findOne({
      where: { user_id: id, id: req.params.id },
    });
    if (articles) {
      return res.status(200).json(articles);
    }
    res.status(404).json({
      ok: false,
      msg: "No se han encontrado articulos de este usuario",
    });
  } catch (error) {
    console.log(">>> ! ha ocurrido un error en getArticlesByUserId");
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const updateArticles = async () => {
    const {title, content, excerpt, status} = req.body;
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne(id);
    const updatedArticle = await ArticleModel.update({
        title,
        content,
        excerpt,
        status
    },
    {where:{id}}
);
    res.status(200).json({msg:'Articulo actualizado', updatedArticle})
    if (!article)
      res.status(404).json({ msg: "No se ha encontrado el articulo" });

  } catch (error) {
    console.log('>>> ! Ha ocurrido un error en updateArticle')
    res.status(500).json({msg:'Error interno del servidor'})
  }
};
