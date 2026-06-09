import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: process.env.GITHUB_BRANCH,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "author",
        label: "Authors",
        path: "content/authors",
        fields: [
          {
            name: "fullname",
            type: "string",
            required: true,
            isTitle: true,
            description:
              "Name will appear on the website blog articles they author",
          },
          {
            name: "avatar",
            type: "image",
            uploadDir: (form) => "/uploads/avatars",
          },
        ],
      },
      {
        name: "blogpost",
        label: "Blogposts",
        path: "content/blogposts",
        format: "mdx",
        ui: {
          router: ({ document, collection }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "author",
            type: "reference",
            collections: ["author"],
            required: true,
          },
          {
            label: "Body",
            name: "body",
            type: "rich-text",
            parser: { type: "mdx" },
            isBody: true,
          },
        ],
      },
    ],
  },
});
