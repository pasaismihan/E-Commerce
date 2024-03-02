import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  search?: string | null;
}
/* asagidaki fonksiyonda params uzerinden alacagimiz degerlerle ilgili islemleri yapiyoruz, burada category ve search icin
yapacagimiz icin params tipini IProductParams olarak yaptik */
export default async function getProducts(params: IProductParams) {
  try {
    const { category, search } = params;
    let searchString = search;
    if (!search) {
      searchString = "";
    }
    let query: any = {};
    if (category) {
      query.category = category; // burada objectin ozelliginden yararlanarak query.category diyerek category adinda bir key olusturduk degerini de paramstan gelen category yaptik
    }
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
