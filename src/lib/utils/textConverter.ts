import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  if (!content) {
    return "";
  }
  // Remove import statements
  let plain = content.replace(/^import\s+.*?\s+from\s+['"].*['"];?/gm, "");
  // Remove MDX/HTML tags
  plain = plain.replace(/<[^>]*>/g, "");
  // Remove markdown images
  plain = plain.replace(/!\[.*?\]\(.*?\)/g, "");
  // Remove markdown links
  plain = plain.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  // Remove markdown headings
  plain = plain.replace(/#{1,6}\s/g, "");
  // Remove markdown blockquotes
  plain = plain.replace(/>\s/g, "");
  // Remove markdown horizontal rules
  plain = plain.replace(/---/g, "");
  // Remove markdown code blocks
  plain = plain.replace(/`{3}[\s\S]*?`{3}/g, "");
  // Remove markdown inline code
  plain = plain.replace(/`/g, "");
  // Remove markdown bold/italic
  plain = plain.replace(/(\*\*|__|\*|_)/g, "");
  // Remove extra newlines
  plain = plain.replace(/\n{2,}/g, "\n");

  return plain.trim();
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
