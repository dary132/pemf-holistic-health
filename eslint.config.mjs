import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Gitignored tool directories, not project source. `.claude/worktrees/`
    // holds live `git worktree` checkouts of OTHER branches -- a full second
    // copy of app/, components/ and lib/ at whatever commit that branch sits
    // on. Linting it from here reported 704 errors from code this branch does
    // not contain, which is worse than noise: it buried the exit code, so a
    // genuine error in app/ or components/ would have looked identical to the
    // status quo and `npm run lint` was useless as a signal. Each worktree
    // lints itself on its own branch.
    ".claude/**",
    ".superpowers/**",
  ]),
]);

export default eslintConfig;
