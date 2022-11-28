const slugify = require("slugify");

export default {
  async index(ctx, next) {
    // called by GET /hello

    const { raw_sku, brand_name, title, Slug, variants, reviews, ...product } =
      ctx.request.body;

    product.SKU = raw_sku;
    product.name = title;
    product.fragrants = product.fragrant;
    product.slug = Slug.substring(Slug.lastIndexOf("/") + 1);
    product.thumbnail = product.assets[0];
    product.categories = [
      product.gender === "Nữ" ? 2 : product.gender === "Nam" ? 1 : 3,
    ];
    product.ratings =
      Math.round(
        reviews.reduce((result, item) => result + +item.ratings, 0) /
          reviews.length
      ) || 0;

    const brandSlug = slugify(brand_name, {
      lower: true,
      locale: "vi",
      strict: true,
      trim: true,
    });

    const brand = await strapi.db.query("api::brand.brand").findOne({
      where: {
        slug: brandSlug,
      },
    });

    if (brand) {
      product.brand = brand.id;
    } else {
      const b = await strapi.entityService.create("api::brand.brand", {
        data: {
          name: brand_name,
          slug: brandSlug,
        },
      });
      product.brand = b.id;
    }

    const productCreated = await strapi.services["api::product.product"].create(
      {
        data: product,
      }
    );

    const variantsId = [];
    for (const variant of variants) {
      const r = await strapi.entityService.create(
        "api::product-variant.product-variant",
        {
          data: {
            name: variant.name,
            stock_price: +variant.stock_price.replace(/,|₫/gm, ""),
            price: +variant.price.replace(/,|₫/gm, ""),
            in_stock: true,
            priority: variant.priority,
            product: productCreated.id,
            thumb: variant.thumb,
          },
        }
      );
      variantsId.push(r.id);
    }

    const reviewsId = [];
    for (const review of reviews) {
      const r = await strapi.entityService.create("api::review.review", {
        data: {
          ...review,
          product: productCreated.id,
        },
      });
      reviewsId.push(r.id);
    }

    return await strapi.entityService.findOne(
      "api::product.product",
      productCreated.id
    );
  },
};
