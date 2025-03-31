/**
 * Mock File class,
 * used for mockFileReader since original cant be called in non-browser environment
 * */
export default class {
  constructor(
    public fileBits: BlobPart[],
    public name: string,
    public options?: FilePropertyBag,
  ) {}
}
