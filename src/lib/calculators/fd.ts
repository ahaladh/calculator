import {
  calculateCompoundInterest,
  type CompoundingFrequency,
} from "./compound-interest";

export interface FdInput {
  principal: number;
  annualRatePct: number;
  years: number;
  compoundingFrequency?: CompoundingFrequency;
}

export interface FdResult {
  maturityValue: string;
  interestEarned: string;
}

/** Indian FDs are compounded quarterly by most banks unless stated otherwise. */
export function calculateFd(input: FdInput): FdResult {
  const result = calculateCompoundInterest({
    principal: input.principal,
    annualRatePct: input.annualRatePct,
    years: input.years,
    compoundingFrequency: input.compoundingFrequency ?? 4,
  });
  return {
    maturityValue: result.maturityAmount,
    interestEarned: result.interestEarned,
  };
}
