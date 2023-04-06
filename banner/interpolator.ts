export type TimeInterpolator = (progress: number) => number;

export function DecelerateInterpolator(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}
