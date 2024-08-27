export default class CsvLoaderImpl implements CsvLoader {
    public static Class?: CsvLoaderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface CsvLoader {}

export type CsvLoaderConstructor = new () => CsvLoader
