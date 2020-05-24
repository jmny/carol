/**
 * Substantial parts adapted from https://github.com/zserge/lorca/blob/a3e43396a47ea152501d3453514c7f373cea530a/ui.go
 * which is licensed as follows:
 *
 * MIT License
 *
 * Copyright (c) 2018 Serge Zaitsev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { assertEquals, assertStrictEq, assertThrowsAsync } from "./deps.ts";
import { chromeDoesNotExist } from "./test_util.ts";
import { launch } from "./mod.ts";
import { EvaluateError } from "./chrome.ts";

const { test } = Deno;
const ignore = chromeDoesNotExist;

test({
  ignore,
  name: "Application#evaluate",
  async fn() {
    const app = await launch({
      width: 480,
      height: 320,
      args: ["--headless"],
    });

    try {
      const res1 = await app.evaluate(`2+3`);
      assertStrictEq(res1, 5);

      const res2 = await app.evaluate(`"foo" + "bar"`);
      assertStrictEq(res2, "foobar");

      const res3 = await app.evaluate(`[1,2,3].map(n => n * 2)`);
      assertEquals(res3, [2, 4, 6]);

      await assertThrowsAsync(() => app.evaluate(`throw fail`), EvaluateError);
    } finally {
      app.exit();
    }
  },
});