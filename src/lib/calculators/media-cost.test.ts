import { describe, expect, it } from "vitest";
import { calculateImageCost, calculateVideoCost } from "./media-cost";

describe("calculateImageCost", () => {
  it("computes monthly cost from images per run and runs per day", () => {
    const result = calculateImageCost("imagen-4-standard", 4, 100);
    // 4 images * $0.04 = $0.16/run; * 100 runs/day * 30 days = $480.00
    expect(result!.totalCost).toBe("0.1600");
    expect(result!.costPerMonth).toBe("480.00");
  });

  it("returns null for an unknown image model", () => {
    expect(calculateImageCost("nope", 1, 1)).toBeNull();
  });
});

describe("calculateVideoCost", () => {
  it("computes cost from seconds per video and videos per day", () => {
    const result = calculateVideoCost("sora-2-720p", 10, 50);
    // 10s * $0.10/s = $1.00/video; * 50/day * 30 = $1500.00
    expect(result!.totalCost).toBe("1.0000");
    expect(result!.costPerMonth).toBe("1500.00");
  });

  it("returns null for an unknown video model", () => {
    expect(calculateVideoCost("nope", 1, 1)).toBeNull();
  });
});
