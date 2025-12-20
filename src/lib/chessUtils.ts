/**
 * Get the percentage of completion of a chess exercise
 * @param squaresToGo - The number of squares to go
 * @param squaresCompleted - The number of squares completed
 * @returns The percentage of completion
 * @example
 * getPercentageOfCompletion({ squaresToGo: 10, squaresCompleted: 5 }) // 50
 */
export const getPercentageOfCompletion = ({
  squaresToGo,
  squaresCompleted,
}: {
  squaresToGo: number
  squaresCompleted: number
}) => {
  return Math.floor((squaresCompleted / squaresToGo) * 100)
}
