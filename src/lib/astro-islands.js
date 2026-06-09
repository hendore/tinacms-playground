import { requestWithMetadata } from "@tinacms/astro";
import { client } from "../../tina/__generated__/client";
import Blogpost from "../components/blogpost.astro";

export default {
  blogpost: {
    fetch: (_request, params) => getPost(params.get("slug")),
    component: Blogpost,
    wrapper: { tag: "div" },
    propsFromData: ({ data }) => {
      return { blogpost: data.blogpost };
    },
  },
};

function getPost(slug) {
  return requestWithMetadata(
    client.queries.blogpost({ relativePath: `${slug}.mdx` }),
    { priority: "primary" },
  );
}
