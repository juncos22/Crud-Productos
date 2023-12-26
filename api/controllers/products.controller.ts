import { prisma } from "../config/db";

export const saveProduct = async (req: any, res: any) => {
  try {
    if (
      req.body.name &&
      req.body.quantity &&
      req.body.price &&
      req.body.categoryId
    ) {
      const saved = await prisma.product.create({
        data: {
          name: req.body.name,
          price: Number(req.body.price),
          quantity: Number(req.body.quantity),
          categoryId: req.body.categoryId,
        },
      });

      console.log("Saved Product:", saved);
      return res.json({ data: "Producto guardado exitosamente" });
    } else {
      return res.json({ error: "Faltan datos" });
    }
  } catch (e: any) {
    console.log("Product error:", e);
    return res.json({ error: "Product error: " + e.message });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const { param } = req.query;

    if (param) {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
        where: {
          OR: [
            {
              name: {
                startsWith: param,
                mode: "insensitive",
              },
            },
            {
              category: {
                type: {
                  startsWith: param,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
      });
      return res.json({ data: products });
    }
    const productList = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return res.json({ data: productList });
  } catch (e: any) {
    console.log("All Products error:", e);
    return res.json({ error: "All Products error: " + e.message });
  }
};

export const getProduct = async (req: any, res: any) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
      },
    });
    return res.json({ data: product });
  } catch (e: any) {
    console.log("Get Product error:", e);
    return res.json({ error: "Get Product error: " + e.message });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    let data = {};
    if (req.body.name) {
      data = { ...data, name: req.body.name };
    }
    if (req.body.categoryId) {
      data = { ...data, categoryId: req.body.categoryId };
    }
    if (req.body.price) {
      data = { ...data, price: req.body.price };
    }
    if (req.body.quantity) {
      data = { ...data, quantity: req.body.quantity };
    }
    const updated = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: data,
    });
    console.log("Updated product:", updated);

    return res.json({ data: "Producto actualizado exitosamente" });
  } catch (e: any) {
    console.log("Update Product error:", e);
    return res.json({ error: "Update Product error: " + e.message });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const deleted = await prisma.product.delete({
      where: { id: req.params.id },
    });
    console.log("Deleted product:", deleted);

    return res.json({ data: "Producto eliminado" });
  } catch (e: any) {
    console.log("Delete Product error:", e);
    return res.json({ error: "Delete Product error: " + e.message });
  }
};
