<template>
  <div class="flex items-center gap-2">
    <template v-for="shared in sharedArticle" :key="shared.url">
      <!-- External Links (WhatsApp, Facebook, Twitter, Telegram) -->
      <a
        v-if="shared.type === 'external'"
        :href="shared.url"
        target="_blank"
        rel="noopener noreferrer"
        class="transition-opacity hover:opacity-70"
      >
        <img
          :src="shared.icon"
          :alt="shared.type"
          width="24"
          height="24"
          class="size-6"
        />
      </a>

      <!-- Copy Link Button -->
      <button
        v-else-if="shared.type === 'copy_link'"
        type="button"
        @click="handleCopyLink(shared.url)"
        :disabled="isCopying"
        class="transition-opacity hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed relative"
        :aria-label="copied ? 'Link berhasil disalin' : 'Salin link'"
      >
        <img
          :src="shared.icon"
          :alt="shared.type"
          width="24"
          height="24"
          class="size-6"
        />
        <!-- Success Indicator -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-1"
        >
          <span
            v-if="copied"
            class="absolute -top-10 left-1/2 -translate-x-1/2 bg-grayscale-90 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-lg"
          >
            Link disalin!
          </span>
        </Transition>
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import FacebookIcon from "~/assets/social-media-ori/fb.png";
import WhatsappIcon from "~/assets/social-media-ori/wa.png";
import TelegramIcon from "~/assets/social-media-ori/tele.png";
import TwitterIcon from "~/assets/social-media-ori/x.png";
import LinkIcon from "~/assets/social-media-ori/link_copy.png";

interface SharedArticle {
  icon: string;
  url: string;
  type: "external" | "copy_link";
}

interface Props {
  article_url: string;
}

const props = defineProps<Props>();

// State untuk feedback copy
const copied = ref(false);
const isCopying = ref(false);

const sharedArticle: SharedArticle[] = [
  {
    icon: WhatsappIcon,
    url: `https://api.whatsapp.com/send?text=${props.article_url}`,
    type: "external",
  },
  {
    icon: FacebookIcon,
    url: `https://www.facebook.com/sharer/sharer.php?u=${props.article_url}`,
    type: "external",
  },
  {
    icon: TwitterIcon,
    url: `https://twitter.com/intent/tweet?url=${props.article_url}`,
    type: "external",
  },
  {
    icon: TelegramIcon,
    url: `https://t.me/share/url?url=${props.article_url}`,
    type: "external",
  },
  {
    icon: LinkIcon,
    url: props.article_url,
    type: "copy_link",
  },
];

/**
 * Fallback copy using execCommand for older browsers
 * Note: execCommand is deprecated but needed for legacy browser support
 */
function execCopyCommand(): boolean {
  // Type assertion to bypass deprecation warning
  const doc = document as any;
  return doc.execCommand("copy");
}

/**
 * Handle copy link to clipboard
 * @param url - URL to copy
 */
async function handleCopyLink(url: string) {
  if (isCopying.value) return;

  try {
    isCopying.value = true;

    // Use Clipboard API (modern browsers)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const success = execCopyCommand();
        if (!success) {
          throw new Error("execCommand('copy') returned false");
        }
      } catch (err) {
        console.error("Failed to copy:", err);
        throw err;
      } finally {
        document.body.removeChild(textArea);
      }
    }

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (error) {
    console.error("Failed to copy link:", error);
  } finally {
    isCopying.value = false;
  }
}
</script>

<style></style>
