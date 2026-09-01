import { describe, expect, it } from "vitest";
import { addGst, removeGst } from "./gst";

describe("addGst", () => {
  it("adds GST on top of a base amount", () => {
    const result = addGst(1000, 18);
    expect(result.gstAmount).toBe("180.00");
    expect(result.totalAmount).toBe("1180.00");
  });

  it("returns zero GST at a 0% rate", () => {
    const result = addGst(1000, 0);
    expect(result.gstAmount).toBe("0.00");
    expect(result.totalAmount).toBe("1000.00");
  });
});

describe("removeGst", () => {
  it("extracts the base amount and GST from a tax-inclusive total", () => {
    const result = removeGst(1180, 18);
    expect(result.baseAmount).toBe("1000.00");
    expect(result.gstAmount).toBe("180.00");
  });

  it("round-trips with addGst", () => {
    const added = addGst(2500, 40);
    const removed = removeGst(Number(added.totalAmount), 40);
    expect(removed.baseAmount).toBe("2500.00");
  });
});
