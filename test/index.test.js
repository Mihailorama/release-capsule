import test from "node:test"; import assert from "node:assert/strict";
import { sha256, verifyCapsule } from "../src/index.js";
test("verifies a hash-bound manifest", () => assert.deepEqual(verifyCapsule({version:"1",redactions:["contacts"],files:[{path:"public.json",sha256:sha256("[]")} ]},{"public.json":"[]"}),{valid:true,failures:[]}));
test("rejects changed payload", () => assert.equal(verifyCapsule({version:"1",redactions:[],files:[{path:"a",sha256:sha256("safe")} ]},{a:"changed"}).valid,false));
