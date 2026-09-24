import { createContext, useContext, useState } from "react";

const PageTransitionContext = createContext(null);

export const PageTransitionProvider = ({ children }) => {
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  return (
    <PageTransitionContext.Provider
      value={{
        isProgrammaticScroll,
        setIsProgrammaticScroll,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider"
    );
  }
  return context;
};
