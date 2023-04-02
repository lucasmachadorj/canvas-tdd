export class Guesser {
  private word = '';
  private correctGuesses = 0;

  public setWord(word: string) {
    this.word = word;
  }

  public guessWord(word: string): boolean {
    const correct = word.toLowerCase() === this.word.toLowerCase();
    if (correct) this.correctGuesses++;
    return correct;
  }

  public getNumberCorrectGuesses(): number {
    return this.correctGuesses;
  }
}
