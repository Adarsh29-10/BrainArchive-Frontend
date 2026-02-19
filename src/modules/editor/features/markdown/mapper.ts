import type { Root, RootContent, PhrasingContent, Text, InlineCode } from "mdast";
import type { Block } from "../../types";

export function mapMarkdownToBlocks(tree: Root): Block[] {
  const blocks: Block[] = [];

  for (const node of tree.children) {
    const converted = convertNode(node);

    if (Array.isArray(converted)) {
      blocks.push(...converted);
    } else if (converted) {
      blocks.push(converted);
    }
  }

  return blocks;
}

function convertNode(node: RootContent ): Block | Block[] | null {
  switch (node.type) {
    case "heading":
      return {
        _id: crypto.randomUUID(),
        type: mapHeadingLevel(node.depth),
        content: extractText(node),
      };

    case "paragraph":
      return {
        _id: crypto.randomUUID(),
        type: "paragraph",
        content: extractText(node),
      };

    case "thematicBreak":
      return {
        _id: crypto.randomUUID(),
        type: "divider",
        content: "",
      };

    case "code":
      return {
        _id: crypto.randomUUID(),
        type: "code",
        content: node.value,
      };

    case "list":
      if (!node.ordered) {
        return node.children.map((item) => ({
          _id: crypto.randomUUID(),
          type: "bullet",
          content: extractText(item),
        }));
      }
      return null;

    default:
      return null;
  }
}

function mapHeadingLevel(depth: number) {
  if (depth === 1) return "heading1";
  if (depth === 2) return "heading2";
  return "heading";
}

function extractText(
  node: RootContent | PhrasingContent
): string {
  if (node.type === "text") {
    return (node as Text).value;
  }

  if (node.type === "inlineCode") {
    return (node as InlineCode).value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children
      .map((child) =>
        extractText(child as PhrasingContent)
      )
      .join("");
  }

  return "";
}


