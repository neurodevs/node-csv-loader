import { assertOptions } from '@sprucelabs/schema'

export default class CsvLoaderImpl implements CsvLoader {
    public static Class?: CsvLoaderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async load(path: string) {
        assertOptions({ path }, ['path'])
    }
}

export interface CsvLoader {
    load(path: string): Promise<void>
}

export type CsvLoaderConstructor = new () => CsvLoader
