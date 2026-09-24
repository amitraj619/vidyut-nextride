export const isMobileDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for mobile and tablet devices, but exclude Macintosh (unless it's an iPad or tablet).
  const isMobileOrTablet =
    /iphone|android|blackberry|mini|windows\sce|palm|ipad|tablet|android(?!.*mobile)/i.test(
      userAgent
    );
  const isMacintoshButNotMobile =
    /macintosh/i.test(userAgent) && !/ipad|tablet/i.test(userAgent);

  // Ensure screen width is less than 400px
  const isSmallScreen = window.innerWidth < 480;

  return isMobileOrTablet && !isMacintoshButNotMobile && isSmallScreen;
};
