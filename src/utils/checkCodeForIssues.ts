function staticCheckForInfiniteLoop(codeString: string) {
  const loopPatterns = [
    /while\s*\(true\)/,
    /for\s*\(\s*;;\s*\)/,
    // Add more patterns if needed
  ];

  for (const pattern of loopPatterns) {
    if (pattern.test(codeString)) {
      return "Warning: Potential infinite loop detected!";
    }
  }

  return "No obvious infinite loops detected by static analysis.";
}

export { staticCheckForInfiniteLoop };
