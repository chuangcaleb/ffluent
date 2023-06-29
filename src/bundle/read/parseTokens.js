import readFile from './readFile.js';

export default function parseTokens(tokens) {
  return tokens.map((token) => {
    if (token.type === 'text') return token.content;
    if (token.type === 'file') return readFile(token.content).trim();
    throw new Error(
      `Invalid token type encountered: "${token.type}" for token content: "${token.content}"`
    );
  });
}
