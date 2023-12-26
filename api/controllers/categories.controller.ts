import { prisma } from "../config/db";

export const getCategories = async (_: any, res: any) => {
  try {
    const categories = await prisma.category.findMany();
    return res.json({ data: categories });
  } catch (error: any) {
    console.log("All Categories error:", error);
    return res.json({ error: "All Categories error: " + error.message });
  }
};
