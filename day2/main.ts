// conditions for safe report:
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

const file = await Deno.readTextFile(import.meta.dirname + "/inputs.txt");
const reports = file.split("\n").map((line) => line.split(" "));

const getLevelsDiff = (report: string[]): number[] =>
  report.reduce((result, level, index, arr) => {
    if (index === arr.length - 1) {
      return result;
    }

    result.push(Number(arr[index + 1]) - Number(level));
    return result;
  }, [] as number[]);

const isAllPositive = (report: number[]) => report.every((value) => value < 0);
const isAllNegative = (report: number[]) => report.every((value) => value > 0);
const isZeroIncluded = (report: number[]) =>
  report.every((value) => value === 0);
const isWithinLimits = (report: number[]) =>
  report.every((value) => Math.abs(value) >= 1 && Math.abs(value) <= 3);

const isSafeReport = (report: string[]): boolean => {
  const levels = getLevelsDiff(report);
  // all increasing or all decreasing
  // min 1 or max 3
  const isAllPositiveLevels = isAllPositive(levels);
  const isAllNegativeLevels = isAllNegative(levels);
  const isZeroPresent = isZeroIncluded(levels);
  const isWithinLimitsLevels = isWithinLimits(levels);

  return (
    (isAllPositiveLevels || isAllNegativeLevels) &&
    !isZeroPresent &&
    isWithinLimitsLevels
  );
};

const safeReports = reports.filter((report) => isSafeReport(report));

console.log(safeReports.length);

// conditions for safe report fix: removing only one level should fix it
const isSafeReportWithFix = (report: string[]) =>
  report.some((_, index) =>
    isSafeReport(report.slice(0, index).concat(report.slice(index + 1)))
  );

const safeReportsWithFix = reports.filter(
  (report) => isSafeReport(report) || isSafeReportWithFix(report)
);

console.log(safeReportsWithFix.length);
