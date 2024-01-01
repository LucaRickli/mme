import yaml from "yaml";

export default class Frontmatter {
  public static readonly regex = /^\s*---\s*([\s\S]*?(?=\s*---))\s*---\s*/;

  public static parse<T extends object>(
    content: string
  ): { content: string; frontmatter?: T } {
    const result = this.regex.exec(content);
    if (result?.length !== 2) {
      throw new Error("Failed to parse frontmatter.", {
        cause: `Expected to get a array containing 2 items. Got ${result?.length} items instead.`,
      });
    }
    return {
      frontmatter: yaml.parse(result[1]),
      content: content.replace(this.regex, ""),
    };
  }
}
