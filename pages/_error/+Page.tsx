import React from "react";
import { type PageContext } from "../../renderer/usePageContext";

function Page(pageContext: PageContext): React.ReactNode {

  let errorMessage = <span>ERROR</span>
                          
  if (pageContext.is404 ?? false)
  {
    errorMessage = <span>ERROR 404</span>
  }

  return <div className="w-screen h-screen bg-cover">
      <div className="w-full h-full backdrop-blur-lg py-space-xl flex flex-col gap-space-xl items-center">
        <div className="p-space-md bg-white/50 dark:bg-black/50">
          {errorMessage}
        </div>
      </div>
    </div>;
}

export { Page };
