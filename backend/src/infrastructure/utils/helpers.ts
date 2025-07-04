/* eslint-disable @typescript-eslint/no-explicit-any */
export const encode64 = (data: any) => {
  return btoa(JSON.stringify(data));
};

export function getDurationInMilliseconds(start?: [number, number]) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

export const getTrace = () => crypto.randomUUID();

export const convertKeyValueArrayToObject = (
  array: [{ key: string; value: string; type: string }]
) => {
  return array.reduce((acc, config) => {
    let item: any;
    if (config.type === "object") item = JSON.parse(config.value);
    if (config.type === "string") item = config.value;
    if (config.type === "number") item = Number(config.value);
    return { ...acc, [config.key]: item };
  }, {});
};

export function sortByAscending(a: number, b: number) {
  return a - b;
}

export function sortByDescending(a: number, b: number) {
  return b - a;
}




const TIME = {
  ONE_MINUTE: 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
}

export const findMinute = (timestamp: number) => {
  return timestamp - (timestamp % TIME.ONE_MINUTE)
}