export function DecelerateInterpolator(progress) {
    return 1 - Math.pow(1 - progress, 3);
}
