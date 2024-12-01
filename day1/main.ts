const file = await Deno.readTextFile(import.meta.dirname + '/inputs.txt')
const data = file.replaceAll(/\W+/g, '-').split('-').reduce((result, item, index) => {
  if (index % 2 === 0) {
    result[0].push(item);
  } else {
    result[1].push(item);
  }
  return result;
}, [[], []] as string[][]);

const [left, right] = data;

left.sort((a, b) => Number(a) - Number(b))
right.sort((a, b) => Number(a) - Number(b))

const zip = (arr1: string[], arr2: string[]): [string, string][] =>
  arr1.map((value, index) => [value, arr2[index]])

const sum = zip(left, right).reduce((result, [leftItem, rightItem]) =>
  result + Math.abs(Number(rightItem) - Number(leftItem)), 0);

// part 1: sum the distance between the numbers
console.log(sum);

// part 2: calculate similarity score and sum
const score = left.map((leftItem) => {
  const instances = right.filter((rightItem) => rightItem === leftItem);
  const scoreCalc = Number(leftItem) * instances.length;

  return scoreCalc;
});

const scoreSum = score.reduce((result, item) => result += item, 0);
console.log(scoreSum);