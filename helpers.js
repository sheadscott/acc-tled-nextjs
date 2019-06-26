// Helper functions

const replaceUrl = (str, decorator = '') => str.replace(
    /https:\/\/instruction.austincc.edu\/tled/gi,
    decorator
  );

export { replaceUrl };
