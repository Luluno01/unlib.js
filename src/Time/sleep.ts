/**
 * @description Promise version of `setTimeout`.
 * @param delay The time in milliseconds.
 * @param args Additional parameters which will be passed through to `resolve`.
 */
export function sleep(delay: number, ...args: any[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay, args)
  })
}

export default sleep
