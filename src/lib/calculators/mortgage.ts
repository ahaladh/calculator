import Decimal from "decimal.js";

export interface MortgageInput {
  principal: number;
  annualRatePct: number;
  termYears: number;
  downPayment?: number;
}

export interface AmortizationRow {
  month: number;
  payment: string;
  principalPaid: string;
  interestPaid: string;
  balance: string;
}

export interface MortgageResult {
  monthlyPayment: string;
  totalPayment: string;
  totalInterest: string;
  totalPrincipal: string;
  amortization: AmortizationRow[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const downPayment = new Decimal(input.downPayment ?? 0);
  const P = new Decimal(input.principal).minus(downPayment);
  const annualRate = new Decimal(input.annualRatePct).div(100);
  const r = annualRate.div(12);
  const n = new Decimal(input.termYears).times(12);

  if (P.lte(0) || n.lte(0)) {
    return {
      monthlyPayment: "0.00",
      totalPayment: "0.00",
      totalInterest: "0.00",
      totalPrincipal: P.toFixed(2),
      amortization: [],
    };
  }

  const monthlyPayment = r.isZero()
    ? P.div(n)
    : P.times(r)
        .times(r.plus(1).pow(n))
        .div(r.plus(1).pow(n).minus(1));

  const amortization: AmortizationRow[] = [];
  let balance = P;
  const totalMonths = n.toNumber();

  for (let month = 1; month <= totalMonths; month++) {
    const interestPaid = r.isZero() ? new Decimal(0) : balance.times(r);
    let principalPaid = monthlyPayment.minus(interestPaid);
    let payment = monthlyPayment;

    if (principalPaid.gt(balance)) {
      principalPaid = balance;
      payment = principalPaid.plus(interestPaid);
    }

    balance = balance.minus(principalPaid);
    if (balance.lt(0)) balance = new Decimal(0);

    amortization.push({
      month,
      payment: payment.toFixed(2),
      principalPaid: principalPaid.toFixed(2),
      interestPaid: interestPaid.toFixed(2),
      balance: balance.toFixed(2),
    });

    if (balance.isZero()) break;
  }

  const totalPayment = amortization.reduce(
    (sum, row) => sum.plus(row.payment),
    new Decimal(0),
  );
  const totalInterest = amortization.reduce(
    (sum, row) => sum.plus(row.interestPaid),
    new Decimal(0),
  );

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    totalPrincipal: P.toFixed(2),
    amortization,
  };
}
