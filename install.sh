#!/usr/bin/env bash
# systemshift-coach/install.sh
# Install repo-local dependencies for systemshift-coach.
set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

TRACE="${TRACE:-false}"
if [[ "$TRACE" == "true" ]]; then
  set -o xtrace
fi

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

_ok()   { echo "  ✓ $*"; }
_warn() { echo "  ⚠ $*"; }
_err()  { echo "  ✗ $*"; exit 1; }
_step() { echo ""; echo "▸ $*"; }

preflight() {
  _step "Preflight"
  command -v git >/dev/null || _err "git not found"
  command -v node >/dev/null || _err "node not found — install via laidback-system/install.sh"
  command -v npm >/dev/null || _err "npm not found — install via laidback-system/install.sh"
  _ok "node: $(node --version)"
  _ok "npm: $(npm --version)"
}

install_dependencies() {
  _step "Dependencies"
  cd "$REPO_DIR"
  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
  _ok "dependencies installed"
}

build_site() {
  _step "Build"
  cd "$REPO_DIR"
  npm run build
  _ok "site build completed"
}

print_summary() {
  echo ""
  if command -v gum >/dev/null; then
    gum style \
      --border rounded --border-foreground 212 \
      --padding "1 2" \
      "$(gum style --bold '✦ systemshift-coach ready')
Run: npm run dev"
  else
    echo "✦ systemshift-coach ready — run: npm run dev"
  fi
}

main() {
  echo ""
  echo "✦ systemshift-coach installer"
  echo "  repo: $REPO_DIR"
  echo ""

  preflight
  install_dependencies
  build_site
  print_summary
}

main "$@"