"use server";

import * as z from "zod";
import { db } from "@/libs/db";
import { OrderSchema } from "@/schemas";
import { getOrderByName } from "../read/get-orders";
const stripe = require("stripe")(process.env.STRIPE_SK);

export const registerOrder = async (values: z.infer<typeof OrderSchema>) => {
      const validatedFields = OrderSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexsitentes. Por favor, insira campos válidos." };

      const { name, email, city, cep, street, phone, cartProducts } = validatedFields.data;

      if (!Array.isArray(cartProducts) || !cartProducts.every(id => typeof id === "string")) return { error: "O carrinho de produtos deve ser um array de strings." };

      const uniqueIds = [...new Set(cartProducts)];

      const products = await db.product.findMany({
            where: { id: { in: uniqueIds } },
      });

      if (!products.length) return { error: "Dados inexistentes." };

      let line_items: any[] = [];
      const formatPrice = (priceStr: string) => parseFloat(priceStr.replace(/[^0-9,.]/g, "").replace(",", "."));

      for (const product of products) {
            const quantity = cartProducts.filter((id: string) => id === product.id.toString()).length;
            const formattedPrice = formatPrice(product.price);

            if (quantity > 0) {
                  line_items.push({
                        quantity,
                        price_data: {
                              currency: "BRL",
                              product_data: {
                                    name: product.name,
                              },
                              unit_amount: formattedPrice * 100,
                        },
                  });
            };
      };

      const newOrder = await db.order.create({
            data: {
                  line_items,
                  name,
                  email,
                  city,
                  cep,
                  street,
                  phone,
                  paid: false,
            },
      });

      const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            customer_email: email,
            success_url: process.env.NEXT_PUBLIC_APP_URL + "/success",
            cancel_url: process.env.NEXT_PUBLIC_APP_URL + "/cart?canceled=1",
            metadata: { orderId: newOrder.id.toString() },
      });

      return { url: session.url }
};