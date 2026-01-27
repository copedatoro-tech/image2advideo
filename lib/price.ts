type Options = {
  imagesCount: number
  duration: "short" | "medium" | "long"
  aiEnabled: boolean
}

export function calculatePrice(options: Options) {
  let total = 19 // preț de bază

  if (options.duration === "medium") total += 5
  if (options.duration === "long") total += 10

  if (options.aiEnabled) total += 10

  if (options.imagesCount > 1) {
    total += (options.imagesCount - 1) * 3
  }

  return total
}
