export async function retry<T>(
  cb: () => Promise<T>,
  numberOfTries = 1,
): Promise<T> {
  let tries = 1;
  console.log(`Error: retrying ${tries} / ${numberOfTries}`);
  while (tries <= numberOfTries) {
    tries++;
    try {
      return await cb();
    } catch (err) {
      if (tries >= numberOfTries) {
        throw err;
      }
    }
  }

  return null as T;
}
