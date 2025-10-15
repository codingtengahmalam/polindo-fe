import { marked } from "marked";
import DOMPurify from "dompurify";

/**
 * Markdown and HTML Rendering Composable
 *
 * @description
 * A composable for safely rendering Markdown or HTML content with XSS protection
 * and SEO optimization. Supports both server-side rendering (SSR) and client-side
 * rendering with automatic format detection.
 *
 * @features
 * - Dual format support (Markdown & HTML)
 * - Auto-detection of content format
 * - XSS protection via DOMPurify sanitization
 * - GitHub Flavored Markdown (GFM) support
 * - SEO-friendly semantic HTML output
 * - SSR compatible
 *
 * @example
 * ```ts
 * const { renderContent, extractPlainText } = useMarkdown()
 *
 * // Render HTML content
 * const htmlContent = '<p>Hello <strong>world</strong></p>'
 * const rendered = computed(() => renderContent(htmlContent))
 *
 * // Render Markdown content
 * const mdContent = '# Title\n\nThis is **bold**'
 * const rendered = computed(() => renderContent(mdContent))
 *
 * // Extract plain text for meta description
 * const metaDesc = extractPlainText(content, 160)
 * ```
 *
 * @see {@link https://marked.js.org/} - Marked.js documentation
 * @see {@link https://github.com/cure53/DOMPurify} - DOMPurify documentation
 */
export const useMarkdown = () => {
  /**
   * Renders Markdown or HTML content into sanitized HTML
   *
   * @description
   * Converts Markdown to HTML or passes through existing HTML, then sanitizes
   * the output to prevent XSS attacks. Auto-detects content format by checking
   * for HTML tags. Sanitization only runs on client-side for performance.
   *
   * @param content - The Markdown or HTML string to render
   * @param isMarkdown - Force Markdown parsing. If undefined, auto-detects format
   * @returns Sanitized HTML string safe for rendering with v-html
   *
   * @example
   * ```ts
   * // Auto-detect format (recommended)
   * const html = renderContent(data.content)
   *
   * // Force Markdown parsing
   * const html = renderContent(data.content, true)
   *
   * // Force HTML pass-through
   * const html = renderContent(data.content, false)
   * ```
   */
  const renderContent = (content: string, isMarkdown?: boolean): string => {
    if (!content) return "";

    // Auto-detect content format by checking for HTML tags
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);
    const shouldParseMarkdown = isMarkdown ?? !hasHtmlTags;

    let html = content;

    // Parse Markdown to HTML if needed
    if (shouldParseMarkdown) {
      // Configure marked.js for SEO and security
      marked.setOptions({
        gfm: true, // Enable GitHub Flavored Markdown
        breaks: true, // Convert \n to <br> for better formatting
      });

      html = marked.parse(content) as string;
    }

    // Sanitize HTML to prevent XSS attacks
    // Note: DOMPurify only works in browser environment
    if (import.meta.client) {
      return DOMPurify.sanitize(html, {
        // Whitelist of allowed HTML tags
        ALLOWED_TAGS: [
          // Text formatting
          "p",
          "br",
          "strong",
          "em",
          "b",
          "i",
          "u",
          "s",
          "strike",
          // Links and media
          "a",
          "img",
          "figure",
          "figcaption",
          // Headings
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          // Lists
          "ul",
          "ol",
          "li",
          "dl",
          "dt",
          "dd",
          // Quotes
          "blockquote",
          "cite",
          "q",
          // Code
          "code",
          "pre",
          // Tables
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          // Structure
          "div",
          "span",
          "hr",
          // Semantic
          "mark",
          "abbr",
          "time",
          // Embeds
          "iframe",
        ],
        // Whitelist of allowed HTML attributes
        ALLOWED_ATTR: [
          // Links
          "href",
          "target",
          "rel",
          "title",
          // Images and media
          "src",
          "alt",
          "width",
          "height",
          "loading",
          // General
          "class",
          "id",
          // Semantic
          "datetime",
          // Tables
          "colspan",
          "rowspan",
          "scope",
          // Schema.org structured data
          "itemprop",
          "itemscope",
          "itemtype",
          // Iframe embeds
          "frameborder",
          "allowfullscreen",
        ],
        // Automatically add security attributes to links
        ADD_ATTR: ["target"],
        // Disallow data-* attributes for security
        ALLOW_DATA_ATTR: false,
        // Return sanitized string (not DOM)
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
      });
    }

    // Server-side: return raw HTML (will be sanitized on client)
    return html;
  };

  /**
   * Extracts plain text from HTML or Markdown content
   *
   * @description
   * Strips all HTML tags and extracts plain text, useful for meta descriptions,
   * previews, or search indexing. Automatically truncates to specified length
   * with ellipsis if content exceeds maximum length.
   *
   * @param content - The HTML or Markdown string to extract text from
   * @param maxLength - Maximum character length (default: 160 for SEO meta description)
   * @returns Plain text string without HTML tags
   *
   * @example
   * ```ts
   * // Extract for meta description (160 chars)
   * const metaDesc = extractPlainText(post.content, 160)
   *
   * // Extract for preview (300 chars)
   * const preview = extractPlainText(post.content, 300)
   *
   * // Extract full text
   * const fullText = extractPlainText(post.content, Infinity)
   * ```
   */
  const extractPlainText = (
    content: string,
    maxLength: number = 160
  ): string => {
    if (!content) return "";

    // First, render content to HTML (handles both Markdown and HTML)
    const html = renderContent(content);

    // Strip all HTML tags and normalize whitespace
    const text = html
      .replace(/<[^>]*>/g, "") // Remove all HTML tags
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .trim();

    // Truncate if exceeds maximum length
    if (text.length > maxLength) {
      return text.substring(0, maxLength).trim() + "...";
    }

    return text;
  };

  return {
    renderContent,
    extractPlainText,
  };
};
