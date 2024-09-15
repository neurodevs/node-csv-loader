import fs from 'fs'
import { assertOptions } from '@sprucelabs/schema'
import SpruceError from '../../errors/SpruceError'

export default class CsvLoaderImpl implements CsvLoader {
    public static Class?: CsvLoaderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async load(csvPath: string) {
        assertOptions({ csvPath }, ['csvPath'])

        if (!fs.existsSync(csvPath)) {
            throw new SpruceError({
                code: 'FILE_NOT_FOUND',
                path: csvPath,
            })
        }
    }
}

export interface CsvLoader {
    load(csvPath: string): Promise<void>
}

export type CsvLoaderConstructor = new () => CsvLoader
