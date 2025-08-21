import { type FancyboxOptions, Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React from "react";

export default function useFancybox(options: Partial<FancyboxOptions> = {}) {
  const [root, setRoot] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (root) {
      Fancybox.bind(root, "[data-fancybox]", options);
      return () => Fancybox.unbind(root);
    }
  }, [root, options]);

  return [setRoot];
}
