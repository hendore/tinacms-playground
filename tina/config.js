import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
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
