const file = await Deno.readTextFile(import.meta.dirname + "/inputs.txt");

const muls = /mul\((\d{1,3}),(\d{1,3})\)/gm;

const getRegexData = (input: RegExpExecArray) => [
  input[0],
  input[1],
  input[2],
  input.index,
];

const allMuls = Array.from(file.matchAll(muls)).map((match) =>
  getRegexData(match)
);

const sumMuls = allMuls
  .map((match) => Number(match[1]) * Number(match[2]))
  .reduce((result, num) => (result += num));

console.log(sumMuls);

const regex = /mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\))/gm;

const groups = Array.from(file.matchAll(regex)).map((match) =>
  getRegexData(match)
);

const sumValidMuls = groups.reduce(
  (result, match) => {
    if (result[1] && String(match[0]).includes("mul")) {
      const mul = Number(match[1]) * Number(match[2]);
      result[0] += mul as any;
    }

    if (String(match[0]).includes("don't()")) {
      result[1] = 0;
    }

    if (String(match[0]).includes("do()")) {
      result[1] = 1;
    }

    return result;
  },
  [0, 1]
);

console.log(sumValidMuls[0]);
