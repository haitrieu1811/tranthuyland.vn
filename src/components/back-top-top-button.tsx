"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {show ? (
        <div className="fixed bottom-0 right-0 mb-6 mr-6 z-10">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full size-14"
            onClick={jumpToTop}
          >
            <ChevronUp className="size-6" />
          </Button>
        </div>
      ) : (
        <Fragment />
      )}
    </React.Fragment>
  );
}
