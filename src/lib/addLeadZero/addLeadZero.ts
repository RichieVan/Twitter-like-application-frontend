export default function addLeadZero(num: number): string {
  let convertedNum = String(num);
  if (convertedNum.length < 2) {
    convertedNum = `0${convertedNum}`;
  }
  return convertedNum;
}
