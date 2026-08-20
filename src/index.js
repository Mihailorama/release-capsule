import { createHash } from "node:crypto";
export function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
export function verifyCapsule(manifest, files) {
  const failures = [];
  if (!manifest?.version || !Array.isArray(manifest.files) || !Array.isArray(manifest.redactions)) failures.push("invalid-manifest");
  for (const entry of manifest?.files ?? []) {
    const value = files[entry.path];
    if (value == null) failures.push(`missing:${entry.path}`);
    else if (sha256(value) !== entry.sha256) failures.push(`hash:${entry.path}`);
  }
  return { valid: failures.length === 0, failures };
}
