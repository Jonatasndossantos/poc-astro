import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        author: z.string(),
        date: z.date()
    })
});

export const collections = {
    'blog': blogCollection
};