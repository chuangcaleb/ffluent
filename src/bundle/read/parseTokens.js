import { TOKENS } from '../consts.js';
import readFile from './readFile.js';

export default function parseTokens(tokens) {
  return tokens.map((token) => {
    if (token.type === TOKENS.TEXT) return token.content;
    if (token.type === TOKENS.FILE) return readFile(token.content).trim();
    throw new Error(
      `Invalid token type encountered: "${token.type}" for token content: "${token.content}"`
    );
  });
}
